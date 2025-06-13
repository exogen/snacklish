module.exports = {
  output: "export",
  distDir: process.env.NODE_ENV === "production" ? "../docs" : undefined,
  basePath: "/snacklish",
  assetPrefix: "/snacklish/",
  trailingSlash: true,
};
