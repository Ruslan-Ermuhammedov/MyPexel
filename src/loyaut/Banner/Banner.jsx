import React, { useContext, useEffect, useState } from 'react'
import BannerImg from '../../assets/images/Banner.jpg'
import InputSearch from './conpanents/InputSearch'
import { StateContext } from '../../App';
function Banner() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { productsImg } = useContext(StateContext)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const bannerStyle = {
    backgroundImage: `url(${BannerImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '500px',
  };
  return (
    <div style={bannerStyle}>
      <div className='flex flex-col items-center justify-center pt-24 '>
        <h1 className='font-noemal text-[45px] text-white '> WELCOME</h1>
        <h1 className='text-[40px] font-light text-white '>{productsImg.length} + FREE RESOURCE FOR YOUR DREAMS</h1>
      </div>
      <div className='flex flex-row items-center justify-center pt-9'>

        <InputSearch />
      </div>
    </div>
  )
}

export default Banner
