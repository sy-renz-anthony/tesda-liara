import { useState, useRef} from "react";
import { Link } from "react-router-dom";

import headingLogo from "../assets/TESDA-emblem-white.png";
import pic1 from "../assets/banner.jpg";
import  {MdEmail, MdCall} from "react-icons/md";
import {FaYoutube, FaFacebookSquare, FaTiktok, FaChevronCircleRight} from "react-icons/fa";

import {toast} from "react-toastify"; 
import axiosInstance from "../axiosConfig";

function PublicHome() {
  
  const [formData, setFormData] = useState({
    nameOfTVI: "",
    address: "",
    qualification: "",
    nameOfTrainer: "",
    hasLetter: false,
    hasF20_TVET_NTTC: false,
    hasCopyOfTM: false,
    hasCertOfTraining: false,
    hasCertOfEmployment: false,
  });
   
  const fileLetterInformingTesda = useRef();
  const fileTesdaOPCO01F20 = useRef();
  const fileTrainingCertificationOnTrainingMethodologies = useRef();
  const fileCertificateOfTraining = useRef();
  const fileContractEmployment = useRef();

  const submitForm = async (e) => {
    e.preventDefault();
    
    try{
      
      const formContents = new FormData();
      Object.keys(formData).forEach((key)=>{
        formContents.append(key, formData[key]);
      })
      if(formData.hasLetter&&fileLetterInformingTesda.current?.files[0]){
        formContents.append("letter", fileLetterInformingTesda.current.files[0]); 
      }
      if(formData.hasF20_TVET_NTTC&&fileTesdaOPCO01F20.current?.files[0]){
        formContents.append("f20_TVET_NTTC", fileTesdaOPCO01F20.current.files[0]);
      }
      if(formData.hasCopyOfTM&&fileTrainingCertificationOnTrainingMethodologies.current?.files[0]){
        formContents.append("copyOfTM", fileTrainingCertificationOnTrainingMethodologies.current.files[0]);
      }
      if(formData.hasCertOfTraining&&fileCertificateOfTraining.current?.files[0]){
        formContents.append("certOfTraining", fileCertificateOfTraining.current.files[0]);
      }
      if(formData.hasCertOfEmployment&&fileContractEmployment.current?.files[0]){
        formContents.append("certOfEmployment", fileContractEmployment.current.files[0]);
      }

      const response = await axiosInstance.post("/user-input/record-cloud", formContents, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: false
      });

        console.log(JSON.stringify(response.data));
        if(!response.data.success){
            toast.error(response.data.message);
        }else{
          toast.success(response.data.message);
          setFormData({
            nameOfTVI: "",
            address: "",
            qualification: "",
            nameOfTrainer: "",
            hasLetter: false,
            hasF20_TVET_NTTC: false,
            hasCopyOfTM: false,
            hasCertOfTraining: false,
            hasCertOfEmployment: false,
          });
          fileLetterInformingTesda.current.value = null;
          fileTesdaOPCO01F20.current.value=null;
          fileTrainingCertificationOnTrainingMethodologies.current.value = null;
          fileCertificateOfTraining.current.value = null;
          fileContractEmployment.current.value = null;
        }
        console.log(response.data.message);
    }catch(err){
      console.error("submission error: ", err.message);
    }
  }


  return (
    <div className="background absolute top-0 left-0 w-full min-h-screen bg-[#030826]">
      <div className="relative top-0 left-0 w-full h-20 bg-white py-2 flex flex-row items-center">
        <img src={headingLogo} className="w-auto h-15 mx-2 md:mx-5" />
        <div className="w-full">
          <h1 className="text-sm md:text-2xl text-gray-600 font-bold">Technical Education and Skills Development Authority</h1>
        </div>
        <div className="w-fit md:w-full flex flex-col lg:flex-row items-center justify-end text-sm text-orange-600 text-xs md:text-sm">
          <a href="tel:+630354229481" className="flex flex-row hover:text-green-600"><MdCall className="w-5 h-5 mr-2" /><p className="md:mr-2 mr-7 ">(035) 255-1578</p></a>
          <a href="mailto:region7.negrosoriental.utpras@tesda.gov.ph" className="flex flex-row hover:text-green-600"><MdEmail className="w-5 h-5 mr-2" /><p className="mr-5 hidden md:block">region7.negrosoriental.utpras@tesda.gov.ph</p><p className="mr-5 block md:hidden">region7...@tesda.gov.ph</p></a>
        </div>
      </div>

      <div className="relative w-auto h-auto mx-10 lg:mx-20 my-10 flex flex-col md:flex-row ">
        <div className="w-full h-auto flex flex-col p-10">
          <div className="w-full h-auto flex flex-col justify-center items-center">
            <img src={pic1} className="w-auto h-auto mx-8 my-5"/>
            <h1 className="text-4xl text-green-500 font-bold [webkit-text-stroke:1px_black] mt-10 mb-10 neon-text">TESDA's brief History</h1>
            <div className="relative h-100 w-auto overflow-hidden text-white text-justify">
              <p 
                style={{
                  animation: "scroll-up 50s linear infinite",
                  whiteSpace: "pre-wrap "
                }}
              >The Technical Education and Skills Development Authority (TESDA) was established through the enactment of Republic Act No. 7796 otherwise known as the "Technical Education and Skills Development Act of 1994", which was signed into law by President Fidel V. Ramos on August 25, 1994. This Act aims to encourage the full participation of and mobilize the industry, labor, local government units and technical-vocational institutions in the skills development of the country's human resources.<br /><br />
              The merging of the National Manpower and Youth Council(NMYC) of the Department of Labor and Employment (DOLE). The Bureau of Technical and Vocational Education (BTVE) of theDepartment of Education, Culture and Sports (DECS), and The Apprenticeship Program of the Bureau of Local Employment(BLE) of the DOLE gave birth to TESDA.
              <br /><br />
              The fusion of the above offices was one of the key recommendations of the 1991 Report of the Congressional Commission on Education, which undertook a national review of the state of Philippine education and manpower development. It was meant to reduce overlapping in skills development activities initiated by various public and private sector agencies, and to provide national directions for the country's technical-vocational education and training (TVET) system. Hence, a major thrust of TESDA is the formulation of a comprehensive development plan for middle-level manpower based on the National Technical Education and Skills Development Plan. This plan shall provide for a reformed industry-based training program that includes apprenticeship, dual training system and other similar schemes.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-auto py-5 bg-orange-500 text-white text-2xl font-bold text-center rounded-t-xl"><h1>Please fill-up the form</h1></div>
          <div className="w-full h-auto bg-gray-300/20 rounded-b-xl">
            <form 
              onSubmit={submitForm}
            >
              <div className="flex flex-col md:flex-row px-5 pt-5 justify-center md:items-center">
                <label className="text-white text-lg md:text-right font-bold mr-5 min-w-30 " htmlFor="nameOfTVI">Name of TVI: </label>
                <input 
                  type="text"
                  name="nameOfTVI"
                  value={formData.nameOfTVI}
                  className="w-full h-10 bg-white rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                  onChange={ 
                    (e) =>{setFormData(prevData=>({
                    ...prevData,
                    "nameOfTVI": e.target.value
                  }))}
                  }
                  placeholder="Name of TVI"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row px-5 pt-5 justify-center md:items-center">
                <label className="text-white text-lg text-left md:text-right font-bold mr-5 min-w-30 " htmlFor="address">Address: </label>
                <input 
                  type="text"
                  name="address"
                  value={formData.address}
                  className="w-full h-10 bg-white rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                  onChange={ 
                    (e) =>{setFormData(prevData=>({
                    ...prevData,
                    "address": e.target.value
                  }))}
                  }
                  placeholder="Address"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row px-5 pt-5 justify-center md:items-center">
                <label className="text-white text-lg md:text-right font-bold mr-5 min-w-30 " htmlFor="qualification">Qualification: </label>
                <input 
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  className="w-full h-10 bg-white rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                  onChange={ 
                    (e) =>{setFormData(prevData=>({
                    ...prevData,
                    "qualification": e.target.value
                  }))}
                  }
                  placeholder="Qualification"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row px-5 pt-5 mb-5 justify-center md:items-center">
                <label className="text-white text-lg md:text-right  font-bold mr-5 min-w-30 " htmlFor="nameOfTrainer">Name of Trainer: </label>
                <input 
                  type="text"
                  name="nameOfTrainer"
                  value={formData.nameOfTrainer}
                  className="w-full h-10 bg-white rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                  onChange={ 
                    (e) =>{setFormData(prevData=>({
                    ...prevData,
                    "nameOfTrainer": e.target.value
                  }))}
                  }
                  placeholder="Name of Trainer"
                  required
                />
              </div>
              
              <div className="flex w-full h-auto md:flex-row mt-10 px-5 pt-2 justify-center md:items-center">
                <h1 className="text-white text-xl text-center font-bold mx-5">Requirements for the Change/Additional Trainer: </h1>
              </div>
            
              <div className="flex flex-col md:flex-row px-5 pt-5 pb-2 justify-center items-center">
                <div className="w-full h-auto"> </div>
                <h1 className="text-orange-400 hidden md:block text-lg font-bold mr-5">Compliant</h1>
                <div className="w-55"> </div>
              </div>

              <hr className="mx-5 text-blue-900"/>
              <div className="flex flex-col md:flex-row px-5 pt-2 pb-2 justify-center items-center">
                <label className="w-full text-white text-md font-bold mr-5" htmlFor="letterInformingTesdaRemarks">Letter informing TESDA on the change/additional trainer/s: </label>
                <div className="w-full flex flex-row">
                  <div className="w-full flex justify-center items-center">
                    <h1 className="text-orange-400 block md:hidden text-lg font-bold mr-5">Compliant?</h1>
                    <input 
                      className="px-4 py-2 my-auto items-align-center h-7 w-7 mr-5 "
                      name="letterInformingTesdaCompliant"
                      type="checkbox"
                      checked={formData.hasLetter}
                      onChange={(e) =>{
                        setFormData(prevData=>({
                          ...prevData,
                          "hasLetter": e.target.checked
                        }))}}
                    />
                  </div>
                  <button
                    id="letterInformingTesdaBtn"
                    className="w-25 sm:w-40 bg-purple-600 text-white py-2 rounded-xl active:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed hover:outline-none hover:ring-2 hover:ring-green-600"
                    onClick={(e)=>{
                      e.preventDefault();
                      fileLetterInformingTesda.current.click();
                    }}
                    disabled={!formData.hasLetter}
                  >upload</button>
                  <input
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    ref={fileLetterInformingTesda}
                    className="hidden"
                  />
                </div>
              </div>
              <hr className="mx-5 text-blue-900"/>

              <div className="flex flex-col md:flex-row px-5 pt-2 pb-2 justify-center items-center">
                <label className="w-full text-white text-md font-bold mr-5" htmlFor="tesdaOPCO01F20Remarks">
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start gap-2"><FaChevronCircleRight className="flex-shrink-0 mt-1 w-5 h-5" /><span className="leading-relaxed">TESDA-OP-CO-01-F20- Copy of the National Certificate (NC)</span></li> 
                    <li className="flex items-start gap-2"><FaChevronCircleRight className="flex-shrink-0 mt-1 w-5 h-5" /><span className="leading-relaxed">Trainer's Methodology (TM)</span></li> 
                    <li className="flex items-start gap-2"><FaChevronCircleRight className="flex-shrink-0 mt-1 w-5 h-5" /><span className="leading-relaxed">National TVET Trainer's Certificate (NTTC) Level I or II of the new trainer/s for WTR programs</span></li>
                  </ul>
                </label>
                <div className="w-full flex flex-row">
                  <div className="w-full flex justify-center items-center">
                    <h1 className="text-orange-400 block md:hidden text-lg font-bold mr-5">Compliant?</h1>
                    <input 
                      className="px-4 py-2 my-auto items-align-center h-7 w-7 mr-5 "
                      name="tesdaOPCO01F20Compliant"
                      type="checkbox"
                      checked={formData.hasF20_TVET_NTTC}
                      onChange={(e) =>{setFormData(prevData=>({
                          ...prevData,
                          "hasF20_TVET_NTTC": e.target.checked
                        }))}}
                    />
                  </div>
                  <button
                    id="tesdaOPCO01F20Btn"
                    className="w-25 sm:w-40 bg-purple-600 text-white py-2 rounded-xl active:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed hover:outline-none hover:ring-2 hover:ring-green-600"
                    onClick={(e)=>{
                      e.preventDefault();
                      fileTesdaOPCO01F20.current.click();
                    }}
                    disabled={!formData.hasF20_TVET_NTTC}
                  >upload</button>
                  <input
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    ref={fileTesdaOPCO01F20}
                    className="hidden"
                  />
                </div>
              </div>
              <hr className="mx-5 text-blue-900"/>
              <div className="flex flex-col md:flex-row px-5 pt-2 pb-2 justify-center items-center">
                <label className="w-full text-white text-md font-bold mr-5" htmlFor="trainingCertificateOnTrainingMethodologiesRemarks">For <b>NTR</b> programs, copy of the Training Certificate on Trainer's Methodology (TM) I or it's equivalent</label>
                <div className="w-full flex flex-row">
                  <div className="w-full flex justify-center items-center">
                    <h1 className="text-orange-400 block md:hidden text-lg font-bold mr-5">Compliant?</h1>
                    <input 
                      className="px-4 py-2 my-auto items-align-center h-7 w-7 mr-5 "
                      name="trainingCertificateOnTrainingMethodologiesCompliant"
                      type="checkbox"
                      checked={formData.hasCopyOfTM}
                      onChange={(e) =>{setFormData(prevData=>({
                          ...prevData,
                          "hasCopyOfTM": e.target.checked
                        }))}}
                    />
                  </div>
                  <button
                    id="trainingCertificateOnTrainingMethodologiesBtn"
                    className="w-25 sm:w-40 bg-purple-600 text-white py-2 rounded-xl active:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed hover:outline-none hover:ring-2 hover:ring-green-600"
                    onClick={(e)=>{
                      e.preventDefault();
                      fileTrainingCertificationOnTrainingMethodologies.current.click();
                    }}
                    disabled={!formData.hasCopyOfTM}
                  >upload</button>
                  <input
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    ref={fileTrainingCertificationOnTrainingMethodologies}
                    className="hidden"
                  />
                </div>
              </div>
            <hr className="mx-5 text-blue-900"/>
              <div className="flex flex-col md:flex-row px-5 pt-2 pb-2 justify-center items-center">
                <label className="w-full text-white text-md font-bold mr-5" htmlFor="certificateOfTrainingRemarks">Certificate/s of Training relevant to registered programs/s; and</label>
                <div className="w-full flex flex-row">
                  <div className="w-full flex justify-center items-center">
                    <h1 className="text-orange-400 block md:hidden text-lg font-bold mr-5">Compliant?</h1>
                    <input 
                      className="px-4 py-2 my-auto items-align-center h-7 w-7 mr-5 "
                      name="certificateOfTrainingCompliant"
                      type="checkbox"
                      checked={formData.hasCertOfTraining}
                      onChange={(e) =>{setFormData(prevData=>({
                          ...prevData,
                          "hasCertOfTraining": e.target.checked
                        }))}}
                    />
                  </div>
                  <button
                    id="certificateOfTrainingBtn"
                    className="w-25 sm:w-40 bg-purple-600 text-white py-2 rounded-xl active:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed hover:outline-none hover:ring-2 hover:ring-green-600"
                    onClick={(e)=>{
                      e.preventDefault();
                      fileCertificateOfTraining.current.click();
                    }}
                    disabled={!formData.hasCertOfTraining}
                  >upload</button>
                  <input
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    ref={fileCertificateOfTraining}
                    className="hidden"
                  />
                </div>
              </div>
            <hr className="mx-5 text-blue-900"/>
              <div className="flex flex-col md:flex-row px-5 pt-2 pb-2 justify-center items-center">
                <label className="w-full text-white text-md font-bold mr-5" htmlFor="contractEmploymentRemarks">Certified true copy of notarized Contract of Employment</label>
                <div className="w-full flex flex-row">
                  <div className="w-full flex justify-center items-center">
                    <h1 className="text-orange-400 block md:hidden text-lg font-bold mr-5">Compliant?</h1>
                    <input 
                      className="px-4 py-2 my-auto items-align-center h-7 w-7 mr-5 "
                      name="contractEmploymentCompliant"
                      type="checkbox"
                      checked={formData.hasCertOfEmployment}
                      onChange={(e) =>{setFormData(prevData=>({
                          ...prevData,
                          "hasCertOfEmployment": e.target.checked
                        }))}}
                    />
                  </div>
                  <button
                    id="contractEmploymentBtn"
                    className="w-25 sm:w-40 bg-purple-600 text-white py-2 rounded-xl active:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed hover:outline-none hover:ring-2 hover:ring-green-600"
                    onClick={(e)=>{
                      e.preventDefault();
                      fileContractEmployment.current.click();
                    }}
                    disabled={!formData.hasCertOfEmployment}
                  >upload</button>
                  <input
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    ref={fileContractEmployment}
                    className="hidden"
                  />
                </div>
              </div>
            <hr className="mx-5 text-blue-900"/>
              <div className="flex items-center justify-center w-full mx-10 mt-5 mb-10">
                  <button
                    className="w-50 bg-green-600 text-white py-2 rounded-xl active:bg-green-800 hover:bg-green-500"
                  >Submit</button>
              </div>

            </form>
          </div>
        </div>
      </div>

      <div className="relative w-full h-50 bg-black shadow flex flex-col text-white">
        
      <div className="w-full h-auto flex justify-end mt-10">
         <div className="w-full h-auto flex mx-3"><Link className="text-white text-sm hover:underline hover:text-yellow-600" to="/staff-login">Staff Login</Link></div>
        <p className="text-xs md:text-md">Visit us on our socials:</p>
        <div className="flex flex-row gap-7 mx-10">
          <FaFacebookSquare className="w-8 h-8" />
          <FaTiktok className="w-8 h-8" />
          <FaYoutube className="w-8 h-8" />
        </div>
      </div>
        <div className="absolute bottom-0 w-full h-auto text-center text-xs my-3">
          <p>Developed by: Liara Amor Suzane P. Radoc &trade;</p>
          <p>OJT from NORSU - Siaton Campus</p>
          <p>SY: 2025 - 2026</p>
        </div>
      </div>
    </div>
  )
}

export default PublicHome