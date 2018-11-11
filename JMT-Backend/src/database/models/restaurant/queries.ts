class Query {
  private fields;
  
  constructor(fields = {}) {
    this.fields = fields;
  }

  public setRestaurant = (): string => {
    const { restaurant_id, name, image_url, rating, latitude, longitude, location_id, display_phone } = this.fields;

    return (
      `
        INSERT INTO restaurants (restaurant_id, name, image_url, rating, latitude, longitude, location_id, display_phone)
        VALUES ('${restaurant_id}', '${name}', '${image_url}', ${rating}, ${latitude}, ${longitude}, ${location_id}, '${display_phone}')
      `
    );
  }

  public getRestaurantById = (): string => {
    const { restaurant_id } = this.fields;

    return (
      `
        SELECT * FROM restaurants
        WHERE restaurant_id = '${restaurant_id}'
      `
    );
  }
}

export default Query;
