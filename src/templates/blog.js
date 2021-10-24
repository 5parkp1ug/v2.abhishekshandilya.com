import * as React from "react";
import Layout from "../layout/index";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Box, Divider, Flex, Image, Text } from "theme-ui";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

export const query = graphql`
  query ($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMM Do, YYYY")
        tags {
          color
          title
          url
          slug
        }
        heroImage {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              transformOptions: { cropFocus: CENTER }
              width: 1600
            )
          }
        }
      }
      timeToRead
      wordCount {
        words
      }
      body
    }
  }
`;

const Blog = (props) => {
  return (
    <Layout>
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Box
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
            position: "absolute",
            height: "100%",
            width: "100%",
            mt: "-100px",
            "::before": {
              content: `""`,
              display: "inline-block",
              height: "100%",
            },
          }}
        >
          <Text
            variant="headline"
            sx={{
              color: "orange",
              lineHeight: "body",
              display: "inline-block",
            }}
          >
            {props.data.mdx.frontmatter.title}
          </Text>
          <Flex sx={{ flexDirection: "col" }}>
            <Text variant="caption">
              Date Published: {props.data.mdx.frontmatter.date}
            </Text>
            <Text variant="caption">
              {props.data.mdx.timeToRead} min read /{" "}
              {props.data.mdx.wordCount.words} words
            </Text>
          </Flex>
          {props.data.mdx.frontmatter.tags.map((tag) => {
            return (
              <>
                <Link
                  key={tag.slug}
                  to={tag.url}
                  sx={{
                    backgroundColor: tag.color,
                  }}
                >
                  {tag.title}
                </Link>{" "}
              </>
            );
          })}
        </Box>

        <Image src={getSrc(props.data.mdx.frontmatter.heroImage)} />
      </Box>

      <Divider sx={{ borderBottom: "1.5px solid", mb: 4 }} />
      <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
    </Layout>
  );
};

export default Blog;
