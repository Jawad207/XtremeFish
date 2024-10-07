import { X } from "lucide-react";
import { useState } from "react";
import { createPost, updatePost } from "@/shared/Api/dashboard";
import { useDispatch, useSelector } from "react-redux";
const Popup = ({
  isOpen,
  onClose,
  post,
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
          title: val,
          description: descVal,
          userId: user?._id,
          id: updateId,
        },
        dispatch
      );
    } else {
      createPost(
        { title: val, description: "testing", userId: user?._id },
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
  return (
    <div className="fixed inset-0 bg-['rgba(0, 0, 0, 0.5)'] bg-opacity-30 backdrop-blur-sm z-10 w-full h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-2/4 mt-2">
        <button onClick={onClose} className="cursor-pointer place-self-end">
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
            className="text-xs p-2 rounded-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "
          >
            Submit Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
