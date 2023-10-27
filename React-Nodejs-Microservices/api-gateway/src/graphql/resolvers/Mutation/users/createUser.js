import UsersServices from '#root/endpoints/UsersServices';

const createUserResolver = async (obj, { name, email, password }) => {
  return await UsersServices.createUser({ name, email, password });
};

export default createUserResolver;
