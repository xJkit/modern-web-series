import {combineReducers} from 'redux';
import {UPDATE_MESSAGE, ADD_MESSAGE, ADD_RESPONSE} from 'actions/message-actions';
import {ADD_USER, SET_USER_ID, UPDATE_USER_NAME, UPDATE_USER_EMAIL} from 'actions/user-actions';

export default function (initialState) {
  function messages(currentMessages=initialState.messages, action) {
    switch (action.type) {
      case ADD_MESSAGE:
      case ADD_RESPONSE:
        let messages = currentMessages.map(message => Object.assign({}, message));
        messages.push(Object.assign({}, action.message));
        return messages;
      default:
        return currentMessages;
    }
  }

  function user(currentUser=initialState.user, action) {
    switch(action.type) {
      case SET_USER_ID:
        return Object.assign({}, currentUser, { id: action.userId });
      case UPDATE_USER_NAME:
        return Object.assign({}, currentUser, { name: action.name });
      case UPDATE_USER_EMAIL:
        return Object.assign({}, currentUser, { email: action.email });
      default:
        return currentUser;
    }
  }


  function currentMessage(currentMessage=initialState.currentMessage, action) {
    switch(action.type) {
      case UPDATE_MESSAGE:
        return action.message;
      case ADD_MESSAGE:
        return '';
      default:
        return currentMessage;
    }
  }

  return combineReducers({ currentMessage, messages, user });
}
