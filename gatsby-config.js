const config = require("./config");

module.exports = {
  siteMetadata: {
    siteUrl: config.siteURL,
    title: config.siteTitle,
    description: config.siteDescription,
  },
  plugins: [
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
        resolve: "gatsby-plugin-postcss",
        options: {
            postCssPlugins: [
                require("tailwindcss"),
            ]
        }
    }
  ],
};
