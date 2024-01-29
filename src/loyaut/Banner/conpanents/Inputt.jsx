import React, { useContext } from 'react'
import { StateContext } from '../../../App'

function Inputt({queryRef}) {
    const { quary, setQuary,changeDefault,setChangeDefault } = useContext(StateContext)

  return (
    <>
      <input defaultValue={changeDefault}  type="text" ref={queryRef} onChange={e=>setChangeDefault(e.target.value)} className={"w-full outline-none px-3"} />
    </>
  )
}

export default Inputt
