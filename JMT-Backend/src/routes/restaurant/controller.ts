import { Request, Response } from 'express';

import axios from '@utils/axios';
import * as restaurantRepository from '@db/models/restaurant/repositories';
import restaurantModel from '@db/models/restaurant/model';

export const getRestaurantDetail = async (req: Request, res: Response) => {
  const { id } = req.query;
  const endpoint = `https://api.yelp.com/v3/businesses/${id}`;

  try {
    /**
     * First, It checks whether our database has the information already
     */
    // const restaurantFromDatabase = await restaurantRepository.getRestaurantById(id);

    // if (restaurantFromDatabase.length) {
    //   return res.json(restaurantFromDatabase[0]);
    // }

    /**
     * calling yelp api if there's no corresponding data in our database
     */
    const restaurantRes = await axios.get(endpoint);

    /**
     * create a restaurant model
     */
    const resModel = new restaurantModel({
      restaurantId: restaurantRes.data.id,
      name: restaurantRes.data.name,
      imageUrl: restaurantRes.data.imageUrl,
      rating: restaurantRes.data.rating,
      price: restaurantRes.data.price,
      locationId: 0, // for now
      displayPhone: restaurantRes.data.displayPhone,
      longitude: restaurantRes.data.coordinates.longitude,
      latitude: restaurantRes.data.coordinates.latitude
    });

    /**
     * save the restaurant information in our database and return it
     */
    // restaurantRepository.setRestaurant(resModel);

    return res.json(restaurantRes.data);
  } catch (e) {
    return res.status(404).json({
      success: false,
      msg: e.message
    });
  }
};

export const searchRestaurant = async (req: Request, res: Response) => {
  const {
    categories,
    location,
    latitude,
    longitude,
    sort_by,
    price
  } = req.query;
  let endpoint;

  if (location) {
    endpoint = `https://api.yelp.com/v3/businesses/search?categories=${categories}&location=${location}`;
  } else {
    // for current location
    endpoint = `https://api.yelp.com/v3/businesses/search?categories=${categories}&latitude=${latitude}&longitude=${longitude}&radius=1500`;
  }

  if (sort_by) {
    endpoint += `&sort_by=${sort_by}`;
  }
  if (price) {
    endpoint += `&price=${price}`;
  }

  try {
    const data = await axios.get(endpoint);
    const {
      data: { businesses }
    } = data;
    const validBusinesses = businesses.filter(
      business =>
        business.coordinates.latitude && business.coordinates.longitude
    );

    return res.json(validBusinesses);
  } catch (e) {
    return res.status(404).json({
      success: false,
      msg: e.message
    });
  }
};

export const getRestaurantAutoComplete = async (
  req: Request,
  res: Response
) => {
  const { keyword, latitude, longitude } = req.query;
  const endpoint = `https://api.yelp.com/v3/autocomplete?text=${keyword}&latitude=${latitude}&longitude=${longitude}`;

  try {
    const result = await axios.get(endpoint);

    return res.json(result.data);
  } catch (e) {
    return res.status(404).json({
      success: false,
      msg: e.message
    });
  }
};

export const joinRestaurant = async (req, res: Response) => {
  const { userId } = req.decoded;
  const { date, restaurantId, restaurantName } = req.body;

  try {
    const userRes = await restaurantRepository.getUserFromUserRestaurant({
      userId,
      date,
      restaurantId
    });

    if (!userRes.success) {
      return res.status(400).json({
        success: false,
        msg: userRes.msg
      });
    }

    const groupId = await restaurantRepository.joinRestaurant({
      userId,
      date,
      restaurantId,
      restaurantName
    });

    return res.json({
      success: true,
      userId,
      date,
      restaurantId,
      restaurantName,
      groupId
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      msg: e.message
    });
  }
};
