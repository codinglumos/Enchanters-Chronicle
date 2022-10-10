import { Link, useNavigate } from "react-router-dom"
import "./UsersNav.css"
//This module handles the navigation bar- links to Chronicles, logout, etc..


export const UserNavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
              <li className="navbar__item hearth">
                <Link className="navbar__link" to="/hearth">Hearth</Link>
            </li>
            
            <li className="navbar__item chronicle-list">
                <Link className="navbar__link" to="/chronicles">Chronicles</Link>
            </li>

            <li className="navbar__item chronicle-update">
                <Link className="navbar__link" to="/newUser">Update Enchanter</Link>
            </li>

            <li className="navbar__item chronicle-update">
                <Link className="navbar__link" to="/moonPhaseInfo">Moon Phase Basics</Link>
            </li>

            <li className="navbar__item chronicle-update">
                <Link className="navbar__link" to="/tarotInfo">Tarot Basics</Link>
            </li>
            { 
            localStorage.getItem("enchanted_user")
            ? <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("enchanted_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
            : ""
}
        </ul>
    )
}