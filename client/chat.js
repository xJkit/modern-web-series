import * as messageActions from 'actions/message-actions';
import * as userActions from 'actions/user-actions';
import io from 'socket.io-client';

var socket = null;

export function chatMiddleware(store) {
  return next => action => {
    if (socket) {
      if (action.type === userActions.ADD_USER) {
        socket.emit('register', action.user);
      }

      if (action.type === messageActions.ADD_MESSAGE) {
        socket.emit('message', action.message);
      }
    }

    return next(action);
  };
}

export default function (store) {
  socket = io.connect(`${location.protocol}//${location.host}`);

  socket.on('start', data => {
    store.dispatch(userActions.setUserId(data.userId));
  });

  socket.on('message', message => {
    store.dispatch(messageActions.addResponse(message));
  });
}
