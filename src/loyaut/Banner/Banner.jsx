import React, { useContext, useEffect, useState } from 'react';
import BannerImg from '../../assets/images/Banner.jpg';
import Banner1 from '../../assets/images/baner1.jpg';
import Banner2 from '../../assets/images/baner2.jpg';
import Banner3 from '../../assets/images/baner3.jpg';
import Banner4 from '../../assets/images/baner4.4.jpg';

import InputSearch from './conpanents/InputSearch';
import { StateContext } from '../../App';
import { useFilteredItemQuery } from '../../services/categoriesApi';
import { useProductsImageQuery } from '../../services/productsImageApi';

const sliderImages = [
  BannerImg,
  // Banner1,
  Banner2,
  Banner3
  // Banner4
];

function Banner() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { productsImg } = useContext(StateContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(1); // Start from the second image
  const { data:Productsimaga } = useProductsImageQuery()
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Auto slide every 10 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const bannerStyle = {
    backgroundImage: `url(${sliderImages[currentImageIndex]})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left', // Slide in from the left
    width: '100%',
    transition: 'background-image 1s ease-in-out, background-position 1s ease-in-out', // Add transition property
    height: '500px',
  };



  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   setInterval(() => {
  //     // setTimeout(() => {
  //       setShow(true)
  //       setTimeout(() => {
  //         setShow(false)

  //       }, 5000);
  //     // }, 10000);
  //   },10000);
  // }, []);
  return (
    <>
      {/* <div className={`bg-blue-300 w-80 h-40 rounded-2xl absolute left-[41%] transition-all duration-2000 ${show ? 'top-[50%]' : '-top-20'}`}>
        <h1>upload</h1>
      </div> */}
      <div style={bannerStyle}>
        <div className='flex flex-col items-center justify-center pt-24 '>
          <h1 className='font-noemal text-[45px] text-white '> WELCOME</h1>
          <h1 className='text-[40px] font-light text-white '>{Productsimaga?.result}+ FREE RESOURCE FOR YOUR DREAMS</h1>
        </div>
        <div className='flex flex-row items-center justify-center pt-9'>
          <InputSearch />
        </div>
        {/* <h1 className=' absolute left-[80%] top-[78%] xl:top-[63%] font-bold text-white cursor-pointer flex flex-row gap-2 ' ><span className='   text-white opacity-80'>Photo by </span> dimitrisvetsikas1969</h1> */}
      </div>
    </>
  );
}

export default Banner;
