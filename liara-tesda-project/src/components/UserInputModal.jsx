import { useEffect } from "react";

export default function UserInputModal({userInput, onClose}) {
  
  useEffect(()=>{
    console.log("data: "+JSON.stringify(userInput));
  }, [userInput]);

  
  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-700 opacity-50"></div>
        <div className="bg-white rounded-xl p-6 w-full mx-2 md:mx-40 shadow-lg relative flex flex-col">
          <button
            onClick={(e)=>{
              e.preventDefault();
              userInput=null;
              onClose();
            }}
            className="absolute top-2 right-5 text-gray-600 hover:text-black text-xl active:bg-red-700 active:text-white hover:bg-orange-600 hover:text-white w-auto h-auto px-2"
          >
            &times;
          </button>
          <h1 className="mx-5 my-5 font-bold text-gray-800 text-lg transition-all duration-500 ease-linear">User Input Data</h1>
          <hr />
          <div className="flex flex-row w-full h-auto">
            <div className="flex flex-col w-full h-fit px-5 py-5">
              <div className="flex flex-col md:flex-row mx-auto w-full h-auto gap-3 md:gap-5 md:items-center py-3">
                <span className="content-label-identifier">Date Submitted:</span><span>{userInput.inputDate}</span>
              </div>
              <div className="flex flex-col md:flex-row mx-auto w-full h-auto gap-3 md:gap-5 md:items-center py-3">
                <span className="content-label-identifier">Name Of TVI:</span><span>{userInput.nameOfTVI}</span>
              </div>
              <div className="flex flex-col md:flex-row mx-auto w-full h-auto gap-3 md:gap-5 md:items-center py-3">
                <span className="content-label-identifier">Address:</span><span>{userInput.address}</span>
              </div>
              <div className="flex flex-col md:flex-row mx-auto w-full h-auto gap-3 md:gap-5 md:items-center py-3">
                <span className="content-label-identifier">Qualification:</span><span>{userInput.qualification}</span>
              </div>
              <div className="flex flex-col md:flex-row mx-auto w-full h-auto gap-3 md:gap-5 md:items-center py-3">
                <span className="content-label-identifier">Name of Trainer:</span><span>{userInput.nameOfTrainer}</span>
              </div>                        
            </div>
            <div className="flex flex-col w-full h-fit px-5 py-5">
              <h1 className="mx-3 font-bold text-gray-800 text-md mb-3">Files Uploaded</h1>
              {userInput.letter &&(
                <div className="flex flex-row w-full h-auto gap-3 items-center font-bold text-gray-700 hover:text-orange-600 mb-3 text-xs md:text-sm">
                  <img src={userInput.letter} className="shadow w-10 h-10 md:w-15 md:h-15 hover:border-orange-500"/>
                  <a href={userInput.letter} target="_blank" rel="noopener noreferrer">Letter informing TESDA on the change/additional trainer/s</a>
                </div>
              )}
              {userInput.f20_TVET_NTTC &&(
                <div className="flex flex-row w-full h-auto gap-3 items-center font-bold text-gray-700 hover:text-orange-600 mb-3 text-xs md:text-sm">
                  <img src={userInput.f20_TVET_NTTC} className="shadow w-10 h-10 md:w-15 md:h-15 hover:border-orange-500"/>
                  <a href={userInput.f20_TVET_NTTC} target="_blank" rel="noopener noreferrer">NC - TM - NTTC</a>
                </div>
              )}
              {userInput.copyOfTM &&(
                <div className="flex flex-row w-full h-auto gap-3 items-center font-bold text-gray-700 hover:text-orange-600 mb-3 text-xs md:text-sm">
                  <img src={userInput.copyOfTM} className="shadow w-10 h-10 md:w-15 md:h-15 hover:border-orange-500"/>
                  <a href={userInput.copyOfTM} target="_blank" rel="noopener noreferrer">copy of the Training Certificate on Trainer's Methodology (TM)</a>
                </div>
              )}
              {userInput.certOfTraining &&(
                <div className="flex flex-row w-full h-auto gap-3 items-center font-bold text-gray-700 hover:text-orange-600 mb-3 text-xs md:text-sm">
                  <img src={userInput.certOfTraining} className="shadow w-10 h-10 md:w-15 md:h-15 hover:border-orange-500"/>
                  <a href={userInput.certOfTraining} target="_blank" rel="noopener noreferrer">Certificates of Training relevant to registered programs</a>
                </div>
              )}
              {userInput.certOfEmployment &&(
                <div className="flex flex-row w-full h-auto gap-3 items-center font-bold text-gray-700 hover:text-orange-600 mb-3 text-xs md:text-sm">
                  <img src={userInput.certOfEmployment} className="shadow w-10 h-10 md:w-15 md:h-15 hover:border-orange-500"/>
                  <a href={userInput.certOfEmployment} target="_blank" rel="noopener noreferrer">Certified true copy of notarized Contract of Employment</a>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}