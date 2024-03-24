import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../../App';
import { baseUrl } from '../../constants/baseUrl';
import { NavLink } from 'react-router-dom';
import { FaRegCopy } from "react-icons/fa6";
import { RiDeleteBin2Line } from "react-icons/ri";
import XXX from '../../assets/icons/xxx.svg'
import { useCategoriesQuery } from '../../services/categoriesApi';
// import XXX from '../../assets/icons/xxx.svg'

function AdminPage() {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const user = 1
    const [tag, setTag] = useState("");
    const [tagAll, setTagAll] = useState([]);
    const [selectCategory, setSelectCategory] = useState([])
    const { setUrl2 } = useContext(StateContext)
    const [Hato, setHato] = useState()
    const [ImageName,setImageName]=useState("")
    // const formData = new FormData();
    // formData.append('image', image);
    // console.log(tag)
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        // Check if a file is selected
        if (file) {
            const allowedExtensions = `/\.(png)$/i`;

            // Check if the file type is allowed
            if (!allowedExtensions.test(file.name)) {
                alert('Invalid file type. Only PNG images are allowed.');
                // Optionally, you can clear the file input
                event.target.value = '';
                return;
            }

            // File type is valid, update the state
            setSelectedFile(file);
        }
    };
    const ImageFilehaendlear = (e) => {
        const file = e.target.files[0];
        setName(file.name.slice(0,-4))
        // Check if a file is selected
        if (file) {
            const allowedExtensions = /\.(png)$/i;

            // Check if the file type is allowed
            if (!allowedExtensions.test(file.name)) {
                alert('Invalid file type. Only PNG images are allowed.');
                // Optionally, you can clear the file input
                e.target.value = '';
                return;
            }

            // File type is valid, update the state
            //   setSelectedFile(file);
            setImage(e.target.files[0])
            setImageFile(URL.createObjectURL(e.target.files[0]))
        }
    }

    const ImageHaendlear = () => {

        const formData = new FormData();
        formData.append('image', image);
        formData.append('custom_name', name);
        formData.append('categories', category);
        formData.append('tags', tagAll);
        formData.append('user', user);

        function postData() {
            axios.post(`${baseUrl}upload/`, formData)
                .then((res) => {
                    setName("")
                    setTagAll([])
                    alert("image saved")
                })
                .catch((e) => console.log(e))
        }
        postData()
    }
    // useEffect(() => {
    //     function imgCategoryData() {
    //         axios.get(`${baseUrl}categories/`)
    //             .then((res) => setSelectCategory(res.data?.all_categ))
    //             .catch((e) => console.log(e))
    //     }
    //     imgCategoryData()
    // }, []);

    const { data: categories, isSuccess: isSuccessCategories, isLoading: isLoadingCategories } = useCategoriesQuery()
