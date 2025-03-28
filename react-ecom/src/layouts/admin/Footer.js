import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

    return (
        <footer className="footer">
        <div className="container-fluid d-flex justify-content-between">
            <nav className="pull-left">
            <ul className="nav">
                <li className="nav-item">
                <Link className="nav-link" to="http://www.themekita.com">
                    ThemeKita
                </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="#">
                    {" "}
                    Help{" "}
                </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="#">
                    {" "}
                    Licenses{" "}
                </Link>
                </li>
            </ul>
            </nav>
            <div className="copyright">
            2024, made with <i className="fa fa-heart heart text-danger" /> by
            <Link href="http://www.themekita.com">ThemeKita</Link>
            </div>
            <div>
            Distributed by
            <Link target="_blank" to="https://themewagon.com/">
                ThemeWagon
            </Link>
            .
            </div>
        </div>
        </footer>
    )
}

export default Footer;