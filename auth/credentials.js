// require('dotenv').config();


module.exports = {
  //google OAuth keys created on google's API manager
  mail: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },

  //created api key on google console
  api: {
    key: process.env.SESSION_SECRET
},
};
