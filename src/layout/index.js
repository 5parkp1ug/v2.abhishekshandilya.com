import React from "react";
import Footer from "./footer";
import Header from "./header";


const Layout = (props) => {
    return (
        <div>
            <div>
                <Header />
            </div>
            <section className="bg-black bg-opacity-90">
            <div className="container flex flex-col flex-wrap items-center justify-between mx-auto md:flex-row max-w-7xl">
                <div className="relative text-white">
                {props.children}
                </div>
            </div>
                
            </section>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Layout