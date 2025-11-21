import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate} from "react-router-dom";
import Loader from "./Loader";

const SecurityRoutes = ({children}) => {

    const navigate = useNavigate()

    const { user, dashboardLoading } = useContext(UserContext)

    if(dashboardLoading){
        return <Loader/>
    }

    if(!user){
        return navigate('/login')
    }

    return (
        {children}
    )
}

export default SecurityRoutes