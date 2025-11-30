import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import Loader from "./Loader"

const SecurityRoutes = ({children}) => {

    const { user, dashboardLoading } = useContext(UserContext)

    if(dashboardLoading){
        return <Loader/>
    }

    if(!user){
        return <Navigate to="/ingresar"/> 
    }

    return (
        children
    )
}
    
export default SecurityRoutes