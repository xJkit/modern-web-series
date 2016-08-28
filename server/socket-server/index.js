import io from 'socket.io';
import r from 'rethinkdb';

export default function (server) {
  r.connect({}).then(dbConnection => {
    const socketServer = io(server);
    const connections = {};

    r.table('chat_messages')
      .changes()
      .run(dbConnection)
      .then(cursor => {
        cursor.each((err, row) => {
          if (!err) {
            Object.keys(connections).forEach(id => {
              const message = row.new_val;

              if (id !== message.userId) {
                connections[id].emit('message', message);
              }
            });
          }
        });
      });

    socketServer.on('connection', socket => {
      socket.on('register', data => {
        r.table('users')
          .insert(data)
          .run(dbConnection)
          .then(result => {
            const userId = result.generated_keys[0];
            connections[userId] = socket;

            socket.emit('start', { userId });

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
    });
  });
}
