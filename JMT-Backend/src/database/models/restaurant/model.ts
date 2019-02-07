export default class Restaurant {
  public id?: number;
  public name: string;
  public image_url: string;
  public rating: number;
  public price: string;
  public restaurant_id: string
  public location_id: string;
  public display_phone: string;
  public latitude: string;
  public longitude: string;

  constructor(restaurant) {
    this.restaurant_id = restaurant.restaurant_id;
    this.name = restaurant.name;
    this.image_url = restaurant.image_url;
    this.rating = restaurant.rating;
    this.price = restaurant.price;
    this.location_id = restaurant.location_id;
    this.display_phone = restaurant.display_phone;
    this.latitude = restaurant.latitude;
    this.longitude = restaurant.longitude;
  }
}

export interface joinRestaurantParams {
  userId: number;
  date: string;
  restaurantId: string,
  restaurantName: string,
}

