import db from '@db/index';

import Query from './queries';

export const getRestaurantById = async (id: string) => {
  try {
    const restaurantQuery = new Query({ restaurant_id: id });
    const data = await db.query(restaurantQuery.getRestaurantById());

    return data.rows;
  } catch (e) {
    throw new Error(e);
  }
}

export const setRestaurant = ({ restaurant_id, name, image_url, rating, price, latitude, longitude, location_id, display_phone }) => {
  try {
    const restaurantQuery = new Query({ restaurant_id, name, image_url, rating, price, latitude, longitude, location_id, display_phone });

    db.query(restaurantQuery.setRestaurant());
  } catch (e) {
    throw new Error(e);
  }
}
