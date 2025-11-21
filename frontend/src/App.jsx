import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DashboardUser from "./pages/DashboardUser";
import SecurityRoutes from "./components/SecurityRoutes";

function App() {

  return (
    <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route element={<UserProvider />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <SecurityRoutes>
              <Route path="/dashboard" element={<DashboardUser/>}/>
            </SecurityRoutes>
          </Route>

        </Routes>
      
    </BrowserRouter>
  )
}

export default App
