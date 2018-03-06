module.exports = {
  fbApiRootUrl: 'https://graph.facebook.com/v2.11/',
  ssdcGroupId: '264088390286051',
  mongoUrl: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`
};
