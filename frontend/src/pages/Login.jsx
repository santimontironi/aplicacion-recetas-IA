import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import Loader from "../components/Loader"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const { loginUser, loginUserLoading } = useContext(UserContext)

  const [errorRegister, setErrorRegister] = useState(null)

  const navigate = useNavigate()

  const { register, formState: { errors }, handleSubmit } = useForm()

  async function submitForm(data) {
    try {
      await loginUser(data)
      setErrorRegister(null)
      navigate('/')
    }
    catch (error) {
      if (error?.response?.data?.message) {
        setErrorRegister(error.response.data.message)
      }
    }
  }

  return (
    <section className="w-full h-screen">
      {loginUserLoading ? <Loader /> : (
        <div>
          <form method="post" onSubmit={handleSubmit(submitForm)}>

          </form>
        </div>
      )}

    </section>
  )
}

export default Login