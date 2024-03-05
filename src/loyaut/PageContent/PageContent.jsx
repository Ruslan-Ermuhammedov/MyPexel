// import Modal from "../../components/Modal"
import { useDonateImagesQuery } from "../../services/imageDonate";
import EmptyContent from "./EmptyContent"

function PageContent() {
    const { data: donateImage, isSuccess: isSuccessDonateImage, isLoading: isLoadingDonateImage } = useDonateImagesQuery();
    console.log(donateImage?.All_Donated)
    return (
        <main className=' shadow-sm  shadow-zinc-300  dark:bg-black-900 w-full flex-1    bg-[#F4F7FD]'>
            {/* <EmptyContent /> */}
            {isLoadingDonateImage && <h1>Loading...</h1>}
            <div className=" grid grid-cols-4 w-full px-20 py-6 gap-4  ">
                {
                    isSuccessDonateImage && donateImage?.All_Donated.map((donateImage) => (
                        <div className=" w-full h-80 rounded-2xl " key={donateImage?.id}>
                            <img src={donateImage?.donated_imgs} alt="" />
                        </div>
                    ))
                }
            </div>


        </main>
    )
}

export default PageContent
