import * as React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import Layout from "../../layout"

// markup
const Tags = () => {
    const tags = useStaticQuery(graphql`
        query {
            allTagsJson {
                edges {
                    node {
                        title
                        description
                        color
                    }
                }
            }
        }
    `)
  return (
        <Layout>
            <h1>#Tags</h1>
            <br /> 
            <ol>
                {tags.allTagsJson.edges.map((edge) => {
                    return (
                        <li key={edge.node.id}>
                            <Link to={`/tag/${edge.node.title}`}>{edge.node.title}</Link>
                        </li>
                    )
                })}
            </ol>
        </Layout>
    )
}

export default Tags
