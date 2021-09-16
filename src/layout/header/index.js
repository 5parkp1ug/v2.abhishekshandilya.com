import { Link } from "gatsby";
import React from "react";

const Header = () => {
    return (
        <header>
            <h1>Abhishek Shandilya</h1>
            <nav>
                <ul>
                    <li><Link to="/">Blog</Link></li>
                    <li><Link to="/guides">Guides</Link></li>
                    <li><Link to="/tags">Tags</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>

     )
}

export default Header