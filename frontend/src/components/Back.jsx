import { Link } from "react-router-dom"

const Back = ({url}) => {
  return (
    <Link to={url} className="absolute left-6 top-5 border-none text-[#8a00c4] bg-white p-2 rounded-xl w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-[#ececec]">
        <i className="bi bi-arrow-left font-bold text-[30px]"></i>
    </Link>
  )
}

export default Back