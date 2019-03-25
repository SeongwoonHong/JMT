import Query from './queries';

export const addNewComment = async (newComment) => {
  try {
    return await Query.addNewComment(newComment);
  } catch (error) {
    console.log(error);
  }
};

export const getComment = async (id) => {
  try {
    return await Query.getComment(id);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getComments = async (groupId) => {
  try {
    return await Query.getComments(groupId);
  } catch (error) {
    console.log(error);
  }
};
