import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../layout/index";
import { Grid } from "@theme-ui/components";

import PostCard from "../components/post-card/PostCard";
// markup
const Blog = () => {
  const posts = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              tags {
                title
                color
                url
              }
              heroImage {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    width: 800
                    height: 400
                    transformOptions: { cropFocus: CENTER }
                  )
                }
              }
            }
            id
            excerpt
            timeToRead
            url
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <Grid
        columns={[
          [1, "1fr"],
          [1, "1fr"],
          [2, "1fr 1fr"],
        ]}
      >
        {posts.allMdx.edges.map((edge) => {
          return (
            <PostCard
              id={edge.node.id}
              heroImage={edge.node.frontmatter.heroImage}
              link={edge.node.url}
              title={edge.node.frontmatter.title}
              excerpt={edge.node.excerpt}
              date={edge.node.frontmatter.date}
              timeToRead={edge.node.timeToRead}
              tags={edge.node.frontmatter.tags}
            />
          );
        })}
      </Grid>
    </Layout>
  );
};

export default Blog;
