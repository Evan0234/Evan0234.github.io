const axios = require('axios');
axios.get('https://phonevalidation.abstractapi.com/v1/?api_key=add_later&phone=14152007986')
.then(response => {
console.log(response.data);
})
.catch(error => {
console.log(error);
});
