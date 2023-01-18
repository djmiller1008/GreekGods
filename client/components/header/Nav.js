import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
    return (
        <div>
            <nav className="nav">
                <p><Link className="nav-link" to={'/'}>Home</Link></p>
                <p><Link className="nav-link" to={'/new'}>Create</Link></p>
            </nav>
        </div>
    )
}