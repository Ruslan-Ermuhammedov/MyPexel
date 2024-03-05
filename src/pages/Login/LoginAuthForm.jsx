import React, { useContext, useState, useEffect } from 'react';
import './Login.css'; // Import your CSS file
import Mypexel from "../../assets/images/mypexel.png"
import { NavLink, useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { baseUrl } from '../../constants/baseUrl'
import { StateContext } from '../../App'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import SuccesErrorModal from './SuccesErrorModal';


const LoginAuthForm = () => {
    // Funtionlik stylelar cuhun 
    const [isSignUpActive, setSignUpActive] = useState(false);
    const [isHomePageRaised, setIsHomePageRaised] = useState(false);
    const [Type,setType]=useState("")
    // console.log(Type)
    const handleButtonClick = (type) => {
        setType(type)
        setSignUpActive(type === 'signUp');
    };
    const currentPageUrl = window.location.href;
    const navigate = useNavigate()
    const handleHomePageClick = () => {
        setIsHomePageRaised(true);
        currentPageUrl === 'https://mypexel.com/' ?
            window.location.reload()
            : navigate("/")
    };

    //  Login Page Funtion
    const { setRole, setName, token, setToken, gender, setGender, setUrl } = useContext(StateContext)
    const [show, setShow] = useState(false)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(null)
    const [err, setErr] = useState(null)
    const [SuccErr, setSuccErr] = useState(false)
   useEffect(()=>{

       setUrl(currentPageUrl)
   },[currentPageUrl])
    const ShowHandlear = () => {
        setShow(false)

    }
    // setUrl(currentPageUrl)
    const loginHaendlear = (e) => {
        e.preventDefault()
        const Login = {
            username: userName,
            password: password

        }
        const headers = token ? { Authorization: `Token ${token}` } : {};
        function loginData() {
            axios.post(`${baseUrl}login/`, Login, { headers })
                .then((res) => {
                    setRole(res.data.role);
                    setToken(res.data.token);
                    setGender(res.data.gender);
                    setName(res.data.username);
                    setSuccess("");
                    res.data.token && res.data.role === "Admin" ? navigate("/AdminPage")
                        : res.data.token && res.data.role === "User" ? navigate("/")
                            : console.log(res.data);
                    window.location.reload();
                })

                .catch((err) => {
                    setSuccErr(false);
                    setShow(true);
                    setPassword("")
                    setUserName("")
                    setErr(err.response.data.Error);
                })

        }
        loginData()
    }
    // register qismi 

    const [passwordR, setPasswordR] = useState("")
    const [userNameR, setUserNameR] = useState("")
    const [isChecked, setIsChecked] = useState(false);
    const [genderR, setGenderR] = useState("True")
    const handleCheckboxChange = (e) => {
        setIsChecked(!isChecked);
        setGenderR(isChecked === true ? "True" : "False")
        const male = document.getElementById('male');
        const path = document.getElementById('path');
        const bow = document.getElementById('bow');
        if (!isChecked) {
            male.classList.remove('ma');
            setTimeout(function () {
                path.classList.add('fe');
                male.classList.add('fe');
                bow.classList.add('fe');
            }, 390);
        } else {
            male.classList.add('ma');
            setTimeout(function () {
                path.classList.remove('fe');
                male.classList.remove('fe');
                bow.classList.remove('fe');
            }, 390);
        }
    };
    const registerHandlear = (e) => {
        e.preventDefault()
        // const formData = new FormData();
        // formData.append('username', userName);
        // formData.append('password', password);
        // formData.append('genderR', genderR);
        const regisApi = {
            username: userNameR,
            password: passwordR,
            gender: genderR
        }
        function postData() {
            axios.post(`${baseUrl}regis/`, regisApi)
                .then((res) => {
                    // console.log(res.data)
                    // setShow(true)
                    // setSuccErr(true)
                    // alert(res?.data?.Success)
                    setPasswordR("")
                    setUserNameR("")
                    setSuccess(res?.data?.Success)
                    setSignUpActive(false)
                    // console.log("Accoun successfully created")
                    //  navigate("/login")
                })
                .catch((err) => {
                    // setSuccErr(false)
                    // setShow(true)
                    setPasswordR("")
                    setUserNameR("")
                    // console.log(err.response.data.Error === undefined ? "Choose Gender" : err.response.data.Error)
                    // alert(err.response.data.Error === undefined ? "Choose Gender" : err.response.data.Error)
                    setErr(err.response.data.Error === undefined ? "Choose Gender" : err.response.data.Error)

                })
        }
        postData()
    }
    // const ShowHandlear2 = () => {
    //     setShow(false)
    //     if (SuccErr === true) {

    //         navigate("/login")
    //         return
    //     }
    // }
    const [eye, setEye] = useState(false)
    const EyeHandlear = () => {
        setEye(prevState => !prevState);
    }
    // console.log(eye)
    return (
        <div className=' flex flex-col gap-4 p-5  h-screen'>
            <SuccesErrorModal setError={setErr} err={err} success={success} setSuccess={setSuccess} />
            <NavLink to={"/"} onClick={handleHomePageClick} className={`${isHomePageRaised ? 'raised' : ''} absolute top-5  left-5`}>
                <img className='text-xl w-[90px] ' src={Mypexel} alt="" />
            </NavLink>
            <div className={`container ${isSignUpActive ? 'right-panel-active' : ''} `}>
                {/* <div className={`w-[330px] h-[250px] bg-white shadow-md shadow-gray-400 absolute left-[910px]   ${show ? `top-[250px]` : "-top-[350px]"} rounded-xl ease-in duration-300 `} >
                    <div className={`w-16 h-16 ${SuccErr ? "bg-green-500" : "bg-red-500"}   rounded-full flex items-center justify-center m-auto mt-12`}>
                        <h1 className={`text-white   text-2xl font-bold `}>{SuccErr ? "√" : "X"}</h1>
                    </div>
                    <h1 className={`text-2xl ${SuccErr ? "text-green-500" : "text-red-500"}  ml-[120px] mt-2`}>{SuccErr ? "SUCCESS" : "ERROR"}</h1>
                    <h1 className={`text-gray-500 ml-[80px]`}>{SuccErr ? success : err} </h1>
                    <button onClick={ShowHandlear} className={`w-full text-white  ${SuccErr ? "bg-green-500" : "bg-red-500"}    py-3 mt-[42px] rounded-b-xl`}>Continue</button>
                </div> */}
                {/* register qisim */}
                <div className="form-container sign-up-container">
                    <form onSubmit={registerHandlear} className='form' action="#">
                        <p className='p'></p>
                        <h1 className='h1 '>Create Account</h1>
                        <input required value={userNameR} onChange={e => setUserNameR(e.target.value)} className='input' type="text" placeholder="Username" />
                        <label className='input2' >
                            <input required value={passwordR} onChange={e => setPasswordR(e.target.value)} type={eye ? "text" : "password"} placeholder="Password" />
                            <div onClick={EyeHandlear}>
                                {
                                    eye ? <FaRegEye className=' text-[18px]' />
                                        :
                                        <FaRegEyeSlash className=' text-[19px]' />

                                }
                            </div>
                        </label>
                        <div id="app-cover" className="app-cover">
                            <input
                                type="checkbox"
                                id="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <div id="path" className={`path ${isChecked ? 'fe' : ''}`}></div>
                            <div id="knob" className="knob">
                                <div id="bow" className={`bow ${isChecked ? 'fe' : ''}`}>
                                    <i className="icon ion-md-bowtie"></i>
                                </div>
                            </div>
                            <div id="gender" className="gender">
                                <div id="fe" className={`${isChecked ? 'fe' : 'ma'}`}>FE</div>
                                <div id="male" className={`${isChecked ? 'fe' : 'ma'}`}>
                                    <span>MALE</span>
                                </div>
                            </div >
                        </div >
                        <button className='button up'>Sign Up</button>
                    </form >
                </div >
                {/* Login qism  */}
                <div className="form-container sign-in-container">
                    <form onSubmit={loginHaendlear} className='form' action="#">
                        <h1 className='h1'>Sign in</h1>
                        <input required value={userName} onChange={e => setUserName(e.target.value)} className='input' type="text" placeholder="Username" />
                        <label className='input2' >
                            <input required value={password} onChange={e => setPassword(e.target.value)} type={eye ? "text" : "password"} placeholder="Password" />
                            <div onClick={EyeHandlear}>
                                {
                                    eye ? <FaRegEye className=' text-[18px]' />
                                        :
                                        <FaRegEyeSlash className=' text-[19px]' />

                                }
                            </div>
                        </label>
                        <a className='a' href="#">Forgot your password?</a>
                        <button className='button'>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className='h1'>Welcome Back!</h1>
                            <p className='p'>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={() => handleButtonClick('signIn')}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className='h1'>Hello, Friend!</h1>
                            <p className='p'>Enter your personal details and start journey with us</p>
                            <button className="ghost " onClick={() => handleButtonClick('signUp')}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default LoginAuthForm;
