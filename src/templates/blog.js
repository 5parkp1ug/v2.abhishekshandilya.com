import * as React from "react";
import Layout from "../layout/index";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

export const query = graphql`
  query ($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        tags {
            title
            color
            url
        }
      }
      body
    }
  }
`;

const Blog = (props) => {
  return (
    <Layout>
      <h1>{props.data.mdx.frontmatter.title}</h1>
      {props.data.mdx.frontmatter.tags.map((tag)=>{
            return (<Link to={tag.url} style={{backgroundColor: tag.color}}>{tag.title}</Link>)
      })}

        <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
      
    </Layout>
  );
};

export default Blog;
