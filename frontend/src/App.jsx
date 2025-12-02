import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { RecipesProvider } from "./context/RecipesContext";
import { RecipeByIdProvider } from "./context/RecipeById";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DashboardUser from "./pages/DashboardUser";
import SecurityRoutes from "./components/SecurityRoutes";
import Recipe from "./pages/Recipe";
import RecipeGenerated from "./components/RecipeGenerated";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/ingresar" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />

          <Route path="/inicio" element={
            <SecurityRoutes>
              <RecipesProvider>
                <DashboardUser />
              </RecipesProvider>
            </SecurityRoutes>
          } />

          <Route path="/receta-generada" element={
            <SecurityRoutes>
              <RecipeGenerated />
            </SecurityRoutes>
          } />

          <Route path="/receta/:id" element={
            <SecurityRoutes>
              <RecipeByIdProvider>
                <Recipe />
              </RecipeByIdProvider>
            </SecurityRoutes>
          } />
          
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
