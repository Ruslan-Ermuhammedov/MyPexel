import React from 'react'
import AboutBar from '../AboutBar/AboutBar'
import Foter from '../Foter/Foter'

function TermsService() {
  return (
    <div>
      <AboutBar/>
      <div className=' flex flex-col px-48 py-10 gap-9 '>
      <div>
        <h1 className=' text-[15px] font-medium'>• Acceptance of Terms</h1>
        <h1 className=' text-[15px]'>By using this website, you are automatically considered to have accepted these Terms and Conditions ("Terms").</h1>
      </div>
      <div>
        <h1 className=' text-[15px] font-medium'>• Laws and Regulations </h1>
        <h1 className=' text-[15px]'>At the time of accepting these Terms, you agree to comply with all laws and regulations applicable to our website. </h1>
      </div>
      <div>
        <h1 className=' text-[15px] font-medium'>• Changes to Terms </h1>
        <h1 className=' text-[15px]'>We reserve the right to change the terms of use and post our modifications on the designated page. Therefore, it is advisable for you to regularly check these terms to ensure continuous compliance. </h1>
      </div>
      <div>
        <h1 className=' text-[15px] font-medium'>• Use of Content</h1>
        <h1 className=' text-[15px]'> PNG images provided through our website are for personal, commercial, and private use only. </h1>
      </div>
      <div>
        <h1 className=' text-[15px] font-medium'>• Commercial Use </h1>
        <h1 className=' text-[15px]'>If you intend to use our content for other websites or commercial purposes, you must respect copyright regulations. </h1>
      </div>
      <div>
        <h1 className=' text-[15px] font-medium'>• Strict Prohibition </h1>
        <h1 className=' text-[15px]'> Any replication, modification, or commercial use of the content from our site is strictly prohibited.</h1>
      </div>
      <div>
        <h1 className=' text-[15px] font-medium'>• Attribution</h1>
        <h1 className=' text-[15px]'> In every use of an image, you are required to attribute "Mypexel_com" as the source.</h1>
      </div>
      <div>
        <h1 className=' text-[15px] font-medium'>• Full Disclosure of Attribution</h1>
        <h1 className=' text-[15px]'> You must fully and easily disclose the "Mypexel_com" source in every use of our content.</h1>
      </div>
      <div>
        <h1 className=' text-[15px] font-medium'>• Failure to Provide Full Attribution</h1>
        <h1 className=' text-[15px]'> Failure to provide complete and easy-to-find attribution may result in content usage restrictions and other actions.</h1>
      </div>

      </div>
      <Foter/>
    </div>
  )
}

export default TermsService
