import db from '@db/index';

class Query {
  public static addNewComment = async ({
    date = new Date(),
    depth,
    groupId,
    userId,
    message,
    parentId
  }) => {
    const { rows: results } = await db.pg.query(
      'INSERT INTO comments ("groupId", "userId", message, date, depth) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [groupId, userId, message, date, depth]
    );

    if (parentId) {
      const child = results[0].id;

      await db.pg.query(
        'INSERT INTO comments_comments (child, parent) VALUES ($1, $2);',
        [child, parentId]
      );
    }

    return results[0];
  };

  public static getComment = async (id) => {
    let comment;
    let user;
    const {
      rows: comments
    } = await db.pg.query(`SELECT * FROM comments WHERE id = ${id}`);

    if (comments.length) {
      comment = comments[0];
      const {
        rows: users
      } = await db.pg.query(`SELECT * FROM users WHERE "userId" = ${comment.userId}`);

      if (users.length) {
        user = users[0];
      }
    }

    return { comment, user };
  };

  public static getComments = (options = {}) => {
    const _options = Object
      .keys(options)
      .map((key) => {
        return `"${key}" = ${options[key]}`;
      })
      .join(' AND ');

    return db.pg.query(
      `SELECT (SELECT coalesce((select array(SELECT child FROM comments_comments WHERE parent = comments.id)), null)) as children, depth, id, message FROM comments WHERE ${ _options };`
    );
  };
}

export default Query;
