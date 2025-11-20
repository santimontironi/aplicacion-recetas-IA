import axios from 'axios'

const baseUrl = axios.create({
    baseURL: process.env.BACKEND_URL,
    withCredentials: true
})

export const registerAxios = () =>{
    baseUrl.post('/register',dataUser)
}

export const loginAxios = () =>{
    baseUrl.post('/login',dataUser)
}