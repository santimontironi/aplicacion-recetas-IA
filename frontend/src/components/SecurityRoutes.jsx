import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import Loader from "./Loader"
import { Outlet } from "react-router-dom";

const SecurityRoutes = () => {

    const { user, dashboardLoading } = useContext(UserContext)

    if(dashboardLoading){
        return <Loader/>
    }

    if(!user){
        return <Navigate to="/ingresar"/> 
    }

    return (
        <Outlet/>
    )
}

export default SecurityRoutes