import { Link, useNavigate } from "react-router-dom"
import "./UsersNav.css"

export const UserNavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item chronicle">
                <Link className="navbar__link" to="/chronicles">Chronicles</Link>
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