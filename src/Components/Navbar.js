import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <Link className="navbar-text" to ="/" > <i>Mern crud</i> </Link>
            </nav>
        </div>
    )
}

export default Navbar;
