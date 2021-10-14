import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../layout/index";

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
              }
            }
            id
            excerpt
            timeToRead
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <section>
        <div className="px-5 py-6 mx-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16 max-w-7xl container">
          <div className="flex grid grid-cols-12 pb-10 sm:px-5 gap-x-8 gap-y-16">
          {posts.allMdx.edges.map((edge) => {
          return (
            <div key={edge.node.id} className="flex flex-col items-start col-span-12 bg-black bg-opacity-40 border border-opacity-50 border-gray-600 rounded-3xl p-0 sm:col-span-6 xl:col-span-4" >
                
            <div className='card-body p-6'>
            <figure>
                  <img
                    className="object-cover w-full mb-2 overflow-hidden shadow-sm max-h-56 rounded-3xl"
                    src="https://cdn.devdojo.com/images/may2021/fruit.jpg"
                  />
                </figure>
                <h2 className="text-lg font-bold mt-1 sm:text-xl md:text-2xl">
                <Link to={`/${edge.node.fields.slug}`}>{edge.node.frontmatter.title}</Link>
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {edge.node.excerpt}
                </p>
                <p className="pt-2 text-xs font-medium mt-4">
                  <span className="mx-1">{edge.node.frontmatter.date}</span> ·{" "}
                  <span className="mx-1 text-gray-600">{edge.node.timeToRead} min. read</span>
                </p>
                <div className="space-x-2 mt-2">
                    { edge.node.frontmatter.tags.map((tag, index) => {
                        return (
                            <Link key={tag.id} style={{backgroundColor: tag.color}} className="px-2.3 badge badge-md" to={`/tag/${tag.title}`}>#{tag.title}</Link>
                        )
                    })}
                </div>
            </div>
          </div>
          );
        })}
            

           
          </div> 
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
