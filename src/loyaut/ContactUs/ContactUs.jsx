import React, { useState } from 'react'
import AboutBar from '../AboutBar/AboutBar'
import axios from 'axios'
import { baseUrl } from '../../constants/baseUrl'
import SuccesErrorModal from '../../pages/Login/SuccesErrorModal'
import Foter from '../Foter/Foter'

function ContactUs() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(null)
  const [err, setErr] = useState(null)

  const ContctUsHeandlear = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('client_name', name);
    formData.append('client_email', email);
    formData.append('client_message', message);
    function contactUsData(){
      axios.post(`${baseUrl}client_message/`, formData)
      .then((res)=>{
        setSuccess(res.data?.success)
        setEmail("")
        setName("")
        setMessage("")
      }
        )
      .catch((e) => setErr(e))
    }
    contactUsData()
  }

  return (
    <div>
      <SuccesErrorModal success={success} setSuccess={setSuccess} err={err} setErr={setErr}/>
      <AboutBar />
      <div className=' flex flex-col gap-5 py-10 px-20'>
        <h1 className=' text-xl text-zinc-600'>Contact us</h1>
        <form onSubmit={ContctUsHeandlear} className=' flex flex-col gap-2  w-[400px]'>
          <label className=' flex flex-col gap-1  w-full text-sm font-semibold text-zinc-500'>
            *Your Name
            <input required value={name} onChange={(e) => setName(e.target.value)} className=' w-full p-1 border-2 ' type="text" />
          </label>
          <label className=' flex flex-col gap-1  w-full text-sm font-semibold text-zinc-500'>
            *Your email
            <input value={email} required onChange={(e) => setEmail(e.target.value)} className=' w-full p-1 border-2 ' type="text" />
          </label>
          <label className=' flex flex-col gap-1  w-full text-sm font-semibold text-zinc-500'>
            *Message
            <textarea value={message} required onChange={(e) => setMessage(e.target.value)} className=' w-full p-1 border-2  min-h-52  placeholder:text-gray-200 ' maxLength={200} placeholder=' max length 200 '></textarea>
          </label>
          {/* <label className=' flex flex-col gap-1  w-full text-sm font-semibold text-zinc-500'>
            *Code
            <h1>SD2E</h1>
            <input className=' w-20 p-1 border-2 ' type="text" />
          </label> */}
          <button className=' bg-[#4ae382] px-5 py-2 rounded-md  text-white m-auto'>Submit</button>
        </form>
      </div>
      <Foter/>
    </div>
  )
}

export default ContactUs
