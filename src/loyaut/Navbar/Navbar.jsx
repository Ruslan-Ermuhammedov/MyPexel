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
import Reminder from '../../assets/images/Reminder.png'
import { StateContext } from '../../App';
import axios from 'axios';
import { baseUrl } from '../../constants/baseUrl';
import BasketCadrUi from './BasketCadrUi';
import BasketCard from './BasketCard';
import Modal from './Modal';
import ModalDanate from './ModalDanate';
import MainIcon from "../../assets/icons/mainIcon.svg"
import { BiFoodMenu } from "react-icons/bi";
import Contact from '../../assets/icons/contact-mail.svg'
import Terms from '../../assets/icons/terms.svg'
import About from '../../assets/icons/about.svg'
import Privacy from '../../assets/icons/privacy.svg'
import Faq from '../../assets/icons/faq.svg'
import { useBasketImagesQuery } from '../../services/basketApi';
import XXX from '../../assets/icons/xxx.svg'
import BasketErrorModal from '../../pages/DeteilImage/BasketErrorModal';
import LogoutImage from '../../assets/images/LogoutImage.png'
const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { role, token, setGender, setBasketId, DeleteBtn, basketErrModal, setBasketErrModal, changeDefault, setChangeDefault, gender, url2, url, Name, update, quary, setQuary, basketId, apiLenght, setApiLenght, inputt, setInputt } = useContext(StateContext)
  const [logoutShow, setLogoutShow] = useState(false)
  const [Hato, setHato] = useState()
  const [danateModal, setDanateModal] = useState(false)
  const [isHomePageRaised, setIsHomePageRaised] = useState(false);
  const currentPageUrl = window.location.href;
  const navigate = useNavigate()
  // const [basketApi, setBasketApi] = useState([])
  const { data: basketApi, isSuccess: isSuccessBasketApi, isLoading: isLoadingBasketApi } = useBasketImagesQuery(basketId)
  // console.log(isSuccessBasketApi && basketApi.images)
  // function lenght() {
  //   setApiLenght(isSuccessBasketApi && basketApi.images.length)
  // }
  // if(isSuccessBasketApi)lenght()
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   function basketData() {
  //     axios.get(`${baseUrl}cart/${basketId}/`)
  //       .then((res) => setBasketApi(res.data?.images))
  //       .catch((err) => setHato(err))
  //   }
  //   basketData()
  // }, [basketId, update]);

  // console.log(currentPageUrl)

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
    setInputt(true)
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setInputt(false)
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
          localStorage.removeItem("bas7ketId");
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
  const logoutModal = () => {
    setLogoutShow(false)
  }

  // window.location.reload();
  const DanateHeandlear = () => {
    setDanateModal(true)
    setInputt(true)


  }
  const [fModal, setFModal] = useState(false)
  const FoterModal = () => {
    setFModal(p => !p)
  }


  const FoterHaendlear = (link) => {
    navigate(`/${link}`)
    setFModal(p => !p)

  }

  return (
    <>
      <div
       className={` flex sticky top-0  left-0 right-0 z-[55] ${url !== currentPageUrl ? "" : "hidden"} ${url2 === 'https://mypexel.com/AdminDonatePage' ? 'hidden' : ''}`}>
        <BasketErrorModal />

      </div>
      <nav id='navbar' className={` w-full  h-[80px] ${url !== currentPageUrl ? "" : "hidden"} ${url2 === 'https://mypexel.com/AdminDonatePage' ? 'hidden' : ''}   flex flex-row items-center justify-between z-50  px-24 py-10 sticky top-0  left-0 right-0 ${scrollPosition > 200 ? 'bg-[#F0F0F8] ' : 'bg-gray-50'} shadow-sm  shadow-gray-200`}>
        <div className=' flex flex-row gap-9  items-center justify-center '>
          <NavLink to={"/"} onClick={handleHomePageClick} className={`${isHomePageRaised ? 'raised' : ''}`}>
            <img className='text-xl w-[80px] ' src={Mypexel} alt="" />
          </NavLink>
          <button style={{ background: 'linear-gradient(237.21deg, #00FFB3 0.76%, #6DC7F9 89.43%)' }} className=' cursor-pointer text-white px-5 py-1 rounded-md'><NavLink to={"/nurAi"}>NUR AI</NavLink></button>
        </div>
        {/* <div className={` bg-[#00000042] absolute w-[100%] h-screen top-0 left-0 z-40 backdrop-blur-[0.5px]  transition-all duration-500 ${basketErrModal ? '' : 'hidden'}  `} onClick={BasketModal}>

      </div>
      <div className={` absolute bg-white rounded-xl w-[340px] h-[365px] ${basketErrModal ? ' top-[152px]' : '-top-96'} z-50 shadow-md shadow-[#646464cc]  left-[40%] transition-all duration-700   `}>
        <div>
          <div className='w-full  h-44 bg-[#dfdfdf] rounded-t-xl   '>
            <img className=' object-contain w-[290px]  m-auto' src={Reminder} alt="" />
            <img onClick={BasketModal} className=' absolute top-3 left-[315px] w-3 h-3'  src={XXX} alt="" />
          </div>
          <div className=' flex flex-col gap-2 items-center  pt-4'>
            <h1 className='  font-semibold text-[26px] text-zinc-600 '>Hello, there </h1>
            <h1 className=' text-[18px] w-80 font-medium text-zinc-500  text-center '>Please sign in or sign up in order to use cart</h1>
            <button className=' rounded bg-[#6999ff] px-5 py-2  text-[18px] text-white '><NavLink to={"/login"}> Log In</NavLink></button>
          </div>
        </div>
      </div> */}
        <Modal isOpen={isModalOpen} onClose={closeModal} basketId={basketId} />
        {/* <Modal isOpen={isModalOpen} onClose={closeModal} basketApi={basketApi} /> */}
        <ModalDanate danateModal={danateModal} setDanateModal={setDanateModal} />
        <div className='flex  flex-row gap-14 items-center '>

          <div className=' flex flex-row gap-3   '>
            <button className={`bg-[#6999ff] text-white rounded-md px-7   text-[17px] font-normal h-10 outline-none focus:ring-4 shadow-lg transform active:scale-90 transition-transform ${scrollPosition > 250 ? '' : ''}  ${token ? "hidden" : ""} ${url !== currentPageUrl ? "" : "hidden"}  ${inputt ? " " : ""}  `} onClick={NavigateLogin}> Sign in</button>
            <button onClick={DanateHeandlear} className={`bg-[#2acf82]   text-white rounded-md px-7 ${scrollPosition > 250 ? '' : ''}   text-[17px] font-normal h-10 outline-none focus:ring-4 shadow-md transform active:scale-90 transition-transform before:ease    w-40 overflow-hidden border border-green-500 ${inputt ? "hidden " : ""}  before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40        `} > Donate Png</button>
            <button className={`bg-[#6999ff] text-white rounded-md px-7 text-[17px] font-normal h-10 outline-none focus:ring-4 shadow-lg transform active:scale-90 transition-transform ${scrollPosition > 250 ? 'hidden' : ''}  ${role === "Admin" ? "" : "hidden"}  ${inputt ? "hidden " : ""}`}><NavLink to={url2 !== currentPageUrl ? "/AdminPage" : "/AdminDonatePage"} > {url2 !== currentPageUrl ? 'AdminPage' : 'DonatePage'}  </NavLink></button>
            {/* <button className={`bg-[#6999ff] text-white rounded-md px-7 text-[17px] font-normal h-10 outline-none focus:ring-4 shadow-lg transform active:scale-90 transition-transform `} onClick={BasketModal}>Modal</button> */}
          </div>
          <div className={`flex flex-row  gap-6 items-center `}>
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
            <div className={`  w-64  p-6   ${logoutShow === true ? "" : "hidden"} rounded-xl bg-white absolute top-24 left-[82%]  flex flex-col items-center  gap-4 shadow-md shadow-gray-500`}>
              <img className='w-20' src={LogoutImage} alt="" />
              <div className=' flex flex-col gap-2 items-center'>
                {/* <h1 className=' text-xl font-medium text-[#6D71F9] '>{Name}</h1> */}
                <h1 className=' text-center'>Oh no! You're leaving are you sure</h1>
                <button onClick={logoutModal} className=' w-full rounded-full bg-[#6999ff] text-white px-5 py-2  outline-none focus:ring-4 shadow-lg transform active:scale-90 transition-transform'> Just Kidding</button>
                <button
                  onClick={LogOutDelete}
                  className="inline-block w-full px-6 py-2   leading-6 text-center text-red-500  transition bg-transparent border-2 border-red-500 rounded-full ripple active:scale-90 hover:bg-red-200 focus:outline-none"
                >
                  Log Out
                </button>
              </div>

            </div>
            <img
              onClick={token ? LogoutHeandlear : null}
              className='w-12 h-12 cursor-pointer rounded-full border hover:bg-gray-200 transition shadow-md hover:shadow-[#c9c9c9] border-[#6D71F9]'
              src={avatarSrc}
              alt=""
            />
            <img onClick={FoterModal} className={`  hover:bg-zinc-100  transition duration-200 px-[17px] rounded-full p-2 -mr-[87px] ${fModal ? 'bg-zinc-100' : ''} cursor-pointer   `} src={MainIcon} alt="" />
            <div className={`bg-[#00000013] absolute w-full h-screen top-0 left-0 z-40 transition-opacity duration-500 ${fModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={FoterModal}></div>

            <div className=''>

              <div className={`bg-white ${fModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'} w-60 h-[285px] rounded-xl absolute top-20 right-2 p-2 pt-4 shadow-lg shadow-[#3a3a3a2e] transition-all duration-500 transform flex flex-col items-start gap-2 z-50`}>
                <button onClick={() => FoterHaendlear("aboutUs")} className={"cursor-pointer hover:bg-zinc-100 w-full transition duration-200 py-2 px-2 gap-4 text-lg font-mono rounded-lg outline-none focus:ring-2 transform active:scale-90 flex flex-row items-center"}>
                  <img src={About} className=' w-6 h-6' alt="" />
                  About Us
                </button>
                <button onClick={() => FoterHaendlear("privacyPolicy")} className={"cursor-pointer hover:bg-zinc-100 w-full transition duration-200 py-2 px-2 gap-4 text-lg font-mono rounded-lg outline-none focus:ring-2 transform active:scale-90 flex flex-row items-center"}>
                  <img className=' w-6 h-6' src={Privacy} alt="" />
                  PrivacyPolicy
                </button>

                <button onClick={() => FoterHaendlear("termsService")} className={"cursor-pointer hover:bg-zinc-100 w-full transition duration-200 py-2 px-2 gap-4 text-lg font-mono rounded-lg outline-none focus:ring-2 transform active:scale-90 flex flex-row items-center"}>
                  <img src={Terms} className=' w-6 h-6' alt="" />
                  Terms & Service
                </button>
                <button onClick={() => FoterHaendlear("contactUs")} className={"cursor-pointer hover:bg-zinc-100 w-full transition duration-200 py-2 px-2 gap-4 text-lg font-mono rounded-lg outline-none focus:ring-2 transform active:scale-90 flex flex-row items-center"}>
                  <img src={Contact} className=' w-6 h-6' alt="" />
                  Contact Us
                </button>
                <button onClick={() => FoterHaendlear("faq")} className='  flex flex-row items-center cursor-pointer hover:bg-zinc-100 w-full transition duration-200 py-2 px-2 gap-4 text-lg font-mono rounded-lg outline-none focus:ring-2  transform active:scale-90   '>
                  <img src={Faq} className='w-6 h-6' alt="" />
                  FAQ
                </button >
              </div>
            </div>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
