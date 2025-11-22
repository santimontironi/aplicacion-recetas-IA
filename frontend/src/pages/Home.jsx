import imgBot from '../img/botSaludando.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center containerHome">
      <div className='flex flex-col items-center w-[330px] md:w-[600px] xl:w-[1000px] 2xl:w-[1400px] h-[600px] md:h-[600px] 2xl:h-[650px] border-2 border-white rounded-lg shadow-[10px_10px_20px_5px_rgba(0,0,0,0.6)] containerHome-content gap-2'>
        <img className='w-[200px] containerHome-content-imgBot mt-8 xl:mt-10 2xl:mt-14 drop-shadow-[5px_5px_10px_rgba(0,0,0,0.6)]' src={imgBot} alt="Logo del bot de la aplicación" />
        <h1 className="containerHome-title text-white text-[26px] md:text-[35px] xl:text-[45px] 2xl:text-[60px] text-shadow-[5px_5px_10px_rgba(0,0,0,0.6)] mt-6 md:mt-0">Bienvenido a <span className='text-[#15b67d]'>GastroBot</span></h1>
        <p className='text-white text-[15px] md:text-[17px] xl:text-[20px] text-center w-[90%] xl:w-[80%]'>Bienvenido a tu asistente de cocina <span>GastroBot</span>, donde podrás crear recetas de cocina de manera fácil y rápida tan solo con los ingredientes que tienes en casa</p>
        <div className='flex flex-col md:flex-row gap-5 mt-7'>
          <Link className='bg-[#15b67d] text-white py-2 px-4 rounded-lg w-[170px] text-center outline-1 outline-white font-bold hover:bg-[#14825c]' to='/ingresar'>Ingresar</Link>
          <Link className='bg-[#d77165] hover:bg-[#a05149] text-white py-2 px-4 rounded-lg w-[170px] text-center outline-1 outline-white font-bold' to='/registrarse'>Registrarse</Link>
        </div>
      </div>
    </section>
  )
}

export default Home