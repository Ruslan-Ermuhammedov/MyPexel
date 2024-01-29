import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RegisterImage from '../../assets/images/RegisterImage.jpg'
import axios from 'axios';
import { baseUrl } from '../../constants/baseUrl';
import { StateContext } from '../../App';
function Register() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  // const { show, setShow } = useContext(StateContext)
  const [show, setShow] = useState(false)

  const [genderR, setGenderR] = useState("")
  const [success, setSuccess] = useState("")
  const [err, setErr] = useState("")
  // console.log(err)
  const [SuccErr, setSuccErr] = useState(false)
  const navigate = useNavigate()
  // console.log(SuccErr)
  // console.log(genderR)
  const registerHandlear = (e) => {
    e.preventDefault()
    // const formData = new FormData();
    // formData.append('username', userName);
    // formData.append('password', password);
    // formData.append('genderR', genderR);
    const regisApi = {
      username: userName,
      password: password,
      gender: genderR
    }
    function postData() {
      axios.post(`${baseUrl}regis/`, regisApi)
        .then((res) => {
          // console.log(res.data)
          setShow(true)
          setSuccErr(true)
          setSuccess("Account successfully created")
          //  navigate("/login")
        })
        .catch((err) => {
          setSuccErr(false)
          setShow(true)
          setErr(err.response.data.Error === undefined ? "Choose Gender" :err.response.data.Error)

        })
    }
    postData()
  }
  const ShowHandlear = () => {
    setShow(false)
    if(SuccErr===true){

      navigate("/login")
      return
    }
  }
  return (
    <div className=' flex flex-row gap-6'>
      <div className={`w-[330px] h-[250px] bg-white shadow-md shadow-gray-400 absolute left-[610px]   ${show ? `top-[250px]` : "-top-[350px]"} rounded-xl ease-in duration-300 `} >
        <div className={`w-16 h-16 ${SuccErr ? "bg-green-500" : "bg-red-500"}   rounded-full flex items-center justify-center m-auto mt-12`}>
          <h1 className={`text-white   text-2xl font-bold `}>{SuccErr ? "√" : "X"}</h1>
        </div>
        <h1 className={`text-2xl  ${SuccErr ? "text-green-500" : "text-red-500"}  ml-[120px] mt-2`}>{SuccErr ? "SUCCESS" : "ERROR"}</h1>
        <h1 className={`text-gray-500 ml-[80px]`}>{SuccErr ? success : err} </h1>
        <button onClick={ShowHandlear} className={`w-full text-white  ${SuccErr ? "bg-green-500" : "bg-red-500"}    py-3 mt-[42px] rounded-b-xl`}>Continue</button>
      </div>
      <form onSubmit={registerHandlear} className=' flex flex-col gap-3  w-[340px] p-5  items-center m-auto mt-20' >
        <h1 className='text-4xl font-bold' >WELCOME !</h1>
        <label className='flex flex-col gap-1 w-full text-lg text-gray-600 ' >Username:
          <input className='px-3 py-1 rounded-3xl border-2 border-gray-300' type="text" name='text' required onChange={e => setUserName(e.target.value)} placeholder='username' />
        </label>

        <label htmlFor="" className='flex flex-col gap-1 w-full text-lg text-gray-600 '>Password
          <input className='px-3 py-1 rounded-3xl border-2 border-gray-300' type="password" name="password" required id="" onChange={e => setPassword(e.target.value)} placeholder='password' />
        </label>
        <div className=' flex flex-row gap-2 items-center -ml-40'>


          <label className='flex flex-row items-center gap-1 text-blue-500 text-md font-semibold'>
            <input
              required
              type="radio"
              onChange={e => setGenderR(e.target.value)}
              value={'True'}
              checked={genderR === 'True'}
            />
            Male
          </label>

          <label className='flex flex-row items-center gap-1 text-blue-500 text-md font-semibold'>
            <input
              required
              type="radio"
              value={'False'}
              checked={genderR === 'False'}
              onChange={e => setGenderR(e.target.value)}
            />
            Female
          </label>
        </div>
        <button className='w-full bg-[#9c2cff] text-white rounded-3xl py-1 text-xl mt-2  outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform' >Sign up</button>
        <h1 className='text-md text-slate-400'>
          Already have an account ?
          <Link to={"/login"} className='text-md text-blue-500 '> Sign In</Link>
        </h1>
      </form>
      <div className='w-[700px] h-[595px]  xl:h-[100%]'>
        <img src={RegisterImage} className='  object-cover w-full h-full ' alt="" />
      </div>
    </div>
  )
}

export default Register
