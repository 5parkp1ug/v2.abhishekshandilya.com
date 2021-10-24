import * as React from "react";
import Layout from "../layout/index";
import { graphql, Link } from "gatsby";

export const query = graphql`
  query ($slug: String!) {
    tutorialsJson( slug: { eq: $slug }) {
        title
        createdAt
        tags
        posts {
            id
            frontmatter {
                title
                slug
            }
            url
        }
    }
  }
`;

const Series = (props) => {
  return (
    <Layout>
      <h1>{props.data.tutorialsJson.title}</h1>
      <div>{props.data.tutorialsJson.content}</div>
      <div>
      {props.data.tutorialsJson.posts.map((post) => {
          return (
              <li key={`${post.id}`}>
                <Link to={post.url}>{post.frontmatter.title}</Link>
              </li>
          )
      })}
      </div>
    </Layout>
  );
};

export default Series;
