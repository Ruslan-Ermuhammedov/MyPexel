
import React, { useState } from 'react';
import { useAddDonateImageMutation } from '../../services/imageDonate';
import SuccesErrorModal from '../../pages/Login/SuccesErrorModal';

const FileUpload = () => {
  const [files, setFiles] = useState({});
  const [files2, setFiles2] = useState([]);
  // console.log(files2)
  const [isOverlayDraggedOver, setIsOverlayDraggedOver] = useState(false);

  const addFile = (file) => {

    setFiles2(file.name)
    const isImage = file.type.match('image.*');
    const objectURL = URL.createObjectURL(file);

    setFiles((prevFiles) => ({ ...prevFiles, [objectURL]: { file, url: objectURL } }));

    if (isImage) {
      // console.log(objectURL);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsOverlayDraggedOver(false);

    for (const file of event.dataTransfer.files) {
      addFile(file);
    }
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsOverlayDraggedOver(true);
  };

  const handleDragLeave = () => {
    setIsOverlayDraggedOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    for (const file of event.target.files) {
      addFile(file);
    }
  };

  const handleFileDelete = (objectURL) => {
    setFiles((prevFiles) => {
      const updatedFiles = { ...prevFiles };
      delete updatedFiles[objectURL];
      return updatedFiles;
    });
  };
  const [uploadImages] = useAddDonateImageMutation();
const [success,setSuccess]=useState(null)
  const handleSubmit = async () => {
    const formData = new FormData();
  
    // Append each selected file to FormData
    Object.values(files).forEach((fileObj) => {
      formData.append('donated_imgs', fileObj.file);
    });
  
    try {
      // Use the uploadImages mutation
      const { data, error, status } = await uploadImages(formData);
      setSuccess(data.message)
      setFiles({})
      setFiles([])
    } catch (error) {
      // console.error('Error during fetch:', error);
      // console.error('Error object:', error);
    }
  };
  
  const handleCancel = () => {
    setFiles({});
  };
  // console.log(success)
  const [imghover, setImgHover] = useState(false)
  return (
    <div className=" h-[565px] w-full ">
      <SuccesErrorModal success={success} setSuccess={setSuccess}/>
      <main className=" mx-auto max-w-screen-lg h-full">
        <article
          aria-label="File Upload Modal"
          className={`relative h-full flex flex-col bg-white shadow-xl rounded-md ${isOverlayDraggedOver ? 'draggedover' : ''
            }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnter={handleDragEnter}
        >
          <section className="h-full overflow-auto p-8 w-full  flex flex-col">
            <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
              <p className="mb-3 font-semibold text-gray-400 flex flex-wrap justify-center">
                <span>Drag and drop your </span>&nbsp;<span> files anywhere or</span>
              </p>
              <input
                id="hidden-input"
                type="file"
                multiple
                className="hidden"
                onChange={handleInputChange}
              />
              <button
                id="button"
                className="mt-2 rounded-sm px-3 py-1 bg-[#7ce183] text-white hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                onClick={() => document.getElementById('hidden-input').click()}
              >
                Upload a file
              </button>
            </header>
            <h1 className=' mt-5 text-xs m-auto text-gray-400'>Mypexel does not utilize the submitted PNG images for commercial purposes and ensures the protection of content rights.</h1>

            {
              Object.entries(files).length ?
                <h1 className="pt-5 pb-5 font-semibold sm:text-lg text-gray-900 m-auto" >Your images </h1>
                : <h1></h1>
            }

            <ul className="flex flex-wrap h-[400px] overflow-auto">
              {Object.entries(files).map(([objectURL, { file, url }]) => (
                <li
                  key={objectURL}
                  className="box-border w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-1/2 p-2"
                >
                  <article
                    tabIndex="0"
                    className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 cursor-pointer shadow-sm"
                  >
                    <img
                      alt="upload preview"
                      className="img-preview w-full h-full object-cover rounded-md bg-fixed"
                      src={url}
                    />
                    <section
                      onMouseEnter={() => setImgHover(objectURL)}
                      onMouseLeave={() => setImgHover(null)}
                      className={`flex flex-col text-white hover:bg-[#08080850]  hover:text-white  rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3`}
                    >
                      <h1 className={`flex-1 ${imghover === objectURL ? "" : "hidden"}`}>
                        {file.name.slice(0, 14)}...
                      </h1>
                      <div className={`flex ${imghover === objectURL ? "" : "hidden"}`}>
                        <span className="p-1 ">
                          <i>
                            <svg
                              className="fill-current w-5 h-5 ml-auto pt-1"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                            </svg>
                          </i>
                        </span>
                        <p className="p-1 size text-xs ">
                          {file.size > 1024
                            ? file.size > 1048576
                              ? Math.round(file.size / 1048576) + 'mb'
                              : Math.round(file.size / 1024) + 'kb'
                            : file.size + 'b'}
                        </p>
                        <button
                          className="delete ml-auto focus:outline-none  hover:bg-[#05050561] p-1 rounded-md "
                          onClick={() => handleFileDelete(objectURL)}
                        >
                          <svg
                            className="pointer-events-none fill-current w-4 h-4 ml-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              className="pointer-events-none"
                              d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                            />
                          </svg>
                        </button>
                      </div>
                    </section>
                  </article>
                </li>
              ))}
            </ul>

            {Object.entries(files).length === 0 ? (
              <li
                id="empty"
                className="h-full w-full text-center flex flex-col  justify-center items-center"
              >
                <img
                  className="mx-auto w-32"
                  src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                  alt="no data"
                />
                <span className="text-small text-gray-500">
                  No files selected
                </span>
              </li>
            ) : <h1></h1>}
            <footer className="flex justify-end  pb-8 pt-4">
              <button
                id="submit"
                className="rounded-sm px-3 py-1 bg-[#6999ff] hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none outline-none focus:ring-4 shadow-lg transform active:scale-90"
                onClick={handleSubmit}
              >
                Upload now
              </button>
              <button
                id="cancel"
                className={`ml-3 rounded-sm px-6 py-1 border  ${Object.entries(files).length === 0 ? "text-gray-400" : 'text-balck'} hover:bg-gray-300  focus:shadow-outline focus:outline-none`}
                onClick={handleCancel}
              >
                Remove
              </button>
            </footer>
          </section>
        </article>
      </main>
    </div>
  );
};

export default FileUpload;
