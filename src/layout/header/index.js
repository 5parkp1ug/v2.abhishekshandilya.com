import { Link } from "gatsby";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebook, faLinkedin, faStackOverflow  } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  return (
    <section>
            <div>
                <Link to="/" >{"<AS/>"}</Link>
                <Link to="/">Blog</Link>
                <Link to="/series">Series</Link>
                <Link to="/tags">Tags</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
            <div >
                <FontAwesomeIcon icon={faGithub} size={"3x"} inverse />
                <FontAwesomeIcon icon={faFacebook} size={"3x"} inverse style={{"color": "#4267B2"}}/>
                <FontAwesomeIcon icon={faLinkedin} size={"3x"} inverse style={{"color": "#0e76a8"}}/>
                <FontAwesomeIcon icon={faStackOverflow} size={"3x"} inverse style={{"color": "#ef8236"}}/>
            </div>
    </section>
  );
};

export default Header;
