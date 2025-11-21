import axios from 'axios'

const baseUrl = axios.create({
    baseURL: process.env.BACKEND_URL,
    withCredentials: true
})

export const registerAxios = (dataUser) =>{
    return baseUrl.post('/register',dataUser)
}

export const loginAxios = (dataUser) =>{
    return baseUrl.post('/login',dataUser)
}

export const dashboardUser = () => {
    return baseUrl.get('/dashboard')
}