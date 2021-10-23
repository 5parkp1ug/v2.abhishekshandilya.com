const path = require("path");

module.exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  
  // Add url field to the nodes which can be accessed later while creating links
  const node_types = ["TutorialsJson", "TagsJson", "Mdx"]
  if (node_types.includes(node.internal.type)) {
      var url = ""
    switch(node.internal.type) {
        case "TutorialsJson":
            url = `/tutorials/${node.slug}`
            node.url = url;
            break;
        case "TagsJson":
            url = `/tags/${node.slug}`
            node.url = url;
            break;
        case "Mdx":
            url = `/blog/${node.frontmatter.slug}`
            node.url = url;
            break;
      }
  }

  // add collection field to filter based on post, project, tutorial etc..
  if (node.internal.type === "Mdx") {    
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
  const tutorialTemplate = path.resolve("./src/templates/tutorial.js");
  const tagsTemplate = path.resolve("./src/templates/tags.js");

  const posts = await graphql(`
    query {
      allMdx(filter: { fields: { collection: { eq: "post" } } }) {
        edges {
          node {
            frontmatter {
              slug
            }
            url
          }
        }
      }
    }
  `).then((result) => {
    result.data.allMdx.edges.forEach((edge) => {
      createPage({
        component: blogTemplate,
        path: `${edge.node.url}`,
        context: {
          slug: edge.node.frontmatter.slug,
        },
      });
    });
  });

  const tutorial = await graphql(`
    query {
      allMdx(filter: { fields: { collection: { eq: "tutorial" } } }) {
        edges {
          node {
            frontmatter {
              slug
            }
            url
          }
        }
      }
    }
  `).then((result) => {
    result.data.allMdx.edges.forEach((edge) => {
      createPage({
        component: blogTemplate,
        path: `${edge.node.url}`,
        context: {
          slug: edge.node.frontmatter.slug,
        },
      });
    });
  });

  const tutorials_list = await graphql(`
    query {
        allTutorialsJson {
        edges {
          node {
            slug
            url
          }
        }
      }
    }
  `).then((result) => {
    result.data.allTutorialsJson.edges.forEach((edge) => {
      createPage({
        component: tutorialTemplate,
        path: `${edge.node.url}`,
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
            url
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
        path: `${edge.node.url}`,
        context: {
          title: edge.node.title,
        },
      });
    });
    result.data.allMdx.group.forEach((edge)=>{
        if (!(edge.node in all_tags)){
            createPage({
                component: tagsTemplate,
                path: `/tags/${edge.tag}`,
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
            tutorial: TutorialsJson @link(by: "slug")
            slug: String!
        }

      type TutorialsJson implements Node {
        title: String!
        slug: String!
        description: String!
        content: String!
        createdAt: Date!
        tags: [String!]!
        posts: [Mdx] @link(by: "frontmatter.tutorial.slug", from: "slug")
      }

      type TagsJson implements Node {
          title: String!
          description: String
          color: String
          slug: String!
          posts: [Mdx] @link(by: "frontmatter.tags.elemMatch.slug", from: "slug")
      }
    `,
    schema.buildObjectType({
        name: "Frontmatter",
        fields: {
          tags: {
            type: "[TagsJson]",
            resolve: (source, args, context, info) => {
                return source.tags.map(tag => {
                    const found = context.nodeModel.getAllNodes({ type: "TagsJson" }).find(obj => obj.slug === tag);
                    return found ? found : { slug: tag, title: tag, color: '#FF6347', description: null, url: `/tags/${tag}` };
                  })
            },
          },
        },
      }),
    ];
  createTypes(typeDefs);
};
