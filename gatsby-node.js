const path = require("path");

module.exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const slug = path.basename(node.fileAbsolutePath, ".mdx");
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });

    const collection = getNode(node.parent).sourceInstanceName;
    createNodeField({
      node,
      name: "collection",
      value: collection,
    });
  }
};

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve("./src/templates/blog.js");
  const seriesTemplate = path.resolve("./src/templates/series.js");
  const tagsTemplate = path.resolve("./src/templates/tags.js");

  const posts = await graphql(`
    query {
      allMdx(filter: { fields: { collection: { eq: "post" } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result) => {
    result.data.allMdx.edges.forEach((edge) => {
      createPage({
        component: blogTemplate,
        path: `/${edge.node.fields.slug}`,
        context: {
          slug: edge.node.fields.slug,
        },
      });
    });
  });

  const series = await graphql(`
    query {
      allMdx(filter: { fields: { collection: { eq: "series" } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result) => {
    result.data.allMdx.edges.forEach((edge) => {
      createPage({
        component: blogTemplate,
        path: `/${edge.node.fields.slug}`,
        context: {
          slug: edge.node.fields.slug,
        },
      });
    });
  });

  const series_list = await graphql(`
    query {
      allSeriesJson {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then((result) => {
    result.data.allSeriesJson.edges.forEach((edge) => {
      createPage({
        component: seriesTemplate,
        path: `/${edge.node.slug}`,
        context: {
          slug: edge.node.slug,
        },
      });
    });
  });

  all_tags = []
  const tags_list = await graphql(`
    query {
      allTagsJson {
        edges {
          node {
            title
          }
        }
      }
      allMdx {
        group(field: frontmatter___tags___title) {
            tag: fieldValue
          }
      }
    }
  `).then((result) => {
    result.data.allTagsJson.edges.forEach((edge) => {
        all_tags.push(edge.node.title);
      createPage({
        component: tagsTemplate,
        path: `tag/${edge.node.title}`,
        context: {
          title: edge.node.title,
        },
      });
    });
    result.data.allMdx.group.forEach((edge)=>{
        if (!(edge.node in all_tags)){
            createPage({
                component: tagsTemplate,
                path: `tag/${edge.tag}`,
                context: {
                  title: edge.tag,
                },
              });
        }
    });
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [`
        type Mdx implements Node {
            frontmatter: Frontmatter
        }
        type Frontmatter {
            series: SeriesJson @link(by: "slug")
        }

      type SeriesJson implements Node @dontInfer {
        title: String!
        slug: String!
        description: String!
        content: String!
        createdAt: Date!
        tags: [String!]!
        posts: [Mdx] @link(by: "frontmatter.series.slug", from: "slug")
      }

      type TagsJson implements Node @dontInfer {
          title: String!
          description: String
          color: String
          posts: [Mdx] @link(by: "frontmatter.tags.elemMatch.title", from: "title")
      }
    `,
    schema.buildObjectType({
        name: "Frontmatter",
        fields: {
          tags: {
            type: "[TagsJson]",
            resolve: (source, args, context, info) => {
                return source.tags.map(tag => {
                    const found = context.nodeModel.getAllNodes({ type: "TagsJson" }).find(obj => obj.title === tag);
                    return found ? found : { title: tag, color: '#000000', description: null };
                  })
            },
          },
        },
      }),
    ];
  createTypes(typeDefs);
};
