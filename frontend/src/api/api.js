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

export const dashboardUserAxios = () => {
    return baseUrl.get('/dashboard')
}

export const addRecipeAxios = (dataRecipe) => {
    return baseUrl.post('/addRecipe',dataRecipe)
}

export const getAllRecipesAxios = () => {
    return baseUrl.get('/allRecipes')
}

export const deleteRecipeAxios = (id) => {
    return baseUrl.post(`/deleteRecipe/${id}`,{})
}

export const recipeByIdAxios = (id) => {
    return baseUrl.get(`/recipeById/${id}`)
}

export const logoutAxios = () => {
    return baseUrl.post('/logout', {})
}