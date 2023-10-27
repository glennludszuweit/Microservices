import axios from 'axios';

const LISTINGS_SERVICES_URL = 'http://listings-services:7100';

export default class ListingsServices {
  static async getListings() {
    const { data } = await axios.get(`${LISTINGS_SERVICES_URL}/listings`);
    return data;
  }
}
