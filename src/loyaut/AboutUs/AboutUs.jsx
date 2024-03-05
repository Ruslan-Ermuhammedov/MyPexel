import React from 'react'
import AboutBar from '../AboutBar/AboutBar'
import My from '../../assets/images/my.jpg'
import Foter from '../Foter/Foter'
function AboutUs() {
  return (
    <div className=' flex flex-col gap-10 '>
      <AboutBar />
      <div className='w-full'>
        <img className=' w-full h-96 bg-cover bg-no-repeat object-cover' src={My} alt="" />
        <div className=' flex flex-col px-48 py-10  gap-9'>
          <div>
            <h1 className=' text-[15px] font-medium'>• About Us: </h1>
            <h1 className=' text-[15px]'>Welcome! to Mypexel.com, share high quality PNG images with transparent background for free worldwide.</h1>
          </div>
          <div>
            <h1 className=' text-[15px] font-medium'>• Our mission</h1>
            <h1 className=' text-[15px]'>At Mypexel.com, our mission is to foster creativity, empower collaboration, and empower designers, artists, and photographers around the world. In order to create a space to share their creations with the world.</h1>
          </div>
          <div>
            <h1 className=' text-[15px] font-medium'>• Creators Space</h1>
            <h1 className=' text-[15px]'>Welcome to the Creators Space! on Mypexel.com We are the creators of a digital space for artists and photographers to come together to paint the world with their imaginations. We are not just a website; We are a community of innovators and creators of talent.</h1>
          </div>
          <div>
            <h1 className=' text-[15px] font-medium'>• Join our team!</h1>
            <h1 className=' text-[15px]'>Become part of our rapidly expanding family of creators. Whether you're an artist ready to unleash your masterpiece, a designer looking for inspiration, or a content creator or developer looking for the perfect visual elements, the creative home of Mypexel.com welcomes you.</h1>
          </div>
          <div>
            <h1 className=' text-[15px] font-medium'>• What do we do?</h1>
            <h1 className=' text-[15px]'>This is a very simple and universal work. We photographers take pictures, Unique Artists paint, Our designers create designs that encourage you to look at the world differently. We are on the way to create free and premium products around the world. We are currently starting with PNG images with transparent backgrounds! But we are on our way, we are working on adding Photo,Vector,Template,video formats for our valued customers in the coming days.</h1>
          </div>
        </div>
      </div>
      <Foter/>
    </div>
  )
}

export default AboutUs
