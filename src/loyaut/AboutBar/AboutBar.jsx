import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Contact from '../../assets/icons/contact-mail.svg'
import Terms from '../../assets/icons/terms.svg'
import About from '../../assets/icons/about.svg'
import Privacy from '../../assets/icons/privacy.svg'
import Faq from '../../assets/icons/faq.svg'
function AboutBar() {
  const currentPageUrl = window.location.href;
  return (
    <div>
      <div className={` bg-white  w-[1405px] h-20 rounded-xl   m-auto  px-4 pt-10   flex flex-row items-center justify-center gap-0 `}>
        <NavLink

          to="/aboutUs"
          // activeClassName="border-b-4 border-blue-500"
          className={`cursor-pointer border-b-4 ${currentPageUrl==='https://mypexel.com/aboutUs' ?"border-blue-500" :""} hover:border-blue-500 w-full transition duration-200 py-2 px-2 gap-4 text-lg font-mono outline-none focus:border-blue-500  transform active:scale-90 flex flex-row items-center justify-center`} >
          <img src={About} className="w-6 h-6" alt="" />
          About Us
        </NavLink>

        <NavLink
          to={'/privacyPolicy'}
          // activeClassName="border-b-4 border-blue-500"
          className={`cursor-pointer border-b-4 ${currentPageUrl==='https://mypexel.com/privacyPolicy' ? "border-blue-500" :""} hover:border-blue-500 w-full transition duration-200 py-2 px-2 gap-4 text-lg font-mono  outline-none focus:border-blue-500   transform active:scale-90 flex flex-row items-center justify-center  `}>
          <img className=' w-6 h-6' src={Privacy} alt="" />
          PrivacyPolicy
        </NavLink>
        <NavLink
          // activeClassName="border-b-4 border-blue-500"
          to={'/termsService'}
          className={` cursor-pointer border-b-4 ${currentPageUrl==='https://mypexel.com/termsService' ?"border-blue-500" :""} hover:border-blue-500 w-full transition duration-200 py-2 px-2 gap-4 text-lg font-mono  outline-none focus:border-blue-500   transform active:scale-90 flex flex-row items-center justify-center  `}>
          <img src={Terms} className=' w-6 h-6' alt="" />
          Intellectual Property         </NavLink>
        <NavLink
          to={'/contactUs'}
          // activeClassName="border-b-4 border-blue-500"
          className={` cursor-pointer border-b-4 ${currentPageUrl==='https://mypexel.com/contactUs' ?"border-blue-500" :""} hover:border-blue-500 w-full transition duration-200 py-2 px-2 gap-4 text-lg font-mono  outline-none focus:border-blue-500   transform active:scale-90 flex flex-row items-center justify-center  `}>
          <img src={Contact} className=' w-6 h-6' alt="" />
          Contact Us
        </NavLink>
        <NavLink
          to={'/faq'}
          // activeClassName="border-b-4 border-blue-500"
          className={`  flex flex-row items-center justify-center cursor-pointer border-b-4 ${currentPageUrl==='https://mypexel.com/faq' ?"border-blue-500" :""} hover:border-blue-500 w-full transition duration-200 py-2 px-2 gap-4 text-lg font-mono  outline-none focus:border-blue-500    transform active:scale-90 `}>
          <img src={Faq} className='w-6 h-6' alt="" />
          FAQ
        </NavLink >
      </div>
    </div>
  )
}

export default AboutBar
