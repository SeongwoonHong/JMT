const ADD_GROUP_COMMENTS = 'app/comments/ADD_GROUP_COMMENTS';
const ADD_COMMENT = 'app/comments/ADD_COMMENT';
const REMOVE_COMMENT = 'app/comments/REMOVE_COMMENT';

export const addGroupComments = payload => ({
  type: ADD_GROUP_COMMENTS,
  payload
});

export const addComment = payload => ({
  type: ADD_COMMENT,
  payload
});

export const removeComment = payload => ({
  type: REMOVE_COMMENT,
  payload
});
