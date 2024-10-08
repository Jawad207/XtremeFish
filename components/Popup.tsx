import { X } from "lucide-react";
import { useState } from "react";
import { createUrl, createPost, updatePost, updateUrl } from "@/shared/Api/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { title } from "process";
const Popup = ({
  postPopup,
  isOpen,
  onClose,
  post,
  urls,
  setUrls,
  setPost,
  val,
  setVal,
  updateId,
  descVal,
  setDescVal,
  setUpdate,
}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const [validUrl, setValidUrl] = useState(false);
  if (!isOpen) return null;
  const handleSubmitPost = () => {
    if (post?.length) {
      setPost([...post, val]);
    } else {
      setPost([val]);
    }
    if (updateId) {
      updatePost(
        {
          title:val,
          description: descVal,
          userId: user?._id,
          id: updateId,
        },
        dispatch
      );
    } else {
      createPost(
        { title:val, description: descVal, userId: user?._id },
        dispatch
      );
    }
    onClose();
    setVal("");
    setDescVal("");
    setUpdate("");
  };

  const handleChangePost = (e: any) => {
    setVal(e.target.value);
  };
  const handleChangePostDesc = (e: any) => {
    setDescVal(e.target.value);
  };
  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescVal(e.target.value); // Update URL input state
  };

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true; // URL is valid
    } catch (error) {
      return false; // URL is invalid
    }
  };

  const handleSubmitUrl = () => {
    console.log("val and other data", descVal, isValidUrl(descVal));
    if (isValidUrl(descVal)) {
      // Append to the list of URLs
      setUrls((prevUrls: any) => [...(prevUrls || []), descVal]);

      // Handle update or create
      const urlData = {
        description: descVal,
        userId: user?._id,
        id: updateId,
      };

      if (updateId) {
        updateUrl(urlData, dispatch);
      } else {
        createUrl(urlData, dispatch);
      }

      // Close modal and reset form fields
      onClose();
      setDescVal("");
      setUpdate("");
      setValidUrl(false); // Reset URL validation status
    } else {
      setValidUrl(true); // Trigger an invalid URL message or state
      console.log("Invalid URL entered");
    }
  };

  return (
    <>
      {postPopup?(
        <div className="fixed inset-0 bg-['rgba(0, 0, 0, 0.5)'] bg-opacity-30 backdrop-blur-sm z-10 w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-2/4 mt-2">
            <button 
            onClick={()=>{
              onClose();
              setVal("");
              setDescVal("");
            }} className="cursor-pointer place-self-end">
              <X />
            </button>
            <div className="bg-[#473d3d] w-full px-5 py-10 rounded-lg flex flex-col justify-center items-center gap-3 text-center">
              <p className="text-black">Your post will be submitted</p>
              <input
                type="text"
                className="bg-white rounded-sm px-2 py-1 w-4/5"
                placeholder="title"
                value={val}
                onChange={(e) => {
                  handleChangePost(e);
                }}
              />
              <input
                type="text"
                className="bg-white rounded-sm px-2 py-1 w-4/5"
                placeholder="description"
                value={descVal}
                onChange={(e) => {
                  handleChangePostDesc(e);
                }}
              />
              <button
                onClick={handleSubmitPost}
                className="text-xs p-2 rounded-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-bl"
              >
                Submit Post
              </button>
            </div>
          </div>
        </div>
  ):(
      <div className="fixed inset-0 bg-['rgba(0, 0, 0, 0.5)'] bg-opacity-30 backdrop-blur-sm z-10 w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-2/4 mt-2">
            <button 
              onClick={()=>{
                onClose();
                setDescVal("");
              }} 
              className="cursor-pointer place-self-end">
              <X />
            </button>
            <div className="bg-[#473d3d] w-full px-5 py-10 rounded-lg flex flex-col justify-center items-center gap-3 text-center">
              <input
                type="text"
                className="bg-white rounded-sm px-2 py-1 w-4/5 placeholder:text-xs"
                placeholder="Enter URL"
                value={descVal} // Use val for the URL input
                onChange={handleChangeUrl}
              />
              {validUrl && (
                <p className="text-red-400 text-[15px]">Not a valid URL</p>
              )}
              <button
                onClick={handleSubmitUrl}
                className="text-xs p-2 rounded-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-bl"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
