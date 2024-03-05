import React, { useContext } from 'react'
import { StateContext } from '../../App'
import Reminder from '../../assets/images/Reminder.png'
import XXX from '../../assets/icons/xxx.svg'
import { NavLink } from 'react-router-dom'
function BasketErrorModal() {
  const {basketErrModal, setBasketErrModal}=useContext(StateContext)
  const BasketModal = () => {
    setBasketErrModal(p => !p)
  }
  return (
    <div>
         <div className={` bg-[#00000042] absolute w-[100%] h-screen top-0 left-0 z-[55] backdrop-blur-[0.5px]  transition-all duration-500 ${basketErrModal ? '' : 'hidden'}  `} onClick={BasketModal}>

      </div>
      <div className={` absolute bg-white rounded-xl w-[340px] h-[365px] ${basketErrModal ? ' top-[152px] z-[60]' : '-top-[500px] z-[60]'} shadow-md shadow-[#646464cc]  left-[40%] transition-all duration-700   `}>
        <div>
          <div className='w-full  h-44 bg-[#dfdfdf] rounded-t-xl   '>
            <img className=' object-contain w-[290px]  m-auto' src={Reminder} alt="" />
            <img onClick={BasketModal} className=' active:scale-90   absolute top-3 left-[315px] w-3 h-3' src={XXX} alt="" />
          </div>
          <div className=' flex flex-col gap-2 items-center  pt-4'>
            <h1 className='  font-semibold text-[26px] text-zinc-600 '>Hello, there </h1>
            <h1 className=' text-[18px] w-80 font-medium text-zinc-500  text-center '>Please sign in or sign up in order to use cart</h1>
            <button className=' rounded bg-[#6999ff] px-5 py-2  active:scale-90 text-[18px] text-white '><NavLink to={"/login"}> Log In</NavLink></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasketErrorModal
