import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { toast } from 'react-toastify';

import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LogoutModal from "../components/LogoutConfirmModal";

const UpdateAccount = () => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [data, setData]  = useState({});
  
  const navigate= useNavigate();

  useEffect(()=>{
    async function reloadData(){
      try {
        const response = await axiosInstance.get("/staff/my-info", {}, {withCredentials: true});
        if(!response.data.success){
              toast.error(response.data.message);
        }else{
            setData(response.data.data);
        }

      } catch (err) {
          console.error("Account Data retrieval error:", err.message);
      }
    }
    
    reloadData();
  }, []);
  
  
  const handleSubmit= async(e) =>{
    try {
        const response = await axiosInstance.put("/staff/update-my-account", data, {withCredentials: true});
        if(!response.data.success){
            toast.error(response.data.message);
        }else{
            toast.success("Personal Information updated successfully!");
            navigate("/my-account");
        }

    } catch (err) {
      console.error("Account update error:", err.message);
    }
  }

  const logoutEventHandler=()=>{
    setIsLogoutModalVisible(true);
  }
  return (
    <div className="flex flex-col w-fit min-w-screen min-h-screen bg-gray-300">
        <div className="flex flex-row w-full h-auto min-h-140 m-0 p-0">
            <NavBar logoutEventHandler={logoutEventHandler}/>
            <div className="flex flex-col w-fit lg:w-full h-auto">
                <Header pageName="My Account"/>
                <div className="w-auto h-auto my-10 mx-3 md:mx-10 bg-white shadow round-2xl">
{/* -----------------------------------------------------------------------------------------------*/}
                <div className="flex flex-col w-full h-fit px-5 py-5">
                  <h1 className='text-xl font-bold my-5'>Update My Personal Info</h1>
                  <hr />
                  <form action={handleSubmit} className="p-8 w-full" >
                      <div className="flex flex-col md:flex-row mx-auto w-full h-auto gap-0 md:gap-5 md:items-center py-3">
                      <label className="text-gray-600 mb-1 w-30" htmlFor="employeeID">
                        Employee ID#:
                      </label>
                      <input
                        id="emplyeeID"
                        type="text"
                        className="w-80 md:w-100 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={data.employeeID}
                        onChange={(e) =>{setData(prevData=>({
                          ...prevData,
                          "employeeID": e.target.value
                        }))}}
                        required
                      />
                      </div>

                      <div className="flex flex-col md:flex-row w-full mx-auto h-auto gap-0 md:gap-5 md:items-center py-3">
                      <label className="text-gray-600 mb-1 w-30" htmlFor="firstName">
                        First Name:
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        className="w-80 md:w-100 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={data.firstName}
                        onChange={(e) =>{setData(prevData=>({
                          ...prevData,
                          "firstName": e.target.value
                        }))}}
                        required
                      />
                      </div>

                      <div className="flex flex-col md:flex-row w-full mx-auto h-auto gap-0 md:gap-5 md:items-center py-3">
                      <label className="text-gray-600 mb-1 w-30" htmlFor="middleName">
                        Middle Name:
                      </label>
                      <input
                        id="middleName"
                        type="text"
                        className="w-80 md:w-100 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={data.middleName}
                        onChange={(e) =>{setData(prevData=>({
                          ...prevData,
                          "middleName": e.target.value
                        }))}}
                        required
                      />
                      </div>

                      <div className="flex flex-col md:flex-row w-full mx-auto h-auto gap-0 md:gap-5 md:items-center py-3">
                      <label className="text-gray-600 mb-1 w-30" htmlFor="lastName">
                        Last Name:
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        className="w-80 md:w-100 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={data.lastName}
                        onChange={(e) =>{setData(prevData=>({
                          ...prevData,
                          "lastName": e.target.value
                        }))}}
                        required
                      />
                      </div>
                      <div className="flex flex-col md:flex-row w-full mx-auto h-auto gap-0 md:gap-5 md:items-center py-3">
                      <label className="text-gray-600 mb-1 w-30" htmlFor="contact">
                        Contact#:
                      </label>
                      <div className="w-75   md:w-100 flex flex-row border rounded-xl">
                        <span className="w-5 mx-2 my-auto text-gray-500 align-middle">+63</span>
                        <input
                          id="contact"
                          type="text"
                          className="w-75 md:w-95 h-auto px-4 py-2 rounded-tr-xl rounded-br-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                          value={data.contactNumber}
                          onChange={(e) =>{setData(prevData=>({
                            ...prevData,
                            "contactNumber": e.target.value
                          }))}}
                          required
                        />
                      </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row w-full mx-auto h-auto gap-0 md:gap-5 md:items-center py-3">
                      <label className="text-gray-600 mb-1 w-30" htmlFor="email">
                        Email:
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="md:w-100 w-80 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={data.emailAddress}
                        onChange={(e) =>{setData(prevData=>({
                          ...prevData,
                          "emailAddress": e.target.value
                        }))}}
                        required
                      />
                      </div>
                      <div className="flex flex-col md:flex-row w-full h-auto mx-auto gap-0 md:gap-5 md:items-center py-3">
                      <label className="text-gray-600 mb-1 w-30" htmlFor="address">
                        Address:
                      </label>
                      <textarea
                        id="address"
                        rows="5"
                        cols="40"
                        className="w-80 md:w-100 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={data.address}
                        onChange={(e) =>{setData(prevData=>({
                          ...prevData,
                          "address": e.target.value
                        }))}}
                        required
                      />
                      </div>
                    <div className="flex items-center justify-center w-full h-auto pt-10">
                      <button
                        type="submit"
                        className="w-50 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
                      >
                        submit
                      </button>
                    </div>
                  </form>
                </div>
{/* -----------------------------------------------------------------------------------------------*/}
                </div>
            </div>
        </div>
        <Footer />
        <LogoutModal isOpen={isLogoutModalVisible} onClose={()=>{setIsLogoutModalVisible(false)}}/>
    </div>
  )
}

export default UpdateAccount