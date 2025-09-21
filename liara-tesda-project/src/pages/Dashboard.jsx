import {useState, useEffect} from 'react'
import axiosInstance from '../axiosConfig';
import { toast } from 'react-toastify';

import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LogoutModal from "../components/LogoutConfirmModal";
import DashboardChart from '../components/DashboardChart';
import img1 from "../assets/banner.jpg";

const AddAccount = () => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const logoutEventHandler=()=>{
    setIsLogoutModalVisible(true);
  }

  const [data, setData]  = useState(null);
  
  useEffect(()=>{
    async function reloadData(){
      
      try {
        const response = await axiosInstance.get("/user-input/dashboard-data", {}, {withCredentials: true});
        if(!response.data.success){
              toast.error(response.data.message);
        }else{
            setData(response.data.data);
        }
        console.log(JSON.stringify(response.data.data));
      } catch (err) {
          console.error("Login error:", err.message);
      }
    }
    
    reloadData();
  }, []);



  return (
    <div className="flex flex-col w-auto min-w-screen min-h-screen bg-gray-300">
        <div className="flex flex-row w-full h-auto min-h-140 m-0 p-0">
            <NavBar logoutEventHandler={logoutEventHandler}/>
            <div className="flex flex-col w-fit lg:w-full h-auto">
                <Header pageName="Dahboard"/>
                <div className="w-auto h-auto my-10 mx-3 md:mx-10 bg-white shadow round-2xl">
{/* -----------------------------------------------------------------------------------------------*/}
                    <div className="flex flex-col w-full h-fit px-5 py-5">
                        <h1 className='text-xl font-bold my-5'>Number of Respondents within the last 7 days</h1>
                        <hr />
                        <div className="flex flex-col md:flex-row w-full h-auto">
                          <div className="flex-1 mb-3">
                            {data && (<DashboardChart rawData={data}/>)}
                          </div>
                          <div className="flex-1 items-center my-auto">
                            <img src={img1} className='w-full h-full'/>
                          </div>
                        </div>
                        
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

export default AddAccount