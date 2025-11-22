import axios from 'axios'

const baseUrl = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
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

export const addRecipe = (dataRecipe) => {
    return baseUrl.post('/addRecipe',dataRecipe)
}

export const getAllRecipes = () => {
    return baseUrl.get('/allRecipes')
}