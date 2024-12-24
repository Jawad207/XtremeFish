"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  createUrl,
  createPost,
  updatePost,
  updateUrl,
  createIp,
} from "@/shared/Api/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "@/shared/Api/auth";

const Popup = ({
  ipPopup,
  postPopup,
  isOpen,
  onClose,
  val,
  ipVal,
  setIpVal,
  setVal,
  updateId,
  descVal,
  setDescVal,
  setUpdate,
  ipBlock,
  usermanagment,
  userValue,
  setUserValue,
}: any) => {
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.auth.user);
  const [validUrl, setValidUrl] = useState(false);

  useEffect(() => {
    console.log("user in here");
    setUserValue({
      userName: user?.userName,
      email: user?.email,
      password: "",
    });
  }, [user]);

  if (!isOpen) return null;

  const handleSubmitPost = () => {
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
        { title: val, description: descVal, userId: user?._id },
        dispatch
      );
    }
    onClose();
    setVal("");
    setDescVal("");
    setUpdate("");
  };

  const updateUser = async () => { //complete this function hint:  =====> think about payload
    const userPayload = {
      userName: userValue?.userName,

    }
    const response = await editProfile(userPayload, dispatch);
  }

  const handleChangePost = (e: any) => {
    setVal(e.target.value);
  };
  const handleChangePostDesc = (e: any) => {
    setDescVal(e.target.value);
  };
  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescVal(e.target.value);
  };
  const handleChangeIp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIpVal(e.target.value);
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

      onClose();
      setDescVal("");
      setUpdate("");
      setValidUrl(false); // Reset URL validation status
    } else {
      setValidUrl(true); // Trigger an invalid URL message or state
      console.log("Invalid URL entered");
    }
  };
  const handleSubmitIp = () => {
    createIp({ blockerId: user?._id, ip: ipVal }, dispatch);
    onClose();
    setIpVal("");
  };

  return (
    <>
      {postPopup ? (
        <div className="fixed inset-0 bg-['rgba(0, 0, 0, 0.5)'] bg-opacity-30 backdrop-blur-sm z-10 w-full h-screen flex justify-center items-center">
          <div className="flex flex-col items-center w-[500px] mt-2">
            <button
              title="close"
              onClick={() => {
                onClose();
                setVal("");
                setDescVal("");
              }}
              className=""
            >
              <X className="rounded-md hover:bg-[#4f5763] relative left-[230px] top-[32px]" />
            </button>
            <div className="bg-[#12111d] w-full py-10 rounded-md flex flex-col justify-center items-center gap-4 text-center">
              <p className="text-lg font-bold">Add New News</p>
              <input
                type="text"
                className="form-control rounded-md px-2 py-2 w-4/5"
                placeholder="title"
                value={val}
                onChange={(e) => {
                  handleChangePost(e);
                }}
              />
              <input
                type="text"
                className="form-control rounded-md px-2 py-2 w-4/5"
                placeholder="description"
                value={descVal}
                onChange={(e) => {
                  handleChangePostDesc(e);
                }}
              />
              <button
                onClick={handleSubmitPost}
                className="text-sm font-semibold px-5 py-2 rounded-md bg-[#1c64f2] hover:bg-gradient-to-bl"
              >
                Submit post
              </button>
            </div>
          </div>
        </div>
      ) : ipPopup ? (
        <div className="fixed inset-0 bg-['rgba(0, 0, 0, 0.5)'] bg-opacity-30 backdrop-blur-sm z-10 w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-[500px] mt-2">
            <button
              title="close"
              onClick={() => {
                onClose();
                setIpVal("");
              }}
              className=""
            >
              <X className="rounded-md hover:bg-[#4f5763] relative left-[230px] top-[32px]" />
            </button>
            <div className="bg-[#12111d] w-full py-20 rounded-lg flex flex-col justify-center items-center gap-4 text-center">
              <input
                type="text"
                className="form-control rounded-md px-2 py-2 w-4/5"
                placeholder="Enter IP"
                value={ipVal} // Use val for the URL input
                onChange={handleChangeIp}
              />
              {/* {validUrl && (
                <p className="text-red-400 text-[15px]">Not a valid URL</p>
                )} */}
              <button
                onClick={handleSubmitIp}
                className="text-sm font-semibold px-5 py-2 rounded-md bg-[#1c64f2] hover:bg-gradient-to-bl"
              >
                Block IP
              </button>
              <div className="flex flex-col gap-4 w-full">
                <p>Range IPs</p>
                <div className="d-flex gap-3 flex-col justify-center items-center">
                  <input
                    type="text"
                    placeholder="Start Range (e.g., 90.201.1.1)"
                    // value={startRange}
                    // onChange={(e) => setStartRange(e.target.value)}
                    className="form-control rounded-md px-2 py-2 w-4/5"
                  />
                  <input
                    type="text"
                    placeholder="End Range (e.g., 90.201.999.999)"
                    // value={endRange}
                    // onChange={(e) => setEndRange(e.target.value)}
                    className="form-control rounded-md px-2 py-2 w-4/5"
                  />
                </div>
                <div>
                  <button
                    // onClick={blockIpRange}
                    className="text-sm font-semibold px-5 py-2 rounded-md bg-[#1c64f2]
                      hover:bg-gradient-to-bl"
                  >
                    Block Range
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : ipBlock ? (
        <div className="fixed inset-0 bg-['rgba(0, 0, 0, 0.5)'] bg-opacity-30 backdrop-blur-sm z-10 w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-[500px] mt-2">
            <button
              title="close"
              onClick={() => {
                onClose();
              }}
              className="cursor-pointer"
            >
              <X className="rounded-md hover:bg-[#4f5763] relative left-[230px] top-[32px]" />
            </button>
            <div className="bg-[#12111d] w-full py-10 px-5 rounded-lg flex flex-col justify-center items-center text-center text-lg text-red-400 font-semibold">
              Access Denied: This user has been blocked.
            </div>
          </div>
        </div>
      ) : usermanagment ? (
        <div className="fixed inset-0 bg-['rgba(0, 0, 0, 0.5)'] bg-opacity-30 backdrop-blur-sm z-10 w-full h-screen flex justify-center items-center">
          <div className="flex flex-col items-center w-[500px] mt-2">
            <button
              title="close"
              onClick={() => {
                onClose();
                setVal("");
                setDescVal("");
              }}
              className=""
            >
              <X className="rounded-md hover:bg-[#4f5763] relative left-[230px] top-[32px]" />
            </button>
            <div className="bg-[#12111d] w-full py-10 rounded-md flex flex-col justify-center items-center gap-4 text-center">
              <p className="text-lg font-bold">Edit User</p>
              <input
                type="text"
                className="form-control rounded-md px-2 py-2 w-4/5"
                placeholder="User Name"
                value={userValue?.userName}
                onChange={(e) => {
                  setUserValue({ ...userValue, userName: e.target.value });
                }}
              />
              <input
                type="email"
                className="form-control rounded-md px-2 py-2 w-4/5"
                placeholder="Email"
                value={userValue?.email}
                onChange={(e) => {
                  setUserValue({ ...userValue, email: e.target.value });
                }}
              />
              <input
                type="text"
                className="form-control rounded-md px-2 py-2 w-4/5"
                placeholder="Password"
                value={userValue?.password}
                onChange={(e) => {
                  setUserValue({ ...userValue, password: e.target.value });
                }}
              />
              <button
                // onClick={handleSubmitPost}
                className="text-sm font-semibold px-5 py-2 rounded-md bg-[#1c64f2] hover:bg-gradient-to-bl"
              >
                UpdateUser
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-['rgba(0, 0, 0, 0.5)'] bg-opacity-30 backdrop-blur-sm z-10 w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-[500px] mt-2">
            <button
              title="close"
              onClick={() => {
                onClose();
                setDescVal("");
              }}
              className="cursor-pointer"
            >
              <X className="rounded-md hover:bg-[#4f5763] relative left-[230px] top-[32px]" />
            </button>
            <div className="bg-[#12111d] w-full py-20 rounded-lg flex flex-col justify-center items-center gap-4 text-center">
              <input
                type="text"
                className="form-control rounded-md px-2 py-2 w-4/5"
                placeholder="Enter URL"
                value={descVal} // Use val for the URL input
                onChange={handleChangeUrl}
              />
              {validUrl && (
                <p className="text-red-400 text-[15px]">Not a valid URL</p>
              )}
              <button
                onClick={handleSubmitUrl}
                className="text-sm font-semibold px-5 py-2 rounded-md bg-[#1c64f2] hover:bg-gradient-to-bl"
              >
                Submit URL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
