import * as React from "react";
import Layout from "../layout/index";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

export const query = graphql`
  query ($slug: String!) {
    seriesJson( slug: { eq: $slug }) {
        title
        createdAt
        tags
        posts {
            id
            frontmatter {
                title
            }
            fields {
                slug
            }
        }
    }
  }
`;

const Series = (props) => {
  return (
    <Layout>
      <h1>{props.data.seriesJson.title}</h1>
      <div>{props.data.seriesJson.content}</div>
      <div>
      {props.data.seriesJson.posts.map((post) => {
          return (
              <li key={post.id}>
                <Link to={`/${post.fields.slug}`}>{post.frontmatter.title}</Link>
              </li>
          )
      })}
      </div>
    </Layout>
  );
};

export default Series;
