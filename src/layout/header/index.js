import { Link } from "gatsby";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebook, faLinkedin, faStackOverflow  } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  return (
    <section className="w-full px-8 py-4 text-gray-700 bg-black">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
            <div className="relative flex flex-col md:flex-row">
                <Link to="/" className="flex items-center mb-5 font-medium lg:w-auto lg:items-center lg:justify-center md:mb-0">
                    <span className="mx-auto text-xl font-black leading-none text-white select-none antialiased">{"<AS/>"}<span className="text-indigo-600">.</span></span>
                </Link>
                <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
                    <Link to="/" className="mr-5 font-medium leading-6 text-white" activeClassName="text-indigo-600 bordered">Blog</Link>
                    <Link to="/series" className="mr-5 font-medium leading-6 text-white" activeClassName="text-indigo-600">Series</Link>
                    <Link to="/tags" className="mr-5 font-medium leading-6 text-white" activeClassName="text-indigo-600">Tags</Link>
                    <Link to="/about" className="mr-5 font-medium leading-6 text-white" activeClassName="text-indigo-600">About</Link>
                    <Link to="/contact" className="mr-5 font-medium leading-6 text-white" activeClassName="text-indigo-600">Contact</Link>
                </nav>
            </div>
            <div class="inline-flex items-center ml-5 space-x-3 lg:justify-end" style={{fontSize: "0.5rem"}}>
                <FontAwesomeIcon icon={faGithub} size={"3x"} inverse />
                <FontAwesomeIcon icon={faFacebook} size={"3x"} inverse style={{"color": "#4267B2"}}/>
                <FontAwesomeIcon icon={faLinkedin} size={"3x"} inverse style={{"color": "#0e76a8"}}/>
                <FontAwesomeIcon icon={faStackOverflow} size={"3x"} inverse style={{"color": "#ef8236"}}/>
            </div>
        </div>
    </section>
  );
};

export default Header;
