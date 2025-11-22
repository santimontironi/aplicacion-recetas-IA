import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import foodImage from '../img/food.jpg'

const Register = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { registerUserLoading, registerUser } = useContext(UserContext)

  const [errorRegister, setErrorRegister] = useState(null)

  const navigate = useNavigate()

  const formSubmit = async (data) => {
    try {
      await registerUser(data)
      setErrorRegister(null)
      navigate('/ingresar')
    }
    catch (error) {
      if (error?.response?.data?.message) {
        console.log(error?.response?.data?.error)
        setTimeout(() => {
          setErrorRegister(error?.response?.data?.error)
        }, 1500)
      }
    }
  }

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center pt-10 pb-10 xl:pt-0 xl:pb-0 bg-[#8a00c4]">
      {registerUserLoading ? <Loader /> : (
        <div className="flex flex-col xl:flex-row justify-between w-[320px] md:w-[600px] xl:w-[1000px] min-h-screen 2xl:w-[1200px] xl:min-h-[700px] shadow-[10px_10px_20px_5px_rgba(0,0,0,0.6)]">
          <div className="2xl:w-[45%] xl:w-[50%] bg-linear-120 to-[#8a00c4] from-[#43035f] flex flex-col p-8 xl:p-0 xl:border-r-4 xl:border-white">
            <h2 className="text-center text-white mb-7 xl:mb-0 xl:text-[40px] md:text-[35px] text-[30px] 2xl:text-[50px] mt-3 md:mt-5 xl:mt-12 2xl:mt-16 text-shadow-[5px_5px_10px_rgba(0,0,0,0.6)]">Registro</h2>
            <form className="flex flex-col justify-center items-center h-[60%] 2xl:h-[70%] gap-3" method="post" onSubmit={handleSubmit(formSubmit)}>

              <div className="mb-3 flex flex-col gap-2 relative">
                <input className="
                  p-3 
                  rounded-lg
                  pl-10
                 bg-white
                  w-[250px]
                  md:w-[300px]
                  xl:w-[320px]"
                  name="username"
                  id="username"
                  type="text"
                  {...register('username', { required: 'El nombre de usuario es requerido' })}
                  placeholder="Nombre de usuario" />
                <i className="bi bi-person absolute left-3 text-[#606060] top-3"></i>

                {errors.username && <span className="text-red-500">{errors.username.message}</span>}
              </div>

              <div className="mb-3 flex flex-col gap-2 relative">
                <input className="
                rounded-lg
                  p-3
                  pl-10
                  bg-white
                  w-[250px]
                  md:w-[300px]
                  xl:w-[320px]
                     " type="email" name="email" id="email" {...register('email', { required: 'El correo electrónico es requerido', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'El correo electrónico no es válido' } })} placeholder="Correo electrónico" />
                <i className="bi bi-envelope-fill absolute left-3 text-[#606060] top-3"></i>
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
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

              <button className="p-4 bg-[#8EECB8] hover:bg-[#51dd90] cursor-pointer w-[150px] md:w-[170px] xl:w-[200px] rounded-lg font-bold" type="submit">Crear cuenta</button>

            </form>
          </div>

          <div className="2xl:w-[55%] xl:w-[50%] bg-[#8EECB8] flex flex-col justify-center items-center p-8">
            <div className="flex flex-col items-center justify-items-start mt-6 mb-3">
              <p className="xl:text-4xl md:text-3xl text-2xl 2xl:text-5xl font-bold mb-4 text-center">
                Crea recetas únicas con tus ingredientes
              </p>

              <p className="text-base text-center px-4">
                Registrate y empezá a generar platos personalizados según lo que tengas en tu cocina. Nuestra aplicación usa inteligencia artificial para sugerirte recetas rápidas, creativas y fáciles de preparar. Solo ingresá los ingredientes disponibles y descubrí nuevas ideas para cocinar sin complicaciones.
              </p>
            </div>
            <img className="w-[250px] md:w-[300px] xl:w-[320px] 2xl:w-[300px] border-none" src={foodImage} alt="foto de comida" />
          </div>

        </div>
      )}

      {errorRegister && <p className="mt-5 bg-red-500 text-white font-bold p-4 w-[300px] rounded-lg text-center">{errorRegister}</p>}
    </section>
  )
}

export default Register