import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate} from "react-router-dom";
import Loader from "./Loader"
import { Outlet } from "react-router-dom";

const SecurityRoutes = () => {

    const navigate = useNavigate()

    const { user, dashboardLoading } = useContext(UserContext)

    if(dashboardLoading){
        return <Loader/>
    }

    if(!user){
        return navigate('/login')
    }

    return (
        <Outlet/>
    )
}

export default SecurityRoutes