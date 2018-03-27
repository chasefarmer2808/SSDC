module.exports = {
  fbApiRootUrl: 'https://graph.facebook.com/v2.11/',
  ssdcGroupId: '264088390286051',
  prodDb: 'ssdc-website',
  testDb: 'ssdc-test',
  mongoUrl: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`,
  roles: {
    ADMIN: 'admin',
    DEV: 'dev',
    USER: 'user'
  }
};
