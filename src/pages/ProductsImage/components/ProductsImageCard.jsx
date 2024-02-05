import React, { useState, useEffect } from 'react';
import ProductsImageCardUi from './ProductsImageCardUi';
import '../components/ProductsImageCardUi.css';
import SearchEmpty from '../../../assets/images/EmptySearcha.png';
import { TailSpin } from 'react-loader-spinner';

function ProductsImageCard({ productsImg }) {
  const [not, setNot] = useState(false);

  useEffect(() => {
    if (productsImg.length === 0) {
      // If productsImg length is 0, setNot to true after 3 seconds
      const timerId = setTimeout(() => {
        setNot(true);
      }, 3000);

      // Clear the timeout when the component unmounts
      return () => clearTimeout(timerId);
    }
  }, [productsImg]);

  return (
    <div className='row'>
      <div className='card-columns'>
        {productsImg.length >= 1 ? (
          productsImg.map((image, index) => (
            <ProductsImageCardUi image={image} key={index + 1} />
          ))
        ) : not ? (
          <div className='flex flex-col gap-5 w-[100px]'>
            <img className='absolute w-[1000px] left-[23%]' src={SearchEmpty} alt='' />
            <h1 className='absolute text-xl font-medium italic text-[#acacac] left-[44%]'>
             Image Not Found
            </h1>
          </div>
        ) : (
          <h1 className=' absolute left-[45%]'>
            <button className='pl-[45%]'>
              <TailSpin
                visible={true}
                height='100'
                width='100'
                color='#1fadff'
                ariaLabel='tail-spin-loading'
                radius='1'
                wrapperStyle={{}}
                wrapperClass=''
              />
            </button>
          </h1>
        )}
      </div>
    </div>
  );
}

export default ProductsImageCard;
