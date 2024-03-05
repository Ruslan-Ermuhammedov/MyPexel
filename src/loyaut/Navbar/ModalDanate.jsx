import { useContext } from "react";
import { StateContext } from "../../App";
import FileUpload from "./FileUpload";

export default function ModalDanate({ danateModal, setDanateModal }) {
  const { setInputt } = useContext(StateContext)
  const calseHeandlear = () => {
    setInputt(false)
    setDanateModal(false)
  }
  return (
    <>

      {danateModal ? (
        <div>

          <div
            className="justify-center  bg-black bg-opacity-50 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className=" bg-white w-[1000px]  max-h-[600px] rounded-xl flex flex-col  ">

              <button onClick={calseHeandlear} className=" text-2xl  ml-[960px] mt-5 font-mono "><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12.7275" width="3" height="18" transform="rotate(45 12.7275 0)" fill="#828FA3" />
                <rect y="2.12132" width="3" height="18" transform="rotate(-45 0 2.12132)" fill="#828FA3" />
              </svg> </button>
              <div>
                <FileUpload />
              </div>
            </div>

          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
}

/*
// /boards
// {
    boardName:"Milli uz",
// columns:[
// {columnName:"Todo",id:1},
// {columnName:"Doing",id:2},
// {columnName:"Done",id:3},

// ]
id:1
}


*/