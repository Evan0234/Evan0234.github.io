const axios = require('axios');

axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&phone=${process.env.ABSTRACT_PHONE_NUMBER}`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
