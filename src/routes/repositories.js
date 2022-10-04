/* eslint-disable no-undef */
const axios = require('axios');
const config = require('../config/config.json');

const configuration = config[process.env.NODE_ENV];

let generateURL = (params) => {
  let formattedParams = formatParams(params);
  return Object.entries(formattedParams).reduce((acc, [key, value]) => {
    if (key == 'q') {
      if (value == '') return acc.concat(`${key}=${value}`);
      return acc.concat(`${key}=${value}&`);
    } else {
      return acc.concat(`${key}=${value}&`);
    }
  }, `${configuration.BASE_URL}${configuration.SEARCH_REPOS_URL}?`);
};

let formatParams = (params) => {
  // if (formattedParams.q) {
  //   console.log(formattedParams.q, 'is it coming here');
  //   return Object.assign(formattedParams, {
  //     sort: params.sort || 'stars',
  //     order: params.resultType === 'least_rated' ? 'asc' : 'desc',
  //     per_page: params.limit || 20,
  //   });
  // }

  let formattedParams = {
    q: '',
    sort: params.sort || 'stars',
    order: params.resultType === 'least_rated' ? 'asc' : 'desc',
    per_page: params.limit || 20,
  }; //as q is mandatory in url
  if (params.language) {
    formattedParams.q = formattedParams.q.concat(
      `+language:${params.language}`
    );
  }
  if (params.afterDate) {
    formattedParams.q = formattedParams.q.concat(
      `+created:>${params.afterDate}`
    );
  }
  if (params.beforeDate) {
    formattedParams.q = formattedParams.q.concat(
      `+created:<${params.beforeDate}`
    );
  }
  return formattedParams;
};

// function to get the data from the API
let getPopularRepositories = async (params) => {
  try {
    let builtURL = generateURL(params);

    console.log(builtURL, 'LOGGGGERERS');

    let response = await axios({
      method: 'get',
      url: builtURL,
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    }).catch(function (error) {
      console.error(error);
      response.status(500).json({
        message:
          'Error in invocation of API: https://api.github.com/search/repositories',
      });
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

//controller function
module.exports = async (req, res) => {
  let repositories = await getPopularRepositories(req?.query);
  res.send(repositories.data);
};
