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
    <section className="w-full h-screen containerLogin flex justify-center items-center">
      {loginUserLoading ? <Loader /> : (
        <form className="xl:w-[650px] md:w-[500px] md:h-[350px] shadow-[10px_10px_20px_5px_rgba(0,0,0,0.6)] flex flex-col justify-center items-center gap-3 2xl:gap-7 p-5 rounded-lg bg-linear-90 from-[#43035f] to-[#8a00c4] w-[320px] h-[350px] xl:h-[430px]" method="post" onSubmit={handleSubmit(submitForm)}>

          <div className="mb-3 flex flex-col gap-2 relative">
            <input className="
                  p-3 
                  pl-10
                  text-white
                  bg-transparent
                  w-[250px]
                  md:w-[300px]
                  border-b
                  border-white
                  focus:outline-none
                  focus:border-b-3
                  focus:border-[#8EECB8]
                  xl:w-[320px]"
              name="identifier"
              id="identifier"
              type="text"
              {...register('identifier', { required: 'El nombre de usuario o email son requeridos' })}
              placeholder="Usuario o email" />

            <i className="bi bi-person absolute left-3 text-[white] top-3"></i>

            {errors.identifier && <span className="text-red-500">{errors.identifier.message}</span>}
          </div>

          <div className="mb-3 flex flex-col gap-2 relative">
            <input className="
                    p-3
                    pl-10
                    text-white
                    bg-transparent
                    w-[250px]
                    md:w-[300px]
                    border-b
                    border-white
                    focus:outline-none
                    focus:border-b-3
                    focus:border-[#8EECB8]
                    xl:w-[320px]" type="password" id="password" name="password" {...register('password', { required: 'La contraseña es requerida' })} placeholder="Contraseña" />
            <i className="bi bi-key absolute left-3 text-[white] top-3"></i>
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>

          <button className="p-4 bg-[#8EECB8] hover:bg-[#51dd90] cursor-pointer w-[150px] md:w-[170px] xl:w-[200px] rounded-lg font-bold" type="submit">Ingresar</button>

          {errorLogin && <p className="text-red-500">{errorLogin}</p>}
        </form>

      )}



    </section>
  )
}

export default Login