import UsersServices from '#root/endpoints/UsersServices';

const usersResolver = async () => {
  return await UsersServices.getUsers();
};

export default usersResolver;
