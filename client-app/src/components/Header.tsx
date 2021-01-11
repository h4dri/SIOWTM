import React from "react";
import { Link } from "react-router-dom";
import '../styles/Header.css';

function Header() {
    return (
        <div id="header">
            <div id="headerText"><Link to="/"><h1>SI OWTM</h1></Link></div>
            <div id="headerNav">
                <ul>
                    <li>
                        <Link to="/">Strona Główna</Link>
                    </li>
                    <li>
                        <Link to="/login">Zaloguj</Link>
                    </li>
                    <li>
                        <Link to="/register">Zarejestruj</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;