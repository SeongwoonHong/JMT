export default class Group {
  public id?: number;
  public date: string;
  public categoryId: number;
  public restaurantId: string;
  public restaurantName: string;

  constructor(group) {
    this.id = group.id;
    this.date = group.date;
    this.categoryId = group.categoryId;
    this.restaurantId = group.restaurantId;
    this.restaurantName = group.restaurantName;
  }
}
