import { useContext, useState, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import Loader from "../components/Loader"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import foodImage from '../img/food.jpg'

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
    <section className="w-full min-h-screen containerLogin flex justify-center pt-10 pb-10 xl:pt-0 xl:pb-0 items-center containerLogin">
      {loginUserLoading ? <Loader /> : (
        <div className="flex flex-col xl:flex-row justify-between w-[320px] md:w-[600px] xl:w-[1000px] min-h-screen 2xl:w-[1200px] xl:min-h-[700px] shadow-[10px_10px_20px_5px_rgba(0,0,0,0.6)]">
          <div className="2xl:w-[45%] xl:w-[50%] bg-linear-120 to-[#235c49] from-[#41c398] flex flex-col p-8 xl:p-0 xl:border-r-4 xl:border-white">
            <h2 className="text-center text-white mb-7 xl:mb-0 xl:text-[40px] md:text-[35px] text-[30px] 2xl:text-[50px] mt-3 md:mt-5 xl:mt-12 2xl:mt-16 text-shadow-[5px_5px_10px_rgba(0,0,0,0.6)] bg-[#235c49] rounded-lg w-[260px] md:w-[400px] xl:w-[500px] mx-auto">Ingreso</h2>
            <form className="flex flex-col justify-center items-center h-[35%] 2xl:h-[70%] gap-4" method="post" onSubmit={handleSubmit(submitForm)}>

              <div className="mb-3 flex flex-col gap-2 relative">
                <input className="
                          p-3 
                          rounded-lg
                          pl-10
                         bg-white
                          w-[250px]
                          md:w-[300px]
                          xl:w-[320px]
                          focus:outline-3
                          focus:outline-[#8a00c4]"
                  name="identifier"
                  id="identifier"
                  type="text"
                  {...register('identifier', { required: 'Usuario o email requerido' })}
                  placeholder="Usuario o email" />
                <i className="bi bi-person absolute left-3 text-[#606060] top-3"></i>

                {errors.username && <span className="text-white bg-[#8a00c4] text-center p-2">{errors.username.message}</span>}
              </div>

              <div className="mb-3 flex flex-col gap-2 relative">
                <input className="
                        rounded-lg
                            p-3
                            pl-10
                           bg-white
                            w-[250px]
                            md:w-[300px]
                            focus:outline-3
                            focus:outline-[#8a00c4]
                            xl:w-[320px]" type="password" id="password" name="password" {...register('password', { required: 'La contraseña es requerida' })} placeholder="Contraseña" />
                <i className="bi bi-key absolute left-3 text-[#606060] top-3"></i>
                {errors.password && <span className="text-white bg-[#8a00c4] text-center p-2">{errors.password.message}</span>}
              </div>

              <button className="p-4 bg-[#8a00c4] hover:bg-[#43035f] cursor-pointer w-[150px] md:w-[170px] xl:w-[200px] rounded-lg font-bold text-white" type="submit">Ingresar</button>

            </form>

            {errorLogin && <span className="mt-5 bg-red-500 text-white font-bold p-4 w-[300px] rounded-lg text-center">{errorLogin}</span>}
          </div>

          <div className="2xl:w-[55%] xl:w-[50%] bg-[#8EECB8] flex flex-col justify-center items-center p-8">
            <div className="flex flex-col items-center justify-items-start mt-6 mb-3">
              <p className="xl:text-4xl md:text-3xl text-2xl 2xl:text-5xl font-bold mb-4 text-center">
                Iniciá sesión y seguí creando tus mejores recetas
              </p>

              <p className="text-base text-center px-4">
                Ingresá con tu cuenta para acceder a tus ingredientes guardados, tus recetas personalizadas y nuevas sugerencias creadas con inteligencia artificial.
                Volvé a inspirarte en segundos y descubrí qué podés cocinar hoy con lo que tenés en tu casa.
              </p>
            </div>
            <img className="w-[250px] md:w-[300px] xl:w-[320px] 2xl:w-[300px] border-none" src={foodImage} alt="foto de comida" />
          </div>

        </div>

      )}



    </section>
  )
}

export default Login