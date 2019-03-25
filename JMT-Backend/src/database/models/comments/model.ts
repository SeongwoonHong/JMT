export class Comment {
  public id: number;
  public children: string[];
  public depth: number;
  public groupId: number;
  public message: string;
  public userId: number;

  constructor(comment) {
    this.id = comment.id;
    this.children = comment.children || [];
    this.depth = comment.depth;
    this.groupId = comment.groupId;
    this.message = comment.message;
    this.userId = comment.user;
  }
}
