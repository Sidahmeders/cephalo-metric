import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.scss'

const Navbar = () => {
    return (
        <div className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/cephalo">Cephalo</Link></li>
                <li> <Link to="/test">Test</Link> </li>
            </ul>
        </div>
    )
}

export default Navbar