/// webpack.config.js
const { DefinePlugin } = require("webpack");

module.exports = {
  plugins: [
    new DefinePlugin({
      "process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN": JSON.stringify(
        process.env.NODE_ENV == "production"
          ? process.env.MapboxAccessTokenProd
          : process.env.MapboxAccessTokenDev,
      ),
    }),
  ],
};
