import _ from 'lodash';

const formatGraphqlErrors = (error) => {
  const errorDetails = _.get(error, 'originalError.response.body');
  try {
    console.log(errorDetails);
    if (errorDetails) return JSON.parse(errorDetails);
  } catch (e) {}
  return error;
};

export default formatGraphqlErrors;
