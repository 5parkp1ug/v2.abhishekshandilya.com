import * as React from "react"
import { Link } from "gatsby"
import Layout from "../../layout"

// markup
const AboutPage = () => {
  return (
        <Layout>
            <p>Hello World! I am Abhishek Shandilya. <Link to='/contact'>Contact me</Link> !</p>
        </Layout>
    )
}

export default AboutPage
