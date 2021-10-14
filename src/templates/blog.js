import * as React from "react";
import Layout from "../layout/index";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        tags {
            title
            color
        }
      }
      body
    }
  }
`;

const Blog = (props) => {
  return (
    <Layout>


            <div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">


                <div class="font-sans">
                    <p class="text-base md:text-sm text-green-500 font-bold">&lt; <a href="#" class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">BACK TO BLOG</a></p>
                            <h1 class="font-bold font-sans break-normal text-white pt-6 pb-2 text-3xl md:text-4xl">Welcome to Minimal Blog</h1>
                            <p class="text-sm md:text-base font-normal text-gray-600">Published 19 February 2019</p>
                </div>

                <div class="text-base md:text-sm text-gray-500 px-4 py-6">
                    Tags: <a href="#" class="text-base md:text-sm text-green-500 no-underline hover:underline">Link</a> . <a href="#" class="text-base md:text-sm text-green-500 no-underline hover:underline">Link</a>
                </div>

                <hr class="border-b-2 border-gray-400 mb-8 mx-4" />
                <MDXRenderer>{props.data.mdx.body}</MDXRenderer>

                <div class="container px-4">
                    <div class="font-sans bg-gradient-to-b from-green-100 to-gray-100 rounded-lg shadow-xl p-4 text-center">
                        <h2 class="font-bold break-normal text-xl md:text-3xl">Subscribe to my Newsletter</h2>
                        <h3 class="font-bold break-normal text-sm md:text-base">Get the latest posts delivered right to your inbox</h3>
                        <div class="w-full text-center pt-4">
                            <form action="#">
                                <div class="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                                    <input type="email" placeholder="youremail@example.com" class="flex-1 mt-4 appearance-none border border-gray-400 rounded shadow-md p-3 text-gray-600 mr-2 focus:outline-none" />
                                    <button type="submit" class="flex-1 mt-4 block md:inline-block appearance-none bg-green-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-green-400">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <hr class="border-b-2 border-gray-400 mb-8 mx-4" />


                <div class="font-sans flex justify-between content-center px-4 pb-12">
                    <div class="text-left">
                        <span class="text-xs md:text-sm font-normal text-gray-600">&lt; Previous Post</span><br />
                        <p><a href="#" class="break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline">Blog title</a></p>
                    </div>
                    <div class="text-right">
                        <span class="text-xs md:text-sm font-normal text-gray-600">Next Post &gt;</span><br />
                        <p><a href="#" class="break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline">Blog title</a></p>
                    </div>
                </div>




            </div>
      <h1>{props.data.mdx.frontmatter.title}</h1>
      {props.data.mdx.frontmatter.tags.map((tag)=>{
            return (<Link to={`/tag/${tag.title}`} style={{backgroundColor: tag.color}}>{tag.title}</Link>)
      })}
      
    </Layout>
  );
};

export default Blog;
