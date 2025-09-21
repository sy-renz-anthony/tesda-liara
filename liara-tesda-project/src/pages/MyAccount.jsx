import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { toast } from 'react-toastify';

import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LogoutModal from "../components/LogoutConfirmModal";
import Modal from '../components/PasswordConfirmModal';

const AddAccount = () => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const logoutEventHandler=()=>{
    setIsLogoutModalVisible(true);
  }

  const [data, setData]  = useState({});
  const [nextPage, setNextPage] = useState("/change-password");

  const navigate = useNavigate();

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
          console.error("Login error:", err.message);
      }
    }
    
    reloadData();
  }, []);


  const passwordCorrectReroute =()=>{
    navigate(nextPage);
  }

  return (
    <div className="flex flex-col w-auto min-w-screen min-h-screen bg-gray-300">
        <div className="flex flex-row w-full h-auto min-h-140 m-0 p-0">
            <NavBar logoutEventHandler={logoutEventHandler}/>
            <div className="flex flex-col w-fit lg:w-full h-auto">
                <Header pageName="My Account"/>
                <div className="w-auto h-auto my-10 mx-3 md:mx-10 bg-white shadow round-2xl">
{/* -----------------------------------------------------------------------------------------------*/}
                    <div className="flex flex-col w-full h-fit px-5 py-5">
                        <h1 className='text-xl font-bold my-5'>Personal Info</h1>
                        <hr />
                        <div className="flex flex-row mx-auto w-full h-auto gap-3 md:gap-5 md:items-center py-3">
                            <span className="content-label-identifier">Employee ID#:</span><span>{data.employeeID}</span>
                        </div>
                        <div className="flex flex-row mx-auto w-full h-auto gap-3 md:gap-5 md:items-center py-3">
                        <span className="content-label-identifier">Name:</span><span>{data.lastName+", "+data.firstName+" "+data.middleName}</span></div>
                        <div className="flex flex-row mx-auto w-full h-auto gap-3 md:gap-5 md:items-center py-3">
                        <span className="content-label-identifier">Contact#:</span><span>{data.contactNumber}</span></div>
                        <div className="flex flex-row mx-auto w-full h-auto gap-3 md:gap-5 md:items-center py-3">
                        <span className="content-label-identifier">Email Add:</span><span>{data.emailAddress}</span></div>
                        <div className="flex flex-row mx-auto w-full h-auto gap-3 md:gap-5 md:items-center py-3">
                        <span className="content-label-identifier">Address:</span><span>{data.address}</span>
                        </div>
                        
                        <hr />
                        <div className="flex flex-col lg:flex-row mx-auto my-10 justify-end gap-5 lg:gap-10">
                        <button type="submit" className="w-50 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200" onClick={(e)=>{
                            e.preventDefault();
                            setIsPasswordVisible(true);
                            setNextPage("/update-my-account");
                        }}>Update Personal Info</button>
                        <button type="submit" className="w-50 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200" onClick={(e)=>{
                            e.preventDefault();
                            setIsPasswordVisible(true);
                            setNextPage("/change-password");
                        }}>Change Password</button>
                        
                        </div>
                    </div>
{/* -----------------------------------------------------------------------------------------------*/}
                </div>
            </div>
        </div>
        <Footer />
        <LogoutModal isOpen={isLogoutModalVisible} onClose={()=>{setIsLogoutModalVisible(false)}}/>
        <Modal isOpen={isPasswordVisible} onClose={()=>{setIsPasswordVisible(false)}} confirmationEventHandler={passwordCorrectReroute}/>
    </div>
  )
}

export default AddAccount