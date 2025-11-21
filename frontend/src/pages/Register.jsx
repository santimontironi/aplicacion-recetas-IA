import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import { registerAxios } from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { registerUserLoading, registerUser } = useContext(UserContext)

  const [errorRegister, setErrorRegister] = useState(null)

  const navigate = useNavigate()

  const formSubmit = async (data) => {
    try {
      await registerAxios(data)
      navigate('/login')
    }
    catch (error) {
      if (error?.response?.data?.message) {
        setErrorRegister(error.response.data.message)
      }
    }
  }

  return (
    <section className="w-full h-screen">
      {registerUserLoading ? <Loader /> : (
        <div>
          <div>
            <h2>Registro</h2>
            <form method="post" onSubmit={handleSubmit(formSubmit)}>
              <div className="mb-3">
                <input name="username" id="username" type="text" {...register('username')} placeholder="Nombre de usuario" />
                <i className="bi bi-person"></i>
                {errors.username && <span>{errors.username.message}</span>}
              </div>
              <div className="mb-3">
                <input type="email" name="email" id="email" {...register('email')} placeholder="Correo electrónico" />
                <i className="bi bi-envelope-fill"></i>
                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <div className="mb-3">
                <input type="password" id="password" name="password" {...register('password')} placeholder="Contraseña" />
                <i className="bi bi-key"></i>
                {errors.password && <span>{errors.password.message}</span>}
              </div>
              <button type="submit">Crear cuenta</button>
            </form>
          </div>
          <div>

          </div>
        </div>
      )}

      {errorRegister && <p>{errorRegister}</p>}
    </section>
  )
}

export default Register