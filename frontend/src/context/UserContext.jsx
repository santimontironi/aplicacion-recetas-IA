import { createContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { loginAxios, registerAxios, dashboardUserAxios } from "../api/api";

export const UserContext = createContext();

export const UserProvider = () => {

    const [loginUserLoading, setLoginUserLoading] = useState(false)
    const [registerUserLoading, setRegisterUserLoading] = useState(false)
    const [dashboardLoading, setDashboardLoading] = useState(true)
    const [user, setUser] = useState(null)

    const loginUser = async (dataUser) => {
        setLoginUserLoading(true)
        try {
            const res = await loginAxios(dataUser)
            setUser(res.data.user)
            return res.data
        }
        catch (error) {
            console.log(error)
            throw error
        }
        finally {
            setTimeout(() => {
                setLoginUserLoading(false)
            }, 1500)
        }
    }

    const registerUser = async (dataUser) => {
        setRegisterUserLoading(true)
        try {
            const res = await registerAxios(dataUser)
            setUser(res.data.user)
        }
        catch (error) {
            console.log(error)
            throw error
        }
        finally {
            setTimeout(() => {
                setRegisterUserLoading(false)
            }, 1500)
        }
    }

    useEffect(() => {
        async function getDashboardUser() {
            try {
                const res = await dashboardUserAxios()
                if(res.data.authorized === false){
                    setUser(null)
                    return
                }
                setUser(res.data.user)
            }
            catch (error) {
                console.log(error)
                setUser(null)
            }
            finally {
                setTimeout(() => {
                    setDashboardLoading(false)
                }, 1500)
            }
        }
        getDashboardUser()
    }, [])


    return (
        <UserContext.Provider value={{ loginUser, loginUserLoading, user, registerUserLoading, registerUser, dashboardLoading }}>
            <Outlet />
        </UserContext.Provider>
    )
}