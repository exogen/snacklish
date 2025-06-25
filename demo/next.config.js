module.exports = {
  output: "export",
  distDir: process.env.NODE_ENV === "production" ? "../docs" : undefined,
  basePath: "/snacklish",
  assetPrefix: "/snacklish/",
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.txt$/,
      type: "asset/source",
    });
    return config;
  },
};
