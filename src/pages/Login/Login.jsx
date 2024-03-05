import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginImg from '../../assets/images/loginImage.jpg'
import { useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from '../../constants/baseUrl'
import { StateContext } from '../../App'
function Login() {
  const {setRole, setName, token, setToken, gender, setGender, setUrl } = useContext(StateContext)
  const [show, setShow] = useState(false)
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [success, setSuccess] = useState("")
  const [err, setErr] = useState("")
  const [SuccErr, setSuccErr] = useState(false)
  const ShowHandlear = () => {
    setShow(false)

  }
  
  const currentPageUrl = window.location.href;
  setUrl(currentPageUrl)
  const loginHaendlear = (e) => {
    e.preventDefault()
    const Login = {
      username: userName,
      password: password

    }
    const headers = token ? { Authorization: `Token ${token}` } : {};
    function loginData() {
      axios.post(`${baseUrl}login/`, Login, {headers })
      .then((res) => {
        setRole(res.data.role);
        setToken(res.data.token);
        setGender(res.data.gender);
        setName(res.data.username);
        setSuccess("");
        res.data.token && res.data.role === "Admin" ? navigate("/POqFOyIASNkdNNUFqI6pgDR0CCqYPAM7ZYZcwUccCMCK74gbVyfmDFCrjuPyMWgxwCEuJWeNYXDPeRhRguI2KDn2wk9lGyNDkeua4Fz4AL8I49jlt6UtD2CvfnGuk5Zu1lHCEmskaK+hpB9SnBm+cINoGT98fmHxBi9ROWeTNH5w1maOrGlHk/J6z960/tgv8A4ak62c+yPhDqHNZRaNDucoYTNBzNkbSOT0j7/tD5Qc6As/UJ/M3wMOzlhh0HM6pjh0HM6pjdBoeQP5Y7WY/5QYaNkjKWnaK++J2vLCRoKb1D3QonJ+YfVjeFsUsZS0H5F+UKpLUZADsEOzlhkrktMbIE8BDuXyKtBylv7JHiY2wtBTE7XljycgrSfU8V+cO7P+z6ccCUU6qtrzAwrrpGqFfO2E3Hf4Q7pzFLsHIKVQM8wkEA9EDXvJ+EWCy8k7JL/BoILbLyJp2GBAgosifLF5QcQ71wOd9idW0w7FDHIEQcKwKb4ECIC3TnApvgQIgKBvjtDHIEB274QUwIEGhSuuDQIEAYjs864KtI7AgDUjpWsCBBk0mrdKmmsqdtCKjGu1T7ULJMpAgRoLK1YGvsgQIg7dgtwjM6oECKDIa/OOtAgQBcYECBAf/AdminPage")
          : res.data.token && res.data.role === "User" ? navigate("/")
          : console.log(res.data);
        window.location.reload();
      })
    
        .catch((err) => {
          setSuccErr(false);
          setShow(true);
          // console.log(err.response.data);
          setErr(err.response.data.Error);
        })
        
    }
    loginData()


  }
  return (
    <div className=' flex flex-row gap-6'>
      <div className={`w-[330px] h-[250px] bg-white shadow-md shadow-gray-400 absolute left-[910px]   ${show ? `top-[250px]` : "-top-[350px]"} rounded-xl ease-in duration-300 `} >
        <div className={`w-16 h-16 ${SuccErr ? "bg-green-500" : "bg-red-500"}   rounded-full flex items-center justify-center m-auto mt-12`}>
          <h1 className={`text-white   text-2xl font-bold `}>{SuccErr ? "√" : "X"}</h1>
        </div>
        <h1 className={`text-2xl ${SuccErr ? "text-green-500" : "text-red-500"}  ml-[120px] mt-2`}>{SuccErr ? "SUCCESS" : "ERROR"}</h1>
        <h1 className={`text-gray-500 ml-[80px]`}>{SuccErr ? success : err} </h1>
        <button onClick={ShowHandlear} className={`w-full text-white  ${SuccErr ? "bg-green-500" : "bg-red-500"}    py-3 mt-[42px] rounded-b-xl`}>Continue</button>
      </div>
      <form onSubmit={loginHaendlear} className=' flex flex-col gap-3  w-[340px] p-5  items-center m-auto mt-20' >
        <h1 className='text-4xl font-bold' >WELCOME BACK</h1>
        <label className='flex flex-col gap-1 w-full text-lg text-gray-600 ' >Username:
          <input required onChange={e => setUserName(e.target.value)} className='px-3 py-1 rounded-3xl border-2 border-gray-300' type="text" name='text' />
        </label>
        <label htmlFor="" className='flex flex-col gap-1 w-full text-lg text-gray-600 '>Password
          <input required onChange={e => setPassword(e.target.value)} className='px-3 py-1 rounded-3xl border-2 border-gray-300' type="password" name="password" id="" />
        </label>
        <button className='w-full bg-sky-400 text-white rounded-3xl py-1 text-xl mt-5 px-4  outline-none focus:ring-4 shadow-lg transform active:scale-50 transition-transform' >Sign in</button>
        <h1 className='text-md text-slate-400'>
          Don't you have account ?        <Link to={"/register"} className='text-blue-500'> Sign up</Link>
        </h1>
      </form>
      <div className='w-[700px] h-[595px]  xl:h-[100%] '>
        <img src={LoginImg} className='  object-cover w-full h-full' alt="" />
      </div>
    </div>
  )
}

export default Login
