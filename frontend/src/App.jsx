import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DashboardUser from "./pages/DashboardUser";
import SecurityRoutes from "./components/SecurityRoutes";
import { RecipesProvider } from "./context/RecipesContext";
import AddRecipe from "./pages/AddRecipe";
import Recipe from "./pages/Recipe";
import { RecipeByIdProvider } from "./context/RecipeById.JSX";

function App() {

  return (
    <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route element={<UserProvider />}>
            <Route path="/ingresar" element={<Login />} />
            <Route path="/registrarse" element={<Register />} />
            <Route path="/inicio" element={<SecurityRoutes>
              <DashboardUser/>
            </SecurityRoutes>} />
          </Route>

          <Route element={<RecipesProvider />}>
            <Route path="/nueva-receta" element={<SecurityRoutes><AddRecipe /></SecurityRoutes>} />
          </Route>

          <Route element={<RecipeByIdProvider/>}>
              <Route path="/receta/:id" element={<SecurityRoutes><Recipe/></SecurityRoutes>}/>
          </Route>

        </Routes>
      
    </BrowserRouter>
  )
}

export default App
