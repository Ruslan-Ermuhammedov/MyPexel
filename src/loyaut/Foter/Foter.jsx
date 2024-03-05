import React from 'react'
import mypexelWhite from '../../assets/images/mypexelWhite.png'
import instagram from '../../assets/images/instagram.png'
import youtube from '../../assets/images/youtobe.png'
import telegram from '../../assets/images/telegram.png'
import massage from '../../assets/images/massage.png'
import linkidin from '../../assets/images/linkedin.png'
function Foter() {
  return (
    <div className=' flex flex-row items-center justify-between  px-32 py-7 bg-[#6D71F9]  relative xl:-bottom-[110px] left-0'>
      <div className=' flex flex-row items-center gap-7'>
        <img src={mypexelWhite} className=' mr-9' alt="" />
        <img src={linkidin} alt="" />
        <img src={massage} alt="" />
        <img src={youtube} alt="" />
        <img src={instagram} alt="" />
        <img src={telegram} alt="" />
      </div>
      <div><h1 className=' text-white'>© 2023-2024 Mypexel -All Rights Reserved.</h1></div>
    </div>
  )
}

export default Foter
