import * as React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import Layout from "../../layout"

// markup
const Tutorials = () => {
    const tutorials = useStaticQuery(graphql`
        query {
            allTutorialsJson {
                edges {
                    node {
                        title
                        slug
                        content
                        description
                        createdAt
                        url
                    }
                }
            }
        }
    `)
  return (
        <Layout>
            <h1># Tutorials</h1>
            <br /> 
            <ol>
                {tutorials.allTutorialsJson.edges.map((edge) => {
                    return (
                        <li key={edge.node.id}>
                            <Link to={edge.node.url}>{edge.node.title}</Link>
                        </li>
                    )
                })}
            </ol>
        </Layout>
    )
}

export default Tutorials
