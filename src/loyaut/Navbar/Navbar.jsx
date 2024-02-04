// Navbar.js
import React, { useContext, useEffect, useRef, useState } from 'react';
// import 'tailwind.css'; // Tailwind CSS fayli
import Mypexel from "../../assets/images/mypexel.png"
import InputSearch from '../Banner/conpanents/InputSearch';
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from 'react-router-dom';
import Boy from '../../assets/images/Boy.png'
import Gril from '../../assets/images/Grill.png'
import Ananimus from '../../assets/images/default-avatar-profile-icon-social-600nw-1677509740.webp'
import { StateContext } from '../../App';
import axios from 'axios';
import { baseUrl } from '../../constants/baseUrl';
import BasketCadrUi from './BasketCadrUi';
import BasketCard from './BasketCard';
import Modal from './Modal';
const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { role, token, setGender, setBasketId, DeleteBtn, changeDefault, setChangeDefault, gender, url, Name, update, quary, setQuary, basketId, apiLenght, setApiLenght } = useContext(StateContext)
  const [logoutShow, setLogoutShow] = useState(false)
  const [Hato, setHato] = useState()
  const [isHomePageRaised, setIsHomePageRaised] = useState(false);
  const currentPageUrl = window.location.href;
  
  // console.log(update)
  const navigate = useNavigate()
  const [basketApi, setBasketApi] = useState([])
  // const [gen,setGen]=useState("")
  function lenght() {
    setApiLenght(basketApi.length)
  }
  lenght()
  // console.log(apiLenght)
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const queryRef = useRef()
  const queryHaendlear = (e) => {
    e.preventDefault()
    setQuary(queryRef.current.value)
  }
  // console.log(basketId)
  useEffect(() => {
    function basketData() {
      axios.get(`${baseUrl}cart/${basketId}/`)
        .then((res) => setBasketApi(res.data?.images))
        .catch((err) => setHato(err))
    }
    basketData()
  }, [basketId, update]);
  console.log(currentPageUrl)
  const handleHomePageClick = () => {
    setIsHomePageRaised(true);
    currentPageUrl === 'https://mypexel.com/' ?  
        window.location.reload()
        : navigate("/")
  };

  // useEffect(() => {
  // }, [gender,Name]);
  // console.log(basketApi)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // console.log(logoutShow)
  const LogoutHeandlear = () => {
    setLogoutShow(true)
  }
  const LogoutFalse = () => {
    setLogoutShow(false)
  }
  const NavigateLogin = () => {
    navigate("/login")
    window.location.reload();
  }
  const [avatarSrc, setAvatarSrc] = useState('');

  useEffect(() => {
    // Update avatar source when gender changes
    setAvatarSrc(gender === 'true' ? Boy : gender === 'false' ? Gril : Ananimus);
  }, [gender]);

  // console.log(token)
  const LogOutDelete = () => {
    function LogoutPostData() {
      axios.delete(`${baseUrl}logout/`, {
        headers: {
          Authorization: `Token ${token}`, // Include the authentication token in the headers
        }
      })
        .then((res) => {
          console.log(res.data);
          window.location.reload();
          setLogoutShow(false)
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("gender");
          localStorage.removeItem("basketId");
          localStorage.removeItem("Name");
          setToken("");
          setRole("");
          setGender("");
          setBasketId("");
          setName("");

        })
        .catch((err) => setHato(err));
    }
    LogoutPostData();
  }
  // window.location.reload();

  return (
    <nav className={`w-full h-[100px]  flex flex-row items-center justify-between  px-24 py-12 sticky top-0 z-40 left-0 right-0 ${scrollPosition > 200 ? 'bg-[#F0F0F8] ' : 'bg-gray-50'} shadow-sm shadow-gray-200`}>
      <div className=''>
        <NavLink to={"/"} onClick={handleHomePageClick } className={`${isHomePageRaised ? 'raised' : ''}`}>
          <img className='text-xl w-[90px] ' src={Mypexel} alt="" />
        </NavLink>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} basketApi={basketApi} />


      {/* <div className='flex  flex-row gap-14 items-center '> */}

      <div className=' flex flex-row gap-3   '>
        <button className={`bg-[#6999ff] text-white rounded-md px-7  ml-[1000px] text-[17px] font-normal h-10 outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform ${scrollPosition > 250 ? 'hidden' : ''}  ${token ? "hidden" : ""} ${url !== currentPageUrl ? "" : "hidden"}    `} onClick={NavigateLogin}> Sign in</button>
        <button className={`bg-[#6999ff] text-white rounded-md px-7  ml-[880px] text-[17px] font-normal h-10 outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform ${scrollPosition > 250 ? 'hidden' : ''}  ${role === "Admin" ? "" : "hidden"} ${url !== currentPageUrl ? "" : "hidden"} `}><NavLink to={"/POqFOyIASNkdNNUFqI6pgDR0CCqYPAM7ZYZcwUccCMCK74gbVyfmDFCrjuPyMWgxwCEuJWeNYXDPeRhRguI2KDn2wk9lGyNDkeua4Fz4AL8I49jlt6UtD2CvfnGuk5Zu1lHCEmskaK+hpB9SnBm+cINoGT98fmHxBi9ROWeTNH5w1maOrGlHk/J6z960/tgv8A4ak62c+yPhDqHNZRaNDucoYTNBzNkbSOT0j7/tD5Qc6As/UJ/M3wMOzlhh0HM6pjh0HM6pjdBoeQP5Y7WY/5QYaNkjKWnaK++J2vLCRoKb1D3QonJ+YfVjeFsUsZS0H5F+UKpLUZADsEOzlhkrktMbIE8BDuXyKtBylv7JHiY2wtBTE7XljycgrSfU8V+cO7P+z6ccCUU6qtrzAwrrpGqFfO2E3Hf4Q7pzFLsHIKVQM8wkEA9EDXvJ+EWCy8k7JL/BoILbLyJp2GBAgosifLF5QcQ71wOd9idW0w7FDHIEQcKwKb4ECIC3TnApvgQIgKBvjtDHIEB274QUwIEGhSuuDQIEAYjs864KtI7AgDUjpWsCBBk0mrdKmmsqdtCKjGu1T7ULJMpAgRoLK1YGvsgQIg7dgtwjM6oECKDIa/OOtAgQBcYECBAf/AdminPage"}> Admin Page</NavLink></button>
      </div>
      <div className={`flex flex-row  gap-9 items-center `}>
        <NavLink onClick={openModal} className={`  flex flex-row gap-1 items-center ${token ? "" : "hidden"}`} >
          {
            apiLenght >= 1
              ?

              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.00488 9H19.9433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V9ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z" fill="#6D71F9"></path>
              </svg>
              : <svg className='w-5 h-5 ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M2.31669 16V2.28571H0V0H3.47503C4.11478 0 4.63338 0.51168 4.63338 1.14286V14.8571H19.0414L21.358 5.71429H6.95007V3.42857H22.8417C23.4814 3.42857 24 3.94025 24 4.57143C24 4.66487 23.9884 4.75797 23.9654 4.84862L21.0695 16.2771C20.9407 16.7859 20.4774 17.1429 19.9458 17.1429H3.47503C2.8353 17.1429 2.31669 16.6312 2.31669 16ZM4.63338 24C3.35391 24 2.31669 22.9767 2.31669 21.7143C2.31669 20.4519 3.35391 19.4286 4.63338 19.4286C5.91285 19.4286 6.95007 20.4519 6.95007 21.7143C6.95007 22.9767 5.91285 24 4.63338 24ZM18.5335 24C17.254 24 16.2169 22.9767 16.2169 21.7143C16.2169 20.4519 17.254 19.4286 18.5335 19.4286C19.813 19.4286 20.8502 20.4519 20.8502 21.7143C20.8502 22.9767 19.813 24 18.5335 24Z" fill="#6D71F9" />
              </svg>
          }
          <small className=' font-bold bg-red-500 rounded-full p-1 h-4  w-4 flex items-center justify-center text-white  mb-3   '>{apiLenght}</small>
        </NavLink>
        <NavLink onClick={DeleteBtn} className={`${token ? "" : "hidden"}`} >
          <svg className='w-5 h-5 ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21.6 17.1429H24V19.4286H0V17.1429H2.4V9.14286C2.4 4.09339 6.69806 0 12 0C17.302 0 21.6 4.09339 21.6 9.14286V17.1429ZM19.2 17.1429V9.14286C19.2 5.35576 15.9764 2.28571 12 2.28571C8.02355 2.28571 4.8 5.35576 4.8 9.14286V17.1429H19.2ZM8.4 21.7143H15.6V24H8.4V21.7143Z" fill="#6D71F9" />
          </svg>
        </NavLink>
        {/* https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg */}
        <div onClick={LogoutFalse} className={`   w-[100%] h-[1200px] absolute  left-0 top-0  ${logoutShow === true ? "" : "hidden"} `}>
        </div>
        <div className={`  w-56 h-28  ${logoutShow === true ? "" : "hidden"} rounded-xl bg-white absolute top-24 left-[85%]  flex flex-col items-center justify-center gap-2 shadow-md shadow-red-300`}>
          <h1 className=' text-xl font-medium text-[#6D71F9] '>{Name}</h1>
          <button onClick={LogOutDelete} className=' w-[80%] rounded-full bg-red-500 text-white px-5 py-2  outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform'>Log Out</button>
        </div>
        <img
          onClick={token ? LogoutHeandlear : null}
          className='w-12 h-12 cursor-pointer rounded-full border hover:bg-gray-200 transition shadow-md hover:shadow-[#c9c9c9] border-[#6D71F9]'
          src={avatarSrc}
          alt=""
        />
      </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
