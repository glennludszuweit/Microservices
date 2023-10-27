import ListingsServices from '#root/endpoints/ListingsServices';

const listingsResolver = async () => {
  return await ListingsServices.getListings();
};

export default listingsResolver;
