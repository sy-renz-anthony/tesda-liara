import UserInput from "../models/userInput.model.js";
import mongoose from "mongoose";
import createCloudinary from "../config/cloudinary.js";
import fs from "fs";
import { isDateValid } from "../functions/functions.js";
import moment from 'moment-timezone';

export const recordUserInput = async(req, res) =>{
    if(!req.body){
        return res.status(200).json({success: false, message: "Invalid values!"});
    }

    const nameOfTVI= req.body.nameOfTVI;
    const address= req.body.address;
    const qualification=req.body.qualification;
    const nameOfTrainer= req.body.nameOfTrainer;
    
    var errorMessage="";
    const session = await mongoose.startSession();
    try {
        var hasLetter = JSON.parse(req.body.hasLetter);
        let letter;
        if(hasLetter==true){
            if(req.files.letter){
                letter= req.files.letter[0].filename;
            }else{
                hasLetter=false;
                errorMessage=errorMessage+"\nNo attached file for Letter informing TESDA on the change/additional trainer/s!";
            }
        }
        
        var hasF20_TVET_NTTC = JSON.parse(req.body.hasF20_TVET_NTTC);
        let f20_TVET_NTTC;
        if(hasF20_TVET_NTTC==true){
            if(req.files.f20_TVET_NTTC){
                f20_TVET_NTTC=req.files.f20_TVET_NTTC[0].filename;
            }else{
                hasF20_TVET_NTTC = false;
                errorMessage=errorMessage+"\nNo attached file for NC, TM, or NTTC programs!";
            }
        }
        var hasCopyOfTM = JSON.parse(req.body.hasCopyOfTM);
        let copyOfTM;
        if(hasCopyOfTM==true){
            if(req.files.copyOfTM){
                copyOfTM=req.files.copyOfTM[0].filename;
            }else{
                hasCopyOfTM=false;
                errorMessage=errorMessage+"\nNo attached file for a copy of the Training Certificate on Trainer's Methodology (TM) I or it's equivalent!";
            }
        }

        var hasCertOfTraining = JSON.parse(req.body.hasCertOfTraining);
        let certOfTraining;
        if(hasCertOfTraining==true){
            if(req.files.certOfTraining){
                certOfTraining=req.files.certOfTraining[0].filename;
            }else{
                hasCertOfTraining=false;
                errorMessage=errorMessage+"\nNo attached file for Certificate/s of Training relevant to registered programs/s!";
            }
        }
        
        var hasCertOfEmployment = JSON.parse(req.body.hasCertOfEmployment);
        let certOfEmployment;
        if(hasCertOfEmployment==true){
            if(req.files.certOfEmployment){
                certOfEmployment=req.files.certOfEmployment[0].filename;
            }else{
                hasCertOfEmployment=false;
                errorMessage=errorMessage+"\nNo attached file for Certified true copy of notarized Contract of Employment!";
            }
        }
        
        console.log(letter+"\n"+f20_TVET_NTTC+"\n"+copyOfTM+"\n"+certOfTraining+"\n"+certOfEmployment);
    
        session.startTransaction();

        const userInput = new UserInput();
        userInput.nameOfTVI = nameOfTVI;
        userInput.address = address;
        userInput.qualification = qualification;
        userInput.nameOfTrainer = nameOfTrainer;
        userInput.letter = letter;
        userInput.f20_TVET_NTTC = f20_TVET_NTTC;
        userInput.copyOfTM = copyOfTM;
        userInput.certOfTraining= certOfTraining;
        userInput.certOfEmployment = certOfEmployment;

        await userInput.save({session});

        await session.commitTransaction();
        
        res.status(200).json({success: true, message: "Saved Successfully!"+errorMessage});
    }catch(error){
        if(session.inTransaction()){
            await session.abortTransaction();
        }
        
        console.error("Error in User Input creation! - "+error.message);
        res.status(500).json({success: false, message:"Server Error"});
    }finally{
        await session.endSession();
    }

    return res;
}

