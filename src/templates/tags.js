import * as React from "react";
import Layout from "../layout/index";
import { graphql, Link } from "gatsby";

export const query = graphql`
  query ($title: String!) {
    tagsJson( title: { eq: $title }) {
        title
        description
        color
        }
    allMdx(filter: {frontmatter: {tags: {elemMatch: {title: {eq: $title}}}}}) {
    edges {
      node {
        frontmatter {
          title
        }
        fields {
            slug
          }
      }
    }
  }
    }
`;

const Tags = (props) => {
  return (
    <Layout>
      { props.data.tagsJson ?
      <div>
          <h1 style={{color: props.data.tagsJson.color}}>#{props.data.tagsJson.title}</h1>
            <div>{props.data.tagsJson.description}</div>
      </div>
        : <h1>#{props.pageContext.title}</h1>
      }
      <div>
      {props.data.allMdx.edges.map((edge) => {
          return (
              <li key={edge.node.id}>
                <Link to={`/${edge.node.fields.slug}`}>{edge.node.frontmatter.title}</Link>
              </li>
          )
      })}
      </div>
    </Layout>
  );
};

export default Tags;
