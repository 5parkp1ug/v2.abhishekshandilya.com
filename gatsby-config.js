const config = require("./config");

module.exports = {
  siteMetadata: {
    siteUrl: config.siteURL,
    title: config.siteTitle,
    description: config.siteDescription,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1200,
              },
            },
          ],
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
        path: `${__dirname}/content/tutorials`,
        name: `tutorial`,
      },
    },
    `gatsby-plugin-fontawesome-css`,
    {
      resolve: "gatsby-plugin-theme-ui",
      options: {
        prismPreset: "prism-dark",
      },
    },
    `gatsby-transformer-json`,
  ],
  flags: {
    FAST_DEV: true,
  },
};
