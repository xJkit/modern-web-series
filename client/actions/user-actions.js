export const UPDATE_USERNAME = 'update-username';
export const UPDATE_EMAIL = 'update-email';
export const SET_USER_ID = 'set-user-id';
export const ADD_USER = 'add-user';

export function updateUsername(username) {
  return { type: UPDATE_USERNAME, username };
}

export function updateEmail(email) {
  return { type: UPDATE_EMAIL, email };
}

export function setUserId(userId) {
  return { type: SET_USER_ID, userId };
}

export function addUser(user) {
  return { type: ADD_USER, user };
}
