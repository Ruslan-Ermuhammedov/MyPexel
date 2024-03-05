import React from 'react'
import AboutBar from '../AboutBar/AboutBar'
import FaqImg from '../../assets/images/Faq.png'
import Foter from '../Foter/Foter'
function Faq() {
  return (
    <div>
      <AboutBar />
      <div className=' w-full '>
        <img className=' w-[500px] m-auto mt-8' src={FaqImg} alt="" />
      </div>
      <Foter/>
    </div>
  )
}

export default Faq
