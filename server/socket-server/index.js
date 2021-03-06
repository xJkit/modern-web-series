import io from 'socket.io';
import r from 'rethinkdb';

export default function (server) {
  r.connect({}).then(dbConnection => {
    const socketServer = io(server);
    const connections = {};
    var userIdCount = 0;

    r.table('chat_messages')
      .changes()
      .run(dbConnection)
      .then(cursor => {
        cursor.each((err, row) => {
          if (!err) {
            Object.keys(connections).forEach(userId => {
              const message = row.new_val;

              if (+userId !== message.userId) {
                connections[userId].emit('message', message);
              }
            });
          }
        });
      });

    socketServer.on('connection', socket => {
      const userId = (userIdCount += 1);
      connections[userId] = socket;

      socket.emit('start', {userId});

      socket.on('message', data => {
        r.table('chat_messages')
          .insert(data)
          .run(dbConnection);
      });

      socket.on('disconnect', () => {
        delete connections[userId];
      });
    });
  });
}
