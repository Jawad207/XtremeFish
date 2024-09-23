import { X } from 'lucide-react';
import { useState } from 'react';



const Popup = ({ isOpen, onClose, newPost, setNewPost }:any) => {
  const [val, setVal] = useState('')
    if (!isOpen) return null;
    const handleSubmitPost=()=>{
      setNewPost([...newPost,{val}])
      console.log(newPost)
    }

    const handleChange = (e:any)=>{
      setVal(e.target.value)
    }
    return (
      <div className="fixed inset-0 bg-['rgba(0, 0, 0, 0.5)'] bg-opacity-30 backdrop-blur-sm z-10 w-full h-full flex justify-center items-center">
        <form onSubmit={()=>{handleSubmitPost()}} className='flex flex-col justify-center items-center w-2/4 mt-2'>
          <button onClick={onClose} className="cursor-pointer place-self-end"><X/></button>
          <div className="bg-[#473d3d] w-full px-5 py-10 rounded-lg flex flex-col justify-center items-center gap-3 text-center">
            <p className="text-black">Your post will be submitted</p>
            <input type="text" className='bg-white rounded-sm px-2 py-1 w-4/5' placeholder='Description' value={val} onChange={(e)=>{handleChange(e)}}/>
            <button type='submit'className='text-xs p-2 rounded-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>Submit Post</button>
          </div> 
        </form>
      </div>
    );
  };
  
  export default Popup;
  