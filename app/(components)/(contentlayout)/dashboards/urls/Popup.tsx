import { X } from "lucide-react";
import { useState } from "react";
import { createUrl, updateUrl } from "@/shared/Api/dashboard";
import { useDispatch, useSelector } from "react-redux";
const Popup = ({
  isOpen,
  onClose,
  urls,
  setUrls,
  val,
  setVal,
  updateId,
  descVal,
  setDescVal,
  setUpdate,
}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  if (!isOpen) return null;
  const handleSubmitUrl = () => {
    if (urls?.length) {
      setUrls([...urls, val]);
    } else {
      setUrls([val]);
    }
    if (updateId) {
      updateUrl(
        {
          title: val,
          description: descVal,
          userId: user?._id,
          id: updateId,
        },
        dispatch
      );
    } else {
      createUrl(
        { title: val, description:descVal, userId: user?._id },
        dispatch
      );
    }
    onClose();
    setVal("");
    setDescVal("");
    setUpdate("");
  };

  const handleChangeUrlPageName = (e: any) => {
    setVal(e.target.value);
  };
  const handleChangeUrl = (e: any) => {
    setDescVal(e.target.value);
  };
  return (
    <div className="fixed inset-0 bg-['rgba(0, 0, 0, 0.5)'] bg-opacity-30 backdrop-blur-sm z-10 w-full h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-2/4 mt-2">
        <button onClick={onClose} className="cursor-pointer place-self-end">
          <X />
        </button>
        <div className="bg-[#473d3d] w-full px-5 py-10 rounded-lg flex flex-col justify-center items-center gap-3 text-center">
          <input
            type="text"
            className="bg-white rounded-sm px-2 py-1 w-4/5 placeholder:text-xs"
            placeholder="Page Name"
            value={val}
            onChange={(e) => {
              handleChangeUrlPageName(e);
            }}
          />
          <input
            type="text"
            className="bg-white rounded-sm px-2 py-1 w-4/5 placeholder:text-xs"
            placeholder="Enter Url"
            value={descVal}
            onChange={(e) => {
              handleChangeUrl(e);
            }}
          />
          <button
            onClick={handleSubmitUrl}
            className="text-xs p-2 rounded-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-bl"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
