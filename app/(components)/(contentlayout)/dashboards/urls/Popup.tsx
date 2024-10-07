import { X } from "lucide-react";
import { useState } from "react";
import { createUrl, updateUrl } from "@/shared/Api/dashboard";
import { useDispatch, useSelector } from "react-redux";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  urls: string[]; // Explicitly defining urls as a string array
  setUrls: any;
  val: string;
  setVal: (val: string) => void;
  updateId?: string;
  descVal: string;
  setDescVal: (descVal: string) => void;
  setUpdate: (update: string) => void;
}

const Popup: React.FC<PopupProps> = ({
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
}) => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const [validUrl, setValidUrl] = useState(false);

  if (!isOpen) return null;

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true; // URL is valid
    } catch (error) {
      return false; // URL is invalid
    }
  };

  const handleSubmitUrl = () => {
    console.log("val and other data", val, isValidUrl(val));
    if (isValidUrl(val)) {
      // Append to the list of URLs
      setUrls((prevUrls: any) => [...(prevUrls || []), val]);

      // Handle update or create
      const urlData = {
        description: val,
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
      setVal("");
      setDescVal("");
      setUpdate("");
      setValidUrl(false); // Reset URL validation status
    } else {
      setValidUrl(true); // Trigger an invalid URL message or state
      console.log("Invalid URL entered");
    }
  };

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value); // Update URL input state
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
            placeholder="Enter URL"
            value={val} // Use val for the URL input
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
  );
};

export default Popup;
