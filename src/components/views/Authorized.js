import { Navigate, useLocation } from "react-router-dom"
//if the user is a current user then they are authorized to login 
//else they are not

export const Authorized = ({ children }) => {
    const location = useLocation()

    if (localStorage.getItem("enchanted_user")) {
        return children
    }
    else {
        return <Navigate
            to={`/login/${location.search}`}
            replace
            state={{ location }} />
    }
}