// console.log(categories)
    const handleCopy = () => {
        const tagsString = tagAll.join(', ');

        if (navigator.clipboard) {
            navigator.clipboard.writeText(tagsString)
                .then(() => {
                    alert('Tags copied to clipboard:', tagsString);
                })
                .catch(error => {
                    alert('Error copying tags to clipboard:', error);
                });
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = tagsString;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Tags copied to clipboard:', tagsString);
        }
    };

    const  TegHaendlear= (e) => {
        e.preventDefault();

        if (tag) {
            const tagsArray = tag.split(',').map(tagPart => tagPart.trim());
            setTagAll([...tagAll, ...tagsArray].slice(0, 20));
        }

        setTag('');
    };

    const handleTagRemoval = (tagToRemove) => {
        const updatedTags = tagAll.filter(tag => tag !== tagToRemove);
        setTagAll(updatedTags);
    };
    const TagRemove = (tagToRemove) => {
        
        setTagAll([]);
        alert("Remove Tags")
    };

    // console.log(selectCategory)
    // console.log(tagAll)
    // console.log(image)
    const currentPageUrl = window.location.href;
    useEffect(()=>{

        setUrl2(currentPageUrl)
    },[currentPageUrl])
    return (
        <div className=' bg-[#F0F0F8]'>
            
            <div className='px-11'>
                <div className='flex flex-row w-full h-[72px] items-center justify-center'>
                    <h1 className='text-xl font-bold text-[#272847]'>Upload  your content</h1>
                </div>
                <div className='w-full flex flex-col gap-14 py-12 px-9 rounded-xl shadow-lg shadow-gray-300 bg-white justify-center items-center '>
                    <h1 className='text-xl font-semibold text-[#BFBFBF]'>Submit a file to us, and we will edit and place it on the website</h1>
                    <div className='w-full h-56 flex flex-col gap-3 bg-[#F0F0F8] rounded-[10px] items-center justify-center '>
                        {/* <svg className='w-[70px] h-[70px]' xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                            <path d="M8.75 23.5C8.75 20.6716 8.75 19.2574 9.62868 18.3787C10.5074 17.5 11.9216 17.5 14.75 17.5H55.25C58.0784 17.5 59.4926 17.5 60.3713 18.3787C61.25 19.2574 61.25 20.6716 61.25 23.5V55.25C61.25 58.0784 61.25 59.4926 60.3713 60.3713C59.4926 61.25 58.0784 61.25 55.25 61.25H14.75C11.9216 61.25 10.5074 61.25 9.62868 60.3713C8.75 59.4926 8.75 58.0784 8.75 55.25V23.5Z" fill="#7E869E" fill-opacity="0.25" />
                            <path d="M10.75 40.8333H19.9448C21.5632 40.8333 22.3723 40.8333 22.9318 41.3072C23.4913 41.7812 23.6243 42.5793 23.8904 44.1757L24.6524 48.7477C24.7189 49.1467 24.7522 49.3463 24.892 49.4648C25.0319 49.5833 25.2342 49.5833 25.6388 49.5833H44.3612C44.7658 49.5833 44.9681 49.5833 45.108 49.4648C45.2478 49.3463 45.2811 49.1467 45.3476 48.7477L46.1096 44.1757C46.3757 42.5793 46.5087 41.7812 47.0682 41.3072C47.6277 40.8333 48.4368 40.8333 50.0552 40.8333H59.25C60.1928 40.8333 60.6642 40.8333 60.9571 41.1261C61.25 41.419 61.25 41.8904 61.25 42.8333V55.2499C61.25 58.0783 61.25 59.4926 60.3713 60.3712C59.4926 61.2499 58.0784 61.2499 55.25 61.2499H14.75C11.9216 61.2499 10.5074 61.2499 9.62868 60.3712C8.75 59.4926 8.75 58.0783 8.75 55.2499V42.8333C8.75 41.8904 8.75 41.419 9.04289 41.1261C9.33579 40.8333 9.80719 40.8333 10.75 40.8333Z" fill="#6D71F9" />
                            <path d="M27.708 30.6251L34.9997 37.9167M34.9997 37.9167L42.2913 30.6251M34.9997 37.9167L34.9997 8.75008" stroke="#6D71F9" stroke-width="6" stroke-linecap="round" />
                        </svg> */}

                        <label className=" w-52" style={{ backgroundColor: '#6D71F9', color: 'white', padding: '5px', borderRadius: '10px', cursor: 'pointer', textAlign: "center" }}>
                            Or Browse
                            {/* Fayl tanlash uchun input */}
                            <input required className="sr-only" name='image' accept=".png" onChange={ImageFilehaendlear} type="file" />
                        </label>
                        <h1 className='text-sm font-semibold text-[#272847]'>Drag in drop files or </h1>
                    </div>
                </div>

                {/* form qimi */}
                <div className='flex flex-row gap-10 py-20 relative  '>

                    <div className='w-[570px] h-[400px] rounded-2xl border border-gray-200 bg-white shadow-md flex-2 mi-w-[500px] shadow-gray-300 flex items-center justify-center'>
                        <img src={`${imageFile}`} className='w-full max-h-[400px]  bg-cover rounded-2xl' alt="" />
                    </div>

                    <div className='w-full flex flex-row gap-10'>

                        <div className=' w-[300px]   flex flex-col gap-3 flex-2   ' >

                            <label className='flex flex-col gap-1 w-full text-lg text-gray-600 ' >Name:
                                <input required  className='px-3 py-1 rounded-3xl border-2 border-gray-300' onChange={e => setName(e.target.value)} value={name} type="text" name='name' />
                            </label>
                            <label className='flex flex-col gap-1 w-full text-lg text-gray-600 ' >Category:
                                <select className='p-2 py-1 rounded-3xl border-2 border-gray-300' onChange={e => setCategory(e.target.value)} type="text" name='name' >
                                    {isSuccessCategories && categories?.all_categ.map((category, index) => (
                                        <option className=' mr-10 ' key={index} value={category?.id}>{category?.name}</option>
                                    ))}
                                </select>
                            </label>
                            <form className='flex flex-col gap-2' onSubmit={TegHaendlear} >

                                <label htmlFor="" className='flex flex-col gap-1 w-full text-lg text-gray-600 '>Tags:
                                    <input
                                        className='px-3 py-1 rounded-3xl border-2 border-gray-300'
                                        required
                                        value={tag}
                                        onChange={e => setTag(e.target.value)}
                                        type="text"
                                        id=""
                                    />
                                </label>
                                <button className=' bg-cyan-600 text-white rounded-3xl  text-lg h-10 absolute w-[130px] top-[340px] ' >Add Tag</button>
                            </form>
                            <button className=' bg-emerald-600 text-white rounded-3xl  text-lg h-10 absolute w-[130px] top-[340px]  left-[590px] xl:left-[620px] ml-4 ' onClick={ImageHaendlear} >Save Image</button>

                            {/* <div className='flex flex-row gap-2'> */}

                            {/* </div> */}
                        </div>
                        <div className='h-96 rounded-2xl border border-gray-200 shadow-md shadow-gray-300 bg-white flex-1 min-w-[600px] max-w-[1400px] p-5 gap-3 flex-shrink-0 overflow-y-auto hide-scroll'>
                            {
                                tagAll.map((tg, index) => (
                                    <div key={index} className="inline-flex px-[25px] h-[40px] mt-2 gap-3 items-center text-center mr-2 row-span-auto justify-center rounded-[10px] border border-[#F0F0F8] bg-[#f0f0f850] text-xl font-medium text-[#6D71F9] hover:bg-slate-200 transition flex-shrink-0">
                                        {tg}
                                        <button className='ml-2 ' onClick={() => handleTagRemoval(tg)}><img className='w-3 h-3' src={XXX} alt="s" /></button>
                                    </div>
                                ))
                            }
                            <button className='absolute bottom-[112px] right-[18px] text-xl text-zinc-400' onClick={handleCopy}><FaRegCopy /></button>
                            <button className='absolute bottom-[110px] right-[50px] text-2xl text-zinc-400' onClick={TagRemove}><RiDeleteBin2Line/></button>
                        </div>
                    </div>
                </div>

                {/*  */}
                {/* <form className=' w-full   flex flex-row gap-7   ' onSubmit={ImageHaendlear}>
                            <label className='flex flex-col gap-1 w-full text-lg text-gray-600 ' >Name:
                                <input className='px-3 py-1 rounded-3xl border-2 border-gray-300' onChange={e => setName(e.target.value)} type="text" name='name' />
                            </label>
                            <label htmlFor="" className='flex flex-col gap-1 w-full text-lg text-gray-600 '>Add teg:
                                <input className='px-3 py-1 rounded-3xl border-2 border-gray-300' onChange={e => setAddTag(e.target.value)} type="text" name="add_tage" id="" />
                            </label>
                            <button className='w-full bg-cyan-600 text-white rounded-3xl  text-lg h-10  mt-8' >Add Image</button>
                        </form> */}
            </div>
        </div>
    )
}

export default AdminPage
