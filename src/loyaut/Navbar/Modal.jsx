import React from 'react';
import BasketCard from './BasketCard';
import { useBasketImagesQuery } from '../../services/basketApi';

const Modal = ({ isOpen, onClose,basketId }) => {
  const { data: basketApi, isSuccess: isSuccessBasketApi, isLoading: isLoadingBasketApi } = useBasketImagesQuery(basketId)

  return (
    <div>

   
    <div onClick={onClose} className={`  absolute bg-[#00000058] w-full  h-auto min-h-[1300px] top-0 left-0 transform transition-transform ease-in-out duration-500 inset-y-0 ${isOpen ? '' : 'hidden'} `}>
    </div>
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform ease-in-out duration-500 ${isOpen ? '' : 'translate-x-full'}`}>
      
        <button onClick={onClose} className="mt-4  text-[19px]   py-2 px-4 w-80 ml-10  pl-[270px] pb-6  border-b border-gray-200">Close </button>
      {isLoadingBasketApi && <h1>Loading...</h1>}
     {
            isSuccessBasketApi && <BasketCard basketApi={basketApi.images} />
          }
    </div>
    </div>

  );
};

export default Modal;