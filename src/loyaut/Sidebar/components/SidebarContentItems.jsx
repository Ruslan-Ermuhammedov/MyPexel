
import { useContext, useRef, useState } from 'react'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { useDonateImagesQuery, useFilterdonateImagesQuery } from '../../../services/imageDonate'
import { StateContext } from '../../../App'


function SidebarContentItems() {
    const {setUrl,filterDonate, setFilterDonate}=useContext(StateContext)

    const filterRef = useRef()
    const filterHentlear = (e) => {
        e.preventDefault();
        setFilterDonate(filterRef.current.value)
    }
    // console.log(filterDonate)
    // const { data: donateImage, isSuccess: isSuccessDonateImage, isLoading: isLoadingDonateImage } = useFilterdonateImagesQuery(filterDonate);
    // console.log(donateImage)

    return (
        <div className=' pt-6  w-full'>
            <form onSubmit={filterHentlear} className=' flex flex-col gap-3 p-5'>
                <input ref={filterRef} type="date" className=' rounded-lg border border-black bg-gray-100 px-3 py-2' />
                <button type="submit" style={{ background: 'linear-gradient(237.21deg, #00FFB3 0.76%, #6DC7F9 89.43%)' }} className=' cursor-pointer text-white px-5 py-1 rounded-md w-36 m-auto'>Filter</button>
            </form>

        </div>
    )
}
export default SidebarContentItems
