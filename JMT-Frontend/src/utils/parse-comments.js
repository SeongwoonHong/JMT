export const parseComments = (comments) => {
  const topComments = comments.filter((comment) => comment.depth === 0);

  return topComments.reduce((result, comment) => {
    let _comment = comment;
    while (comment.hasOwnProperty('children') && comment.children.length) {
      _comment.children = [
        ...(_comment.children || []),
        ...[]
      ]
    }
    return [
      ...result,
      comment,
    ];
  }, []);
};
