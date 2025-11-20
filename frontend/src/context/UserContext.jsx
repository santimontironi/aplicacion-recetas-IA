import { createContext } from "react";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { loginAxios } from "../api/api";
import { registerAxios } from "../api/api";

export const UserContext = createContext();

export const UserProvider = () => {

    const[loginUserLoading, setLoginUserLoading] = useState(false)
    const[registerUserLoading,setRegisterUserLoading] = useState(false)
    const[user,setUser] = useState(null)

    const loginUser = async (dataUser) => {
        setLoginUserLoading(true)
        try{
            const res = await loginAxios(dataUser)
            setUser(res.data.user)
            return res.data
        }
        catch(error){
            console.log(error)
            throw error
        }
        finally{
            setTimeout(() => {
                setLoginUserLoading(false)
            },1500)
        }
    }

    const registerUser = async (dataUser) => {
        setRegisterUserLoading(true)
        try{
            const res = await registerAxios(dataUser)
            setUser(res.data.user)
        }
        catch(error){
            console.log(error)
            throw error
        }
        finally{
            setTimeout(() => {
                setRegisterUserLoading(false)
            },1500)
        }
    }


    return (
        <UserContext.Provider value={{loginUser,loginUserLoading,user,registerUserLoading,registerUser}}>
            <Outlet />
        </UserContext.Provider>
    )
}