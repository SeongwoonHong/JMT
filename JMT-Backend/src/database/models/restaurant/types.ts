export interface RestaurantModel {
  id: number,
  restaurant_id: string,
  name: string,
  image_url: string,
  // categoryIds: Array<number>, -> foreign key for categories table
  // categories: Array<object>, -> another table
  rating: number,
  price: string,
  // photoIds: Array<number>, -> foreign key for photos table
  // photos: Array<string>, -> another table
  location_id: number,
  // location: { -> another table
  //   address1: string,
  //   address2: string,
  //   address3: string,
  //   city: string,
  //   zip_code: string,
  //   country: string,
  //   state: string,
  //   display_address: Array<string>,
  // },
  display_phone: string,
};
