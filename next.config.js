module.exports = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `@import "styles/vars.scss"; @import "styles/mixins.scss";`,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      }
    ];
  }
};
