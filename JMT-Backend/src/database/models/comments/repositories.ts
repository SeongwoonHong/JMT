import Query from './queries';

export const addNewComment = async (newComment) => {
  try {
    return await Query.addNewComment(newComment);
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (groupId) => {
  try {
    const comments = await Query.getComments(groupId);
    return comments;
  } catch (error) {
    console.log(error);
  }
};
