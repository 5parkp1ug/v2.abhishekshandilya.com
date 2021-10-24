import React from "react";
import Footer from "./footer";
import Header from "./header";

import { Container } from "theme-ui";


const Layout = (props) => {
    return (
        <Container variant="copy">
            <Header />
            <Container variant="copy">
                {props.children}    
            </Container>
            <Footer />
        </Container>
    )
}

export default Layout