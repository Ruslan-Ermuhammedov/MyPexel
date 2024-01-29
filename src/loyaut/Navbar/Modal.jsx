import React from 'react';
import BasketCard from './BasketCard';

const Modal = ({ isOpen, onClose,basketApi }) => {
  // console.log(basketApi)
  return (
    <div>

   
    <div onClick={onClose} className={`  absolute bg-[#00000058] w-[1519px]  h-auto min-h-[1300px] top-0 left-0 transform transition-transform ease-in-out duration-500 inset-y-0 ${isOpen ? '' : 'hidden'} `}>
    </div>
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform ease-in-out duration-500 ${isOpen ? '' : 'translate-x-full'}`}>
      
        <button onClick={onClose} className="mt-4  text-[19px]   py-2 px-4 w-80 ml-10  pl-[270px] pb-6  border-b border-gray-200">Close </button>
      
     {
            basketApi && <BasketCard basketApi={basketApi} />
          }
    </div>
    </div>

  );
};

export default Modal;