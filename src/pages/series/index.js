import * as React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import Layout from "../../layout"

// markup
const Series = () => {
    const series = useStaticQuery(graphql`
        query {
            allSeriesJson {
                edges {
                    node {
                        title
                        slug
                        content
                        description
                        createdAt

                    }
                }
            }
        }
    `)
  return (
        <Layout>
            <h1>#Series</h1>
            <br /> 
            <ol>
                {series.allSeriesJson.edges.map((edge) => {
                    return (
                        <li key={edge.node.id}>
                            <Link to={`/${edge.node.slug}`}>{edge.node.title}</Link>
                        </li>
                    )
                })}
            </ol>
        </Layout>
    )
}

export default Series