export const recordUserInputCloud = async(req, res) =>{
    if(!req.body){
        return res.status(200).json({success: false, message: "Invalid values!"});
    }

    const nameOfTVI= req.body.nameOfTVI;
    const address= req.body.address;
    const qualification=req.body.qualification;
    const nameOfTrainer= req.body.nameOfTrainer;
    
    var errorMessage="";
    const session = await mongoose.startSession();
    try {
        const cloudinary = createCloudinary();

        var hasLetter = JSON.parse(req.body.hasLetter);
        let letter;
        let letterPublicID=null;
        if(hasLetter==true){
            if(req.files.letter){
                const filePath= req.files.letter[0].path;
                const uploaded = await cloudinary.uploader.upload(filePath, {
                folder: "uploads",
                resource_type: "auto",
                });

                letter=uploaded.secure_url;
                letterPublicID=uploaded.public_id;
                fs.unlinkSync(filePath);
            }else{
                hasLetter=false;
                errorMessage=errorMessage+"\nNo attached file for Letter informing TESDA on the change/additional trainer/s!";
            }
        }
        
        var hasF20_TVET_NTTC = JSON.parse(req.body.hasF20_TVET_NTTC);
        let f20_TVET_NTTC;
        let f20_TVET_NTTCPublicID=null;
        if(hasF20_TVET_NTTC==true){
            if(req.files.f20_TVET_NTTC){
                const filePath= req.files.f20_TVET_NTTC[0].path;
                const uploaded = await cloudinary.uploader.upload(filePath, {
                folder: "uploads",
                resource_type: "auto",
                });

                f20_TVET_NTTC=uploaded.secure_url;
                f20_TVET_NTTCPublicID=uploaded.public_id;
                fs.unlinkSync(filePath);
            }else{
                hasF20_TVET_NTTC = false;
                errorMessage=errorMessage+"\nNo attached file for NC, TM, or NTTC programs!";
            }
        }
        var hasCopyOfTM = JSON.parse(req.body.hasCopyOfTM);
        let copyOfTM;
        let copyOfTMPublicID=null;
        if(hasCopyOfTM==true){
            if(req.files.copyOfTM){
                const filePath= req.files.copyOfTM[0].path;
                const uploaded = await cloudinary.uploader.upload(filePath, {
                folder: "uploads",
                resource_type: "auto",
                });

                copyOfTM=uploaded.secure_url;
                copyOfTMPublicID=uploaded.public_id;
                fs.unlinkSync(filePath);
            }else{
                hasCopyOfTM=false;
                errorMessage=errorMessage+"\nNo attached file for a copy of the Training Certificate on Trainer's Methodology (TM) I or it's equivalent!";
            }
        }

        var hasCertOfTraining = JSON.parse(req.body.hasCertOfTraining);
        let certOfTraining;
        let certOfTrainingPublicID=null;
        if(hasCertOfTraining==true){
            if(req.files.certOfTraining){
                const filePath= req.files.certOfTraining[0].path;
                const uploaded = await cloudinary.uploader.upload(filePath, {
                folder: "uploads",
                resource_type: "auto",
                });

                certOfTraining=uploaded.secure_url;
                certOfTrainingPublicID=uploaded.public_id;
                fs.unlinkSync(filePath);
            }else{
                hasCertOfTraining=false;
                errorMessage=errorMessage+"\nNo attached file for Certificate/s of Training relevant to registered programs/s!";
            }
        }
        
        var hasCertOfEmployment = JSON.parse(req.body.hasCertOfEmployment);
        let certOfEmployment;
        let certOfEmploymentPublicID=null;
        if(hasCertOfEmployment==true){
            if(req.files.certOfEmployment){
                const filePath= req.files.certOfEmployment[0].path;
                const uploaded = await cloudinary.uploader.upload(filePath, {
                folder: "uploads",
                resource_type: "auto",
                });

                certOfEmployment=uploaded.secure_url;
                certOfEmploymentPublicID=uploaded.public_id;
                fs.unlinkSync(filePath);
            }else{
                hasCertOfEmployment=false;
                errorMessage=errorMessage+"\nNo attached file for Certified true copy of notarized Contract of Employment!";
            }
        }
        
        session.startTransaction();

        const userInput = new UserInput();
        userInput.nameOfTVI = nameOfTVI;
        userInput.address = address;
        userInput.qualification = qualification;
        userInput.nameOfTrainer = nameOfTrainer;
        userInput.letter = letter;
        userInput.letterPublicID = letterPublicID;
        userInput.f20_TVET_NTTC = f20_TVET_NTTC;
        userInput.f20_TVET_NTTCPublicID = f20_TVET_NTTCPublicID;
        userInput.copyOfTM = copyOfTM;
        userInput.copyOfTMPublicID = copyOfTMPublicID;
        userInput.certOfTraining= certOfTraining;
        userInput.certOfTrainingPublicID= certOfTrainingPublicID;
        userInput.certOfEmployment = certOfEmployment;
        userInput.certOfEmploymentPublicID = certOfEmploymentPublicID;

        await userInput.save({session});

        await session.commitTransaction();
        
        res.status(200).json({success: true, message: "Saved Successfully!"+errorMessage});
    }catch(error){
        if(session.inTransaction()){
            await session.abortTransaction();
        }
        
        console.error("Error in User Input creation! - "+error.message);
        res.status(500).json({success: false, message:"Server Error"});
    }finally{
        await session.endSession();
    }

    return res;
}

