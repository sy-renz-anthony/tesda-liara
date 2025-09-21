import {useState} from 'react'
import axiosInstance from '../axiosConfig';
import { toast } from 'react-toastify';


import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LogoutModal from "../components/LogoutConfirmModal";
import UserInputModal from "../components/UserInputModal";

const Logs = () => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [searchFilter, setSearchFilter] = useState("");
  const [isTVINameChecked, setIsTVINameChecked] = useState(true);
  const [isAddressChecked, setIsAddressChecked] = useState(true);
  const [isQualificationChecked, setIsQualificationChecked] = useState(true);
  const [isNameOfTrainerChecked, setIsNameOfTrainerChecked] =useState(true);

  const [data, setData] = useState(null);
  const [selectedRow, setSelectedRow] =useState(null);

  const handleSubmit= async() =>{
    try {
        var filter={};
        if(isTVINameChecked){
            if(searchFilter==null||searchFilter.length<1){
                toast.error("Please input keyword in the search field!");
                return;
            }
            filter.nameOfTVI = searchFilter;
        }
        if(isAddressChecked){
            if(searchFilter==null||searchFilter.length<1){
                toast.error("Please input keyword in the search field!");
                return;
            }
            filter.address=searchFilter;
        }
        if(isQualificationChecked){
            if(searchFilter==null||searchFilter.length<1){
                toast.error("Please input keyword in the search field!");
                return;
            }
            filter.qualification=searchFilter;
        }
        if(isNameOfTrainerChecked){
            if(searchFilter==null||searchFilter.length<1){
                toast.error("Please input keyword in the search field!");
                return;
            }
            filter.nameOfTrainer=searchFilter;
        }
        if(startDate!=null&&startDate.length>0){
            filter.startDate=startDate;
        }
        if(endDate!=null&&endDate.length>0){
            filter.endDate=endDate;
        }

        if(Object.keys(filter).length<1){
            toast.error("Please input keyword and select search area or select dates to retrieve Records!");
            return;
        }
        console.log(JSON.stringify(filter));
        
        const response = await axiosInstance.post("/user-input/search", filter, {withCredentials: true});
        if(!response.data.success){
            setData(null);
            toast.error(response.data.message);
        }else{
            setData(response.data.data);
            console.log("Results: "+JSON.stringify(response.data.data));
        }
        
    } catch (err) {
      console.error("Login error:", err.message);
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
                <Header pageName="Logs"/>
                <div className="w-auto h-auto my-10 mx-3 md:mx-10 bg-white shadow round-2xl">
{/* -----------------------------------------------------------------------------------------------*/}
                <div className="flex flex-col w-full h-fit px-5 py-5">
                  <h1 className='text-xl font-bold my-5'>Retrieve Records</h1>
                  <hr />
                  <form action={handleSubmit} className="p-8 w-full" >
                      <div className="flex flex-col md:flex-row mx-auto w-full h-auto gap-0 md:gap-5 md:items-center py-2">
                      <label className="text-gray-600 mb-1 w-30" htmlFor="searchFilter">
                        Key Word:
                      </label>
                      <input
                        id="searchFilter"
                        type="text"
                        className="w-80 md:w-100 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={searchFilter}
                        onChange={(e) =>{setSearchFilter(e.target.value)}}
                        required
                      />
                      </div>
                      <h1 className='text-lg my-5'>Search In</h1>
                      <div className="flex flex-col lg:flex-row w-fit h-auto">
                        <div className="flex flex-row mx-auto w-fit h-auto gap-2 md:gap-5 md:items-center mb-2">
                            <label className="text-gray-600 mb-1 w-30 text-right" htmlFor="nameTVI">
                                Name of TVI:
                            </label>
                            <input 
                            className="px-4 py-2 my-auto items-align-center h-5 w-5 mr-5 "
                            name="nameTVI"
                            type="checkbox"
                            checked={isTVINameChecked}
                            onChange={(e)=>{setIsTVINameChecked(e.target.checked)}}
                            />
                        </div>
                        <div className="flex flex-row mx-auto w-fit h-auto gap-2 md:gap-5 md:items-center mb-2">
                            <label className="text-gray-600 mb-1 w-30 text-right" htmlFor="address">
                                Address:
                            </label>
                            <input 
                            className="px-4 py-2 my-auto items-align-center h-5 w-5 mr-5 "
                            name="address"
                            type="checkbox"
                            checked={isAddressChecked}
                            onChange={(e)=>{setIsAddressChecked(e.target.checked)}}
                            />
                        </div>
                        <div className="flex flex-row mx-auto w-fit h-auto gap-2 md:gap-5 md:items-center mb-2">
                            <label className="text-gray-600 mb-1 w-30 text-right" htmlFor="qualification">
                                Qualification:
                            </label>
                            <input 
                            className="px-4 py-2 my-auto items-align-center h-5 w-5 mr-5 "
                            name="qualification"
                            type="checkbox"
                            checked={isQualificationChecked}
                            onChange={(e)=>{setIsQualificationChecked(e.target.checked)}}
                            />
                        </div>
                        <div className="flex flex-row mx-auto w-fit h-auto gap-2 md:gap-5 md:items-center mb-2">
                            <label className="text-gray-600 mb-1 w-30 text-right" htmlFor="trainerName">
                                Name of Trainer:
                            </label>
                            <input 
                            className="px-4 py-2 my-auto items-align-center h-5 w-5 mr-5 "
                            name="trainerName"
                            type="checkbox"
                            checked={isNameOfTrainerChecked}
                            onChange={(e)=>{setIsNameOfTrainerChecked(e.target.checked)}}
                            />
                        </div>
                      </div>
                      
                      <div className="flex flex-row w-full h-auto gap-5">
                      <div className="flex flex-col md:flex-row mx-auto w-full h-auto gap-0 md:gap-5 md:items-center py-2">
                      <label className="text-gray-600 mb-1 w-fit text-right" htmlFor="startDate">
                        From:
                      </label>
                      <input
                        id="startDate"
                        type="date"
                        className="w-40 max-w-60 md:w-50 md:mx-4 py-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-500"
                        placeholder="YYYY-MM-DD"
                        value={startDate}
                        onChange={(f) => setStartDate(f.target.value)}
                      />
                      </div>
                      <div className="flex flex-col md:flex-row mx-auto w-full h-auto gap-0 md:gap-5 md:items-center py-2">
                      <label className="text-gray-600 mb-1 w-fit text-right" htmlFor="endDate">
                        To:
                      </label>
                      <input
                        id="endDate"
                        type="date"
                        className="w-40 max-w-60 md:w-50 md:mx-4 py-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-500"
                        placeholder="YYYY-MM-DD"
                        value={endDate}
                        onChange={(f) => setEndDate(f.target.value)}
                      />
                      </div>
                      </div>

                    <div className="flex items-center justify-center w-full h-auto pt-10">
                      <button
                        type="submit"
                        className="w-50 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
                        onClick={(e)=>{
                            e.preventDefault();
                            handleSubmit();
                        }}
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>


                

                {data !== null && data !== undefined && data.length > 0 ? (
                <div className="w-full h-auto flex flex-col">
                    <table className="table-general">
                    <thead className="tablehead-general">
                        <tr>
                        <th className="tableheadentry-general">Date</th>
                        <th className="tableheadentry-general">Name Of TVI</th>
                        <th className="tableheadentry-general">Address</th>
                        <th className="tableheadentry-general">Qualification</th>
                        <th className="tableheadentry-general">Name Of Trainer</th>
                        <th className="tableheadentry-general">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((usageRecord) => (
                        <tr key={usageRecord._id} className="tablerow-general" >
                            <td className="tableentry-general">{usageRecord.inputDate}</td>
                            <td className="tableentry-general">{usageRecord.nameOfTVI}</td>
                            <td className="tableentry-general">{usageRecord.address}</td>
                            <td className="tableentry-general">{usageRecord.qualification}</td>
                            <td className="tableentry-general">{usageRecord.nameOfTrainer}</td>
                            <td className="tableentry-general"><button
                                type="submit"
                                className="w-auto bg-blue-600 text-white py-2 px-3 rounded-xl hover:bg-blue-700 transition duration-200 active:bg-blue-900"
                                onClick={(e)=>{
                                    e.preventDefault();
                                    setSelectedRow(usageRecord);
                                }}
                            >View</button></td>
                        </tr>
                        ))} 
                    </tbody>
                    </table>

                </div>): (null)}
                
{/* -----------------------------------------------------------------------------------------------*/}
                </div>
            </div>
        </div>
        <Footer />
        <LogoutModal isOpen={isLogoutModalVisible} onClose={()=>{setIsLogoutModalVisible(false)}}/>
        {selectedRow && (<UserInputModal userInput={selectedRow} onClose={()=>setSelectedRow(null)}/>)}
    </div>
  )
}

export default Logs