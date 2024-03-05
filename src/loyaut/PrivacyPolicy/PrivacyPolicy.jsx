import React from 'react'
import AboutBar from '../AboutBar/AboutBar'
import Foter from '../Foter/Foter'

function PrivacyPolicy() {
  return (
    <div>
      <AboutBar />
      <div className=' flex flex-col px-48 py-10 gap-9'>
        <div>
          <h1 className=' text-[15px] font-medium'>• User Information</h1>
          <h1 className=' text-[15px]'>User personal information is symbolically protected under our privacy policy and will not be disclosed. </h1>
        </div>
        <div>
          <h1 className=' text-[15px] font-medium'>• Privacy Policy</h1>
          <h1 className=' text-[15px]'> For complete information on how we protect and store your personal information, refer to our privacy policy.</h1>
        </div>
        <div>
          <h1 className=' text-[15px] font-medium'>• Cookies</h1>
          <h1 className=' text-[15px]'> Our website may utilize cookies. They store information on how users interact with our site.</h1>
        </div>
        <div>
          <h1 className=' text-[15px] font-medium'>• Ownership </h1>
          <h1 className=' text-[15px]'> All PNG images and content are owned by the creator affiliated with Mypexel_com.</h1>
        </div>
        <div>
          <h1 className=' text-[15px] font-medium'>• Preservation of Copyright</h1>
          <h1 className=' text-[15px]'>When using content from our site, it is necessary to preserve copyright rights. </h1>
        </div>
        <div>
          <h1 className=' text-[15px] font-medium'>•  Reproduction and Modification </h1>
          <h1 className=' text-[15px]'> Reproduction or modification of copyright material for commercial use or other services is strictly prohibited.</h1>
        </div>
        <div>
          <h1 className=' text-[15px] font-medium'>•  Restricted Activities</h1>
          <h1 className=' text-[15px]'>Unauthorized modifications, reproductions, or commercial use of the content are strictly prohibited.</h1>
        </div>
        <div>
          <h1 className=' text-[15px] font-medium'>• Restricted Content Usage </h1>
          <h1 className=' text-[15px]'> Using our content for restricted purposes is strictly prohibited and violates our terms and legal standards.</h1>
        </div>
        <div>
          <h1 className=' text-[15px] font-medium'>• Restricted Attribution </h1>
          <h1 className=' text-[15px]'> Using our content for restricted attributions to other sources is strictly prohibited.</h1>
        </div>
        <div>
          <h1 className=' text-[15px] font-medium'>• Modification Notice </h1>
          <h1 className=' text-[15px]'>The Terms on Mypexel_com may be modified. Any changes will be announced on our site.</h1>
        </div>
        <div>
          <h1 className=' text-[15px] font-medium'>• Notification of Changes </h1>
          <h1 className=' text-[15px]'>To inform users of any changes, modified terms will be publicly announced on our site. </h1>
        </div>
        <div>
          <h1 className=' text-[15px] font-medium'>• Right to Terminate </h1>
          <h1 className=' text-[15px]'> Mypexel_com reserves the right to terminate user access to the site at any time without notice.</h1>
        </div>
        <div>
          <h1 className=' text-[15px] font-medium'>• Reasons for Termination </h1>
          <h1 className=' text-[15px]'>We reserve the right to terminate user access without notice, based on valid reasons. Users will be notified upon account cancellation. </h1>
        </div>
      </div>
      <Foter/>
    </div>
  )
}

export default PrivacyPolicy
