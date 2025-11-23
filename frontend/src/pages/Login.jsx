import { useContext, useState, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import Loader from "../components/Loader"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const { loginUser, loginUserLoading, user } = useContext(UserContext)

  const [errorLogin, setErrorLogin] = useState(null)

  const navigate = useNavigate()

  const { register, formState: { errors }, handleSubmit } = useForm()

  async function submitForm(data) {
    try {
      await loginUser(data)
      setErrorLogin(null)
    }
    catch (error) {
      if (error?.response?.data?.message) {
        setErrorLogin(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/inicio')
    }
  }, [user])

  return (
    <section className="w-full h-screen">
      {loginUserLoading ? <Loader /> : (
        <div>
          <form method="post" onSubmit={handleSubmit(submitForm)}>

            <div className="mb-3 flex flex-col gap-2 relative">
              <input className="
                  p-3 
                  rounded-lg
                  pl-10
                 bg-white
                  w-[250px]
                  md:w-[300px]
                  xl:w-[320px]"
                name="identifier"
                id="identifier"
                type="text"
                {...register('identifier', { required: 'El nombre de usuario o email son requeridos' })}
                placeholder="Nombre de usuario" />

              <i className="bi bi-person absolute left-3 text-[#606060] top-3"></i>

              {errors.identifier && <span className="text-red-500">{errors.identifier.message}</span>}
            </div>

            <div className="mb-3 flex flex-col gap-2 relative">
              <input className="
                rounded-lg
                    p-3
                    pl-10
                   bg-white
                    w-[250px]
                    md:w-[300px]
                    xl:w-[320px]" type="password" id="password" name="password" {...register('password', { required: 'La contraseña es requerida' })} placeholder="Contraseña" />
              <i className="bi bi-key absolute left-3 text-[#606060] top-3"></i>
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>

            <button className="p-4 bg-[#8EECB8] hover:bg-[#51dd90] cursor-pointer w-[150px] md:w-[170px] xl:w-[200px] rounded-lg font-bold" type="submit">Ingresar</button>
          </form>

          {errorLogin && <p className="text-red-500">{errorLogin}</p>}
        </div>
      )}

      

    </section>
  )
}

export default Login