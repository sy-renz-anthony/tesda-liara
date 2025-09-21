import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

import axiosInstance from '../axiosConfig.js'

export default function Modal({ isOpen, onClose}) {
  const navigate = useNavigate();
  
  if (!isOpen) 
    return null;


  const handleLogout = async (e) => {
        e.preventDefault();
        try {
        const response = await axiosInstance.post("/staff/logout", {}, {withCredentials: true});
        if(!response.data.success){
            toast.error(response.data.message);
        }else{
            toast.success(response.data.message);
        }

        } catch (err) {
            console.error("Login error:", err.message);
        }

        navigate("/logout");
    };

  return (
    <div className="fixed inset-0  w-scree h-full flex items-center justify-center z-50">
    <div className="fixed top-0 left-0 w-screen h-full bg-gray-700 opacity-50"></div>
        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-2 right-5 text-gray-600 hover:text-black text-xl active:bg-red-700 active:text-white hover:bg-orange-600 hover:text-white w-auto h-auto px-2"
          >
            &times;
          </button>
          <h1 className="mx-5 my-5 font-bold text-gray-800 text-lg transition-all duration-500 ease-linear">Are you sure you want to Logout?</h1>
          <hr />
          <button className="relative top-3 w-20 self-center bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200" onClick={(e)=>handleLogout(e)}>Yes</button>
        </div>
    </div>
  );
}