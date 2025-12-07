import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-full min-h-screen max-h-full flex justify-center items-center bg-[#8a00c4]">
      <FadeLoader color="#41c398" />
    </div>
  )
}

export default Loader