import { useContext } from "react"
import MainIcon from "../../assets/icons/mainIcon.svg"
function Header() {

  // const {setModalName,setShowModal}=useContext(Context)

  // const addNewTaskHandler=()=>{
  //   setShowModal(true)
  //   setModalName("Task")

  // }
  return (
    <header className='   py-7 shadow-sm  shadow-zinc-300 px-6 items-center flex justify-between w-full'>
        <h1 className= "text-gray-500 text-xl font-bold ">Mening ishim Mening orzularim</h1>
        <div className=" flex items-center gap-5">
          <button  className="w-44 bg-[#ff6969] p-3  text-white text-sm rounded-full"> All Remove</button>
          <button  className="w-44 bg-[#6999ff] p-3  text-white text-sm rounded-full"> All Download</button>
          {/* <img className="bg-white" src={MainIcon} alt="" /> */}
        </div>
      
    </header>
  )
}

export default Header
