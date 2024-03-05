import { useContext, useState } from "react";
import Mypexel from '../../../assets/logo mypexel (8).png'
import { StateContext } from "../../../App";
import { NavLink } from "react-router-dom";

function SidebarTop() {
  const {}=useContext(StateContext)
  const [isHomePageRaised, setIsHomePageRaised] = useState(false);
  const currentPageUrl = window.location.href;

  const handleHomePageClick = () => {
    setIsHomePageRaised(true);
    currentPageUrl === 'https://mypexel.com/' ?
      window.location.reload()
      : navigate("/")
  };
  
    return (
        <div className=' w-full px-8 py-6 '>
             <NavLink to={"/"} onClick={handleHomePageClick} className={`${isHomePageRaised ? 'raised' : ''}`}>
          <img className='text-xl w-44 pt-2   ' src={Mypexel} alt="" />
        </NavLink>
        </div>
    )
}

export default SidebarTop
