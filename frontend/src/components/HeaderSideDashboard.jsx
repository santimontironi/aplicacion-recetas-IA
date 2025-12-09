import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const HeaderSideDashboard = () => {

    const { user, logoutUser } = useContext(UserContext)

    return (
        <div className="pt-4 pb-4 border-b-3 border-b-white flex flex-row items-center justify-between">
            <h2 className="text-white text-[30px] font-bold text-shadow-[5px_5px_10px_rgba(0,0,0,0.6)]">
                Hola, {user.username}
            </h2>
            <button
                className="bg-red-600 hover:bg-red-700 p-3 text-white rounded-lg cursor-pointer"
                onClick={logoutUser}
            >
                Cerrar sesión
            </button>
        </div>
    )
}

export default HeaderSideDashboard