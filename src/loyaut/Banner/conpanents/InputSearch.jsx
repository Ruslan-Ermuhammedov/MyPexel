import React, { useContext, useEffect, useRef, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { StateContext } from '../../../App';

function InputSearch() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { quary, setQuary,changeDefault,setChangeDefault,inputt,basketErrModal, setBasketErrModal } = useContext(StateContext)

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
  
  return (
    <form
    onSubmit={queryHaendlear}
    className={`flex flex-row ${inputt ? "hidden" :""} items-center w-[560px] md:w-[700px] xl:w-[860px] h-[40px] bg-white rounded-lg ${scrollPosition > 250 ? 'fixed top-5 flex-1 mr-60 z-[50] md:mr-[230px] xl:mr-48' : ''} `}
  >
    <input
      defaultValue={changeDefault}
      type="text"
      ref={queryRef}
      onChange={(e) => setChangeDefault(e.target.value)}
      className="w-full outline-none px-3"
    />
    <button type="submit" className="bg-[#6D71F9] h-[40px] rounded-r-lg w-28 text-2xl flex items-center justify-center">
      <CiSearch className="text-white text-2xl" />
    </button>
  </form>
  
  )
}

export default InputSearch
