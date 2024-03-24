import { useContext, useEffect, useState } from "react"
import MainIcon from "../../assets/icons/mainIcon.svg"
import { StateContext } from "../../App"
import { baseUrl } from "../../constants/baseUrl";
import { useFilterdonateImagesQuery } from "../../services/imageDonate";
function Header() {
const {chexbox, setChexbox,filterDonate}=useContext(StateContext)
const [allIdTrue, setAllIdTrue] = useState(false);
const { data: donateImage, isSuccess: isSuccessDonateImage, isLoading: isLoadingDonateImage } = useFilterdonateImagesQuery(filterDonate);

const handleGetAllIds = () => {
    const allIds = donateImage.All_Donated.map(image => image.id);
    setImgIdAll(allIds);
    setAllIdTrue(true)
};
    const [imgIdAll, setImgIdAll] = useState([]);
    useEffect(() => {
        if (chexbox !== null) {
            setImgIdAll(prevImgIdAll => [...prevImgIdAll, chexbox]);
        }
    }, [chexbox]);
    const DownloadAll = () => {
        function downloadSelectedImages() {
            fetch(`${baseUrl}download-donated/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image_ids: imgIdAll })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Redirect or handle the download link as needed
                        window.location.href = data.success;
                    } else {
                        console.error('Error downloading images:', data.error);
                        // Handle error, display message to user, etc.
                    }
                })
                .catch(error => console.error('Error downloading images:', error));
        }
        downloadSelectedImages()
    }
    const DeleteImages = () => {
        function Delete() {
            fetch(`${baseUrl}donate-png/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image_ids: imgIdAll })
            })
                .then(response => response.json())
                .then(data => {
                    window.location.reload();

                    // if (data.success) {
                    //     // Redirect or handle the download link as needed
                    //     window.location.href = data.success;
                    // } else {
                    //     console.error('Error downloading images:', data.error);
                    //     // Handle error, display message to user, etc.
                    // }
                })
                .catch(error => console.error('Error delete images:', error));
        }
        Delete()
    }
  return (
    <header className='   py-7 shadow-sm  shadow-zinc-300 px-6 items-center flex justify-between w-full'>
        <h1 className= "text-gray-500 text-xl font-bold ">Mening ishim Mening orzularim</h1>
        <div className=" flex items-center gap-5">
          <h1 className="text-green-400">{allIdTrue ? "All Id " :"" }</h1>
          <button  onClick={handleGetAllIds}  className="w-44 bg-[#58ff71] p-3  text-white text-sm rounded-full"> Select All</button>
          <button  onClick={DeleteImages}  className="w-44 bg-[#ff6969] p-3  text-white text-sm rounded-full"> All Remove</button>
          <button onClick={DownloadAll} className="w-44 bg-[#6999ff] p-3  text-white text-sm rounded-full"> All Download</button>
          {/* <img className="bg-white" src={MainIcon} alt="" /> */}
        </div>
      
    </header>
  )
}

export default Header
