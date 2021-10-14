const config = require("./config");

module.exports = {
  siteMetadata: {
    siteUrl: config.siteURL,
    title: config.siteTitle,
    description: config.siteDescription,
  },
  plugins: [
    `gatsby-transformer-json`,
    {
        resolve: "gatsby-plugin-mdx",
        options: {
            extensions: [`.md`, `.mdx`],
          },
    },
    {
        resolve: "gatsby-source-filesystem",
        options: {
            path: `${__dirname}/content/data`,
            name: `data`,
          },
      },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
    },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/content/posts`,
          name: `post`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/content/projects`,
          name: `project`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/content/series`,
          name: `series`,
        },
      },
    {
        resolve: "gatsby-plugin-postcss",
        options: {
            postCssPlugins: [
                require("tailwindcss"),
            ]
        }
    },
    `gatsby-plugin-fontawesome-css`
  ],
  flags: {
      FAST_DEV: true
  }
};
