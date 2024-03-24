import React, { useEffect, useState } from 'react'
import CarPng from '../../assets/images/CarPng.png'
import AnanasPng from '../../assets/images/AnanasPng.png'
import BonkaPng from '../../assets/images/BonkaPng.png'
import NextIcon from '../../assets/images/NextIcon.png'
import {  baseUrl, imageUrl } from '../../constants/baseUrl'
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import axios from 'axios'

function NurAi() {
    const PngImages = [
        CarPng,
        AnanasPng,
        BonkaPng
    ]
    const JpgImages = [
        "https://i.ibb.co/Gc5d9gg/car-photo-1.png",
        "https://i.ibb.co/hBhG9wS/pineapple.jpg",
        "https://i.ibb.co/HPbRbdC/jar-1.jpg"

    ]
    const [imageNumber, setImageNumber] = useState(0)
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageEdit, setImageEdit] = useState(null);
    // const [Name, setName] = useState(localStorage.getItem('Name') || "")
    // useEffect(() => {
    //     localStorage.setItem("Name", Name);
    
    //   }, [Name]);
    // console.log(image?.name)

    const ImageFilehaendlear = (e) => {
        const file = e.target.files[0];

        // Check if a file is selected
        if (file) {
            const allowedExtensions = /\.(png|jpg|jpeg)$/i;

            // Check if the file type is allowed
            if (!allowedExtensions.test(file.name)) {
                alert('Invalid file type. Only PNG, JPG, and JPEG images are allowed.');
                // Optionally, you can clear the file input
                e.target.value = '';
                return;
            }

            // File type is valid, update the state
            setImage(e.target.files[0])
            setImageFile(URL.createObjectURL(e.target.files[0]))
        }
    }

    const [percentage, setPercentage] = useState(50);
    const handleRangeChange = (e) => {
        setPercentage(e.target.value);
    };

    // console.log(percentage)

    const NumberImageHeandlear = (num) => {
        setImageNumber(num)
        setPercentage(50)
    }
    // console.log(JpgImages[imageNumber])



    const [selectedArea, setSelectedArea] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImageFile(e.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handleAreaSelect = (event) => {
        // Tanlangan qismni (belgilangan juftlikni) olish
        const selectedArea = event.target.selectionStart;
        setSelectedArea(selectedArea);
    };

    const handleRemoveArea = () => {
        if (selectedArea !== null) {
            // Tasvirning birinchi qismini belgilangan qismi bilan biriktirish
            const croppedImage = imageFile.slice(0, selectedArea);

            // Tasvirning ikkinchi qismini belgilangan qismi bilan biriktirish
            const secondHalfStart = selectedArea + 1;
            const secondHalf = imageFile.slice(secondHalfStart);

            // Yangi tasvirni biriktirish
            const newImage = croppedImage + secondHalf;

            // Yangi tasvirni o'rnating
            setImageFile(newImage);
            setSelectedArea(null);
        }
    };




    useEffect(() => {
        const formData = new FormData();
        formData.append('input_image', image);
        function nurAi() {
            axios.post(`${baseUrl}ai/`, formData)
                .then((res) => setImageEdit(res?.data?.processed_image))
                .catch((err) => console.log(err))
        }
        if (image) nurAi()
    }, [image])

    // http://192.168.1.2:8001/app/ai/
    return (
        <div>
            <div className='w-full  shadow-sm shadow-zinc-300  bg-gray-100 py-10 '>
                <div className='w-[1300px] h-60   border-dashed border-2 border-[#6999ff]  m-auto flex flex-col gap-3  rounded-[10px] items-center justify-center '>
                    {/* <svg className='w-[70px] h-[70px]' xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                            <path d="M8.75 23.5C8.75 20.6716 8.75 19.2574 9.62868 18.3787C10.5074 17.5 11.9216 17.5 14.75 17.5H55.25C58.0784 17.5 59.4926 17.5 60.3713 18.3787C61.25 19.2574 61.25 20.6716 61.25 23.5V55.25C61.25 58.0784 61.25 59.4926 60.3713 60.3713C59.4926 61.25 58.0784 61.25 55.25 61.25H14.75C11.9216 61.25 10.5074 61.25 9.62868 60.3713C8.75 59.4926 8.75 58.0784 8.75 55.25V23.5Z" fill="#7E869E" fill-opacity="0.25" />
                            <path d="M10.75 40.8333H19.9448C21.5632 40.8333 22.3723 40.8333 22.9318 41.3072C23.4913 41.7812 23.6243 42.5793 23.8904 44.1757L24.6524 48.7477C24.7189 49.1467 24.7522 49.3463 24.892 49.4648C25.0319 49.5833 25.2342 49.5833 25.6388 49.5833H44.3612C44.7658 49.5833 44.9681 49.5833 45.108 49.4648C45.2478 49.3463 45.2811 49.1467 45.3476 48.7477L46.1096 44.1757C46.3757 42.5793 46.5087 41.7812 47.0682 41.3072C47.6277 40.8333 48.4368 40.8333 50.0552 40.8333H59.25C60.1928 40.8333 60.6642 40.8333 60.9571 41.1261C61.25 41.419 61.25 41.8904 61.25 42.8333V55.2499C61.25 58.0783 61.25 59.4926 60.3713 60.3712C59.4926 61.2499 58.0784 61.2499 55.25 61.2499H14.75C11.9216 61.2499 10.5074 61.2499 9.62868 60.3712C8.75 59.4926 8.75 58.0783 8.75 55.2499V42.8333C8.75 41.8904 8.75 41.419 9.04289 41.1261C9.33579 40.8333 9.80719 40.8333 10.75 40.8333Z" fill="#6D71F9" />
                            <path d="M27.708 30.6251L34.9997 37.9167M34.9997 37.9167L42.2913 30.6251M34.9997 37.9167L34.9997 8.75008" stroke="#6D71F9" stroke-width="6" stroke-linecap="round" />
                        </svg> */}

                    <label className=" w-52   " style={{ backgroundColor: '#6999ff', color: 'white', padding: '5px', borderRadius: '10px', cursor: 'pointer', textAlign: "center" }}>
                        Upload Image
                        {/* Fayl tanlash uchun input */}
                        <input required className="sr-only" name='image' onChange={ImageFilehaendlear} type="file" />
                    </label>
                    <h1 className='text-sm font-semibold text-[#9293a0]  '>Drag in drop files or </h1>
                </div>
            </div>

            <div className='w-full   flex flex-col gap-10   py-20 '>

                <div style={{ boxShadow: '0 0 10px 4px #eeeeee' }} className=' w-[1300px] m-auto flex h-[465px] max-h-[500px] flex-row dap-2 gap-5 rounded-2xl bg-white p-3 '>

                    <div className=' w-[800px] cursor-col-resize h-full relative  '>
                        <div
                            className="relative cursor-col-resize h-full overflow-hidden bg-contain"
                            style={{ backgroundImage: `url(${imageFile ? imageFile :JpgImages[imageNumber]})` }}
                        >
                            <img
                                className="w-full h-full cursor-col-resize object-cover bg-[url('https://i.postimg.cc/fbpx3p5Y/check-3.jpg')]"
                                src={imageEdit ? `http://192.168.1.2:8000${imageEdit}` : PngImages[imageNumber]}
                                alt=""
                                style={{ clipPath: `inset(0 0 0 ${percentage}%)` }}
                            />
                        </div>




                        <input
                            type="range"
                            value={percentage}
                            onChange={handleRangeChange}
                            className="cursor-col-resize z-20 appearance-none absolute bg-transparent h-full top-[0%] left-0 w-full"
                            style={{
                                color: '#ffff',
                                outline: 'none',
                                cursor: 'cursor-col-resize',

                                // Opacitiyani 0 qilish
                                opacity: 0,
                            }}
                        />

                        <button
                            className={`bg-[#ffffff] w-[3px] z-10 cursor-col-resize  absolute h-full `}
                            style={{
                                left: `calc(${percentage}% - 1px)`, // 20px - tugmachning yarimi uchun o'zi
                                top: '0',
                                outline: 'none',
                            }}
                        ></button>
                        <button
                            className={`  z-10 cursor-col-resize w-10 h-10  flex flex-row absolute `}
                            style={{
                                left: `calc(${percentage}% - 20px)`, // 20px - tugmachning yarimi uchun o'zi
                                top: '47%',
                                color: '',
                                outline: 'none',
                            }}
                        >
                            <img src={NextIcon} className=' ' alt="" />
                        </button>




                    </div>
                    <div className=' flex flex-col gap-9  w-[500px]  h-full items-center justify-center pt-16'>
                        <div className=' flex flex-col gap-2 items-center justify-center' >
                            <button className='  bg-[#6999ff] text-white rounded-md w-72 text-[19px] font-normal h-12 outline-none  shadow-lg transform active:scale-90 transition-transform'>Download</button>
                            <p className=' text-sm  text-zinc-400'>Preview Image 600 x 480</p>
                        </div>
                        <div className=' flex flex-col gap-2 items-center justify-center' >
                            <button
                                type="button"
                                class="border border-[#6999ff] text-[19px] text-[#4a82fa] rounded-md  h-12 m-2 transition duration-500 ease select-none w-72  hover:text-white active:scale-90  hover:bg-[#6999ff] focus:outline-none focus:shadow-outline"

                            // className=' bg-[#ffffff00] border-[3px] hover:bg-[#6999ff] border-[#6999ff] hover:text-white text-[#4a82fa]   rounded-md w-72 text-[20px] font-normal h-12 outline-none  shadow-lg transform active:scale-90 transition-transform'
                            >Download high quality</button>
                            <p className=' text-sm  text-zinc-400'>Preview Image 1600 x 2480</p>
                        </div>
                        {/* <input type="range" placeholder="range...." class="border w-full app border-gray-300 p-2 my-2 rounded-md focus:outline-none" /> */}
                        <div className=' grid grid-cols-3 gap-3 w-full  p-5 '>
                            {
                                JpgImages.map((item, index) => (

                                    <img onClick={() => NumberImageHeandlear(index)} className=' rounded-2xl  cursor-pointer' key={index} src={item} alt="" />
                                ))
                            }


                        </div>
                    </div>

                </div>



            </div>
            <h1>© 2023-2024 Mypexel - All Rights Reserved.</h1>
                      
                      <img src={`http://193.168.1.3:8001/media/images/Butcoin-01.png`} alt="hato" className=' m-auto border-2 w-96 h-80 min-h-80 min-w-80 rounded-xl' />
        </div>
    )
}

export default NurAi
