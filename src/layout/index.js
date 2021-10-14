import React from "react";
import Footer from "./footer";
import Header from "./header";


const Layout = (props) => {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                {props.children}    
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Layout