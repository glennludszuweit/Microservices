import axios from 'axios';

const USERS_SERVICES_URL = 'http://USERS-services:7101';

export default class UsersServices {
  static async createUser({ name, email, password }) {
    const { data } = await axios.post(`${USERS_SERVICES_URL}/users`, {
      name,
      email,
      password,
    });
    return data;
  }

  static async getUsers() {
    const { data } = await axios.get(`${USERS_SERVICES_URL}/users`);
    return data;
  }
}
