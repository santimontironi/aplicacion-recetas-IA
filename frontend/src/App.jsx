import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DashboardUser from "./pages/DashboardUser";
import SecurityRoutes from "./components/SecurityRoutes";
import { RecipesProvider } from "./context/RecipesContext";
import Recipe from "./pages/Recipe";
import { RecipeByIdProvider } from "./context/RecipeById";
import RecipeGenerated from "./components/RecipeGenerated";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route element={<UserProvider />}>
          <Route path="/ingresar" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />

          <Route path="/inicio" element={
            <RecipesProvider>
              <SecurityRoutes>
                <DashboardUser />
              </SecurityRoutes>
            </RecipesProvider>
          } />

          <Route path="/receta-generada" element={
            <SecurityRoutes>
              <RecipeGenerated />
            </SecurityRoutes>
          } />

        </Route>

        <Route element={<RecipeByIdProvider />}>
          <Route path="/receta/:id" element={<SecurityRoutes><Recipe /></SecurityRoutes>} />
        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App