export const getUserInputRecords = async(req, res) =>{
    if(!req.body){
        return res.status(200).json({success: false, message: "Invalid values!"});
    }

    const nameOfTVI= req.body.nameOfTVI;
    const address= req.body.address;
    const qualification=req.body.qualification;
    const nameOfTrainer= req.body.nameOfTrainer;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;

    let searchFilter=[];
    if(nameOfTVI != null && nameOfTVI.length > 0){
        searchFilter.push({"nameOfTVI": {$regex: nameOfTVI, $options: "i"}});
    }

    if(address != null && address.length > 0){
        searchFilter.push({"address": {$regex: address, $options: "i"}});
    }

    if(qualification !=null && qualification.length > 0){
        searchFilter.push({"qualification": {$regex: qualification, $options: "i"}});
    }

    if(nameOfTrainer != null && nameOfTrainer.length > 0){
        searchFilter.push({"nameOfTrainer": {$regex: nameOfTrainer, $options: "i"}});
    }


    if(startDate !==null && startDate !== undefined && startDate.length>0){
        if(!await isDateValid(startDate)){
            return res.status(200).json({success: false, message: "Start date was invalid!"});
        }else if(endDate !==null && endDate !== undefined && endDate.length>0  && !await isDateValid(endDate)){
            return res.status(200).json({success: false, message: "End date was invalid!"});
        }
    }else if(endDate !==null && endDate !== undefined && endDate.length>0){
        return res.status(200).json({success: false, message: "Cannot have an End date without a Start date!"});
    }

    if((!searchFilter || searchFilter.length < 1) && !startDate){
        return res.status(200).json({success: false, message: "Invalid values!"});
    }


    try{
        var matchParams = {};
        if(searchFilter.length>0){
            if(searchFilter.length==1){
                matchParams = {
                    $match: searchFilter[0]                    
                }
            }else{
                matchParams = {
                    $match: {
                        $or: searchFilter
                    }
                }
            }
        }

        if(startDate !==null && startDate !== undefined && startDate.length>0){
            startDate = moment.tz(startDate, 'YYYY-MM-DD', 'Asia/Manila').startOf('day').toDate();

            if(endDate !==null && endDate !== undefined && endDate.length>0){
                endDate = moment.tz(endDate, 'YYYY-MM-DD', 'Asia/Manila').endOf('day').toDate();
            }else{
                endDate = moment.tz(startDate, 'YYYY-MM-DD', 'Asia/Manila').endOf('day').toDate();
            }

            if(Object.keys(matchParams).length>0){
                matchParams.$match["inputDate"]={ 
                    $gte: startDate,
                    $lte: endDate
                };
            }else{
                matchParams={
                    $match:{
                        inputDate:{
                            $gte: startDate,
                            $lte: endDate
                        }
                    }
                }
            }
            
        }

        const userInputs = await UserInput.aggregate([
            matchParams,{
                $project:{
                    _id: 1,
                    nameOfTVI: 1,
                    address: 1,
                    qualification: 1,
                    nameOfTrainer: 1,
                    letter: 1,
                    f20_TVET_NTTC: 1,
                    copyOfTM: 1,
                    certOfTraining: 1,
                    certOfEmployment: 1,
                    inputDate: {
                            $dateToString: {
                            date: '$inputDate',
                            format: '%Y-%m-%d %H:%M:%S', // Example format: YYYY-MM-DD HH:MM:SS
                            timezone: 'Asia/Manila'
                        }
                    }
                    }
            }
        ]);

        if(!userInputs instanceof Array || userInputs.length === 0){
            res.status(200).json({success: false, message: "No record found!"});
        }else{
            res.status(200).json({success: true, data: userInputs});
        }
       
    }catch(error){
       console.error("Error in retrieving User Inputs! - "+error.message);
        res.status(500).json({success: false, message:"Server Error"}); 
    }

    return res;
}

export const getDailyRecords = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const result = await UserInput.aggregate([
      {
        $match: {
          inputDate: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$inputDate" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const data = result.map(item => ({
      date: item._id,
      count: item.count
    }));

    res.json({success: true, data: data});
  } catch (err) {
    console.error("Error aggregating daily records:", err);
    res.status(200).json({success: false,  message: "Server error!" });
  }

  return res;
}