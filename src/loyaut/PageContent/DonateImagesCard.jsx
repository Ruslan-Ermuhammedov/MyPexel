import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../../App';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { imageUrl } from '../../constants/baseUrl';
import { FiDownload } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";

function DonateImagesCard({ image }) {
    // console.log(image)
    const [iconVisible, setIconVisible] = useState(false);


    const { basketState, setChexbox, update, setUpdate, basketErrModal, setBasketErrModal, basketDispatch, token, deteilChildId, basketId, setBasketId } = useContext(StateContext);
    // const { data:CategiryDetail ,isSuccess: isSuccessCategoriesDetail, isLoading: isLoadingCategoriesDetail } = useCategoriesDetailQuery(image.id)

    const handleDownload = () => {
        const downloadUrl = `${imageUrl}${image.image}`;
        fetch(downloadUrl)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = `${image.custom_name}.png`;
                link.click();

                window.URL.revokeObjectURL(blobUrl);
            })
            .catch(error => setHato('Error fetching image:', error));
    };


    const imgIdHeandlear = () => {
        // setChexbox(image?.id); // Assuming you get 'image' from somewhere
        // Assuming 'image' is available or handled correctly
        setChexbox(image.id); // Assuming 'image' has 'id' property
    };

 
    return (
        <>

        {/* <button className='bg-blue-500 p-4 rounded-xl'>download</button> */}
        {/* <div>
{
  imgIdAll>0 &&  imgIdAll.map((item)=>(
<h1>{item}</h1>
    ))
}

        </div> */}
            <div
                onMouseEnter={() => setIconVisible(true)}
                onMouseLeave={() => setIconVisible(false)}
                className=' rounded-lg  xl2:h-[360px] hover:  h-[300px]  flex  flex-row   bg-[url("https://i.postimg.cc/fbpx3p5Y/check-3.jpg")] shadow shadow-zinc-200 justify-center    '>
                <LazyLoadImage
                    className={` rounded-3xl w-full h-full   object-contain cursor-pointer `}
                    src={image?.donated_imgs}
                    alt="hato"
                    // style={{ cursor: 'pointer', minHeight: "150px", minWidth: "250px" }}
                    onMouseEnter={() => setIconVisible(true)}
                    onMouseLeave={() => setIconVisible(false)}
                    effect="blur"
                    delayMethod="throttle"
                />

                {iconVisible && (
                    <div

                        onMouseEnter={() => setIconVisible(true)}
                        onMouseLeave={() => setIconVisible(false)}
                        className={`bg-gradient-to-t cursor-pointer absolute xl2:w-[18%] xl:w-[17.8%] w-[17%] rounded-lg xl2:h-[360px] h-[300px] from-[#00000039] outline-none focus:ring-4 shadow-sm transform  transition-transform   z-[5]`}
                    >
                    </div>
                )}
                {iconVisible && (
                    <button
                        onMouseEnter={() => setIconVisible(true)}
                        onMouseLeave={() => setIconVisible(false)}
                        className='text-3xl z-20 absolute  xl2:mt-[260px] xl:mt-[222px]  mt-[14%] ml-[14%]   text-[#ffffff] font-bold outline-none shadow-sm transform active:scale-90 transition-transform'
                    >
                        <RiDeleteBin2Line />
                    </button>
                )}
                <input type="checkbox"
                    onChange={imgIdHeandlear}
                    onMouseEnter={() => setIconVisible(true)}
                    onMouseLeave={() => setIconVisible(false)}
                    className=' w-5 h-5 z-20 absolute bg-transparent   xl2:mt-[60px] xl:mt-[52px]  mt-[1%] ml-[14%]   text-[#ffffff00] font-bold outline-none shadow-sm transform active:scale-90 transition-transform'
                />

                {iconVisible && (
                    <FiDownload
                        onMouseEnter={() => setIconVisible(true)}
                        onMouseLeave={() => setIconVisible(false)}
                        onClick={handleDownload}
                        className=' cursor-pointer z-20 text-3xl xl2:mt-[315px] xl:mt-[265px]  absolute    mt-[17%] ml-[14%] text-[#ffffff] font-bold outline-none focus:ring-4 shadow-sm transform active:scale-90 transition-transform'
                    />
                )}
            </div>
        </>
    )
}
export default DonateImagesCard
