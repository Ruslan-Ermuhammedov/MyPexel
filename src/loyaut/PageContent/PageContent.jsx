// import Modal from "../../components/Modal"
import { useContext, useEffect, useState } from "react";
import { useDonateImagesQuery, useFilterdonateImagesQuery } from "../../services/imageDonate";
import DonateImagesCard from "./DonateImagesCard";
import EmptyContent from "./EmptyContent"
import { StateContext } from "../../App";
import { baseUrl } from "../../constants/baseUrl";
import axios from "axios";

function PageContent() {
    const { setUrl, filterDonate, setFilterDonate,chexbox, setChexbox } = useContext(StateContext)
    const { data: donateImage, isSuccess: isSuccessDonateImage, isLoading: isLoadingDonateImage } = useFilterdonateImagesQuery(filterDonate);
    // console.log(donateImage)
    // const [imgIdAll, setImgIdAll] = useState([]);
    // useEffect(() => {
    //     if (chexbox !== null) {
    //         setImgIdAll(prevImgIdAll => [...prevImgIdAll, chexbox]);
    //     }
    // }, [chexbox]);
    // const DownloadAll = () => {
    //     function downloadSelectedImages() {
    //         fetch(`${baseUrl}download-donated/`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ image_ids: imgIdAll })
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (data.success) {
    //                     // Redirect or handle the download link as needed
    //                     window.location.href = data.success;
    //                 } else {
    //                     console.error('Error downloading images:', data.error);
    //                     // Handle error, display message to user, etc.
    //                 }
    //             })
    //             .catch(error => console.error('Error downloading images:', error));
    //     }
    //     downloadSelectedImages()
    // }
    // const DeleteImages = () => {
    //     function Delete() {
    //         fetch(`${baseUrl}donate-png/`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ image_ids: imgIdAll })
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 window.location.reload();

    //                 // if (data.success) {
    //                 //     // Redirect or handle the download link as needed
    //                 //     window.location.href = data.success;
    //                 // } else {
    //                 //     console.error('Error downloading images:', data.error);
    //                 //     // Handle error, display message to user, etc.
    //                 // }
    //             })
    //             .catch(error => console.error('Error delete images:', error));
    //     }
    //     Delete()
    // }

    return (
        <main className=' shadow-sm  shadow-zinc-300  dark:bg-black-900 w-full flex-1    bg-[#F4F7FD]'>
            {
                !isSuccessDonateImage && isLoadingDonateImage &&
                <EmptyContent />

            }
            {/* <button onClick={DownloadAll} className=" p-4 bg-blue-500 rounded-xl">Download </button>
            <button onClick={DeleteImages} className=" p-4 bg-blue-500 rounded-xl ml-4">Delete </button> */}
            {isLoadingDonateImage && <h1>Loading...</h1>}
            <div className=" grid grid-cols-4 w-full px-20 py-8 gap-4  ">
                {
                    isSuccessDonateImage && donateImage?.All_Donated.map((donateImage) => (
                        <DonateImagesCard image={donateImage} key={donateImage.id} />
                    ))
                }
            </div>


        </main>
    )
}

export default PageContent
