import Staff from '../models/staff.model.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createTranporter from "../config/nodemailer_config.js";
import mongoose from "mongoose";
import { isUserEmailExisting, isUserIDExisting } from '../functions/functions.js';

export const register = async(req, res) =>{
    if(!req.body){
        return res.status(200).json({success: false, message: "Invalid values!"});
    }

    const empID =  req.body.employeeID;
    const lName = req.body.lastName;
    const fName = req.body.firstName;
    const mName = req.body.middleName;
    const contactNum = req.body.contactNumber;
    const emailAdd = req.body.emailAddress;
    const add = req.body.address;
    
    if(!empID){
        return res.status(200).json({success: false, message: "Invalid Staff ID!"});
    }

    if(!lName){
        return res.status(200).json({success: false, message: "Please provide the staff's Last Name!"});
    }else if(!fName){
        return res.status(200).json({success: false, message: "Please provide the staff's First Name!"});
    }else if(!mName){
        return res.status(200).json({success: false, message: "Please provide the staff's Middle Name!"});
    }


    if(!contactNum){
        return res.status(200).json({success: false, message: "Please provide the staff's Contact Number!"});
    }

    if(!emailAdd){
        return res.status(200).json({success: false, message: "Please provide the staff's Email Address!"});
    }

    
    
    if(!add){
        return res.status(200).json({success: false, message: "Please provide the staff's address!"});
    }

    const salt = Number (process.env.SALT || 10);

    const session = await mongoose.startSession();
    try{
        
        if(await isUserIDExisting(empID)){
            return res.status(200).json({success: false, message: "Staff ID is already registered!"});
        }

        if(await isUserEmailExisting(emailAdd)){
            return res.status(200).json({success: false, message: "Email Address is already in use!"});
        }

        session.startTransaction();
        const pwd = Math.random().toString(36).slice(2, 12);
        const hashedPassword = await bcrypt.hash(pwd, salt);

        const user = new Staff();
        user.employeeID = empID.toString();
        user.password = hashedPassword;
        user.lastName=lName;
        user.firstName=fName;
        user.middleName=mName;
        user.contactNumber=contactNum;
        user.emailAddress=emailAdd;
        user.address=add;
        
        await user.save({session});

        const mailContents = {
            from: process.env.SENDER_EMAIL_ID,
            to: emailAdd,
            subject: "Welcome to TESDA-Liara's project Staff Portal",
            text: `Welcome to TESDA-Liara's project Staff Portal. You have successfully registered your account with email: `+emailAdd+"\n\nA random password is generated for you: "+pwd+"\n\nPlease update this when you login.\n\nThank you."
        }

        try{
            const transporter = createTranporter();
            await transporter.sendMail(mailContents);
        }catch(error){
            console.error("An error occured while trying to send email to user");
        }
        
        await session.commitTransaction();

        res.status(200).json({success: true, data: [user]});
    }catch(error){
        if(session.inTransaction()){
            await session.abortTransaction();
        }
        console.error("Error in Staff Account creation! - "+error.message);
        res.status(500).json({success: false, message:"Server Error"});
    }finally{
        await session.endSession();
    }

    return res;
}

export const update = async(req, res) =>{
    if(!req.body){
        return res.status(400).json({success: false, message: "Invalid values!"});
    }

    const id=req.body._id;
    const empID =  req.body.employeeID;
    const lName = req.body.lastName;
    const fName = req.body.firstName;
    const mName = req.body.middleName;
    const contactNum = req.body.contactNumber;
    const emailAdd = req.body.emailAddress;
    const add = req.body.address;
    
    if(!empID){
        return res.status(200).json({success: false, message: "Invalid Employee ID!"});
    }

    if(!lName){
        return res.status(200).json({success: false, message: "Please provide the employee's Last Name!"});
    }else if(!fName){
        return res.status(200).json({success: false, message: "Please provide the employee's First Name!"});
    }else if(!mName){
        return res.status(200).json({success: false, message: "Please provide the employee's Middle Name!"});
    }

    if(!contactNum){
        return res.status(200).json({success: false, message: "Please provide the employee's Contact Number!"});
    }

    if(!emailAdd){
        return res.status(200).json({success: false, message: "Please provide the employee's Email Address!"});
    }
    
    if(!add){
        return res.status(200).json({success: false, message: "Please provide the employee's address!"});
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(200).json({success: false, message: "Invalid Employee DB ID!"});
    }

    const session = await mongoose.startSession();
    try{

        const onRecordUser = await Staff.findById(id);
        if(!onRecordUser){
            return res.status(200).json({success: false, message: "Invalid Employee DB ID!"});
        }
        
        if(await isUserIDExisting(empID, id)){
            return res.status(200).json({success: false, message: "Employee ID is already in use!"});
        }

        if(await isUserEmailExisting(emailAdd, id)){
            return res.status(200).json({success: false, message: "Email Address is already in use!"});
        }

        session.startTransaction();

        onRecordUser.employeeID = empID.toString();
        onRecordUser.lastName=lName;
        onRecordUser.firstName=fName;
        onRecordUser.middleName=mName;
        onRecordUser.contactNumber=contactNum;
        onRecordUser.emailAddress=emailAdd;
        onRecordUser.address=add;
        
        const updatedUser =await Staff.findByIdAndUpdate(id, onRecordUser, {new:true, session});

        await session.commitTransaction();

        res.status(200).json({success: true, data: updatedUser});
    }catch(error){
        await session.abortTransaction();
        console.error("Error in Staff Account update! - "+error.message);
        res.status(500).json({success: false, message:"Server Error"});
    }finally{
        await session.endSession();
    }

    return res;
}

export const login = async (req, res) =>{
    if(!req.body){
        return res.status(200).json({success: false, message: "Invalid values!"});
    }

    const employeeID = req.body.employeeID;
    const password = req.body.password;

    if(!employeeID){
        return res.status(200).json({success: false, message: "Invalid Employee ID number!"});
    }

    if(!password){
        return res.status(200).json({success: false, message: "Invalid Password!"});
    }

    try{
        const userData = await Staff.findOne({employeeID});
        if(!userData){
            return res.status(200).json({success: false, message: "Invalid Employee ID number or Password!"});
        }

        const correctPassword = await bcrypt.compare(password, userData.password);

        if(!correctPassword){
            return res.status(200).json({success: false, message: "Invalid Employee ID number or Password!"});
        }

        const token = jwt.sign({id: userData._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const loggedInData={
            employeeID: userData.employeeID,
            firstName: userData.firstName,
            lastName: userData.lastName,
            middleName: userData.middleName,
            emailAddress: userData.emailAddress,
            contactNumber: userData.contactNumber,
            address: userData.address,
        }

        res.status(200).json({success: true, message: "Login Successful!", token: token, data: loggedInData});

    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }

    return res;
}

export const logout = async (req, res) =>{
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict'
        });

        res.status(200).json({success: true, message: "Logged out!"});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }

    return res;
}

export const sendPasswordResetOTP = async (req, res) =>{
    if(!req.body){
        return res.status(200).json({success: false, message: "Invalid values!"});
    }

    const email = req.body.emailAddress;

    if(!email){
        return res.status(200).json({success: false, message: "Invalid email!"});
    }

    const session = await mongoose.startSession();
    try{
        const userData = await Staff.findOne({emailAddress: email});
        if(!userData){
            res.status(200).json({success: false, message: "No Employee Account found with this email!"});
        }else{
            session.startTransaction();
            const otp = String(Math.floor(100000 + Math.random() * 900000));

            userData.resetOTP = otp;
            userData.resetOTPExpire = Date.now() + 5 * 60 * 1000;

            await Staff.findByIdAndUpdate(userData._id, userData, {new:true, session});

            const mailContents = {
                from: process.env.SENDER_EMAIL_ID,
                to: userData.emailAddress,
                subject: "TESDA-Liara's project Staff Portal Password Reset verification OTP",
                text: `Your TESDA-Liara's project Staff Portal Password Reset OTP code is ${otp}. Please verify your account using this code to reset your password.`
            }
            const transporter = createTranporter();
            await transporter.sendMail(mailContents);

            await session.commitTransaction();
            res.status(200).json({success: true, message: "Password Reset OTP codes sent successfully!"});
        }

    }catch(error){
        await session.abortTransaction();
        console.error("Error in creating a Password reset OTP codes for User Account! - "+error.message);
        res.status(500).json({success: false, message: error.message});
    }finally{
        await session.endSession();
    }

    return res;
}

export const resetPassword = async (req, res) =>{
    if(!req.body){
        return res.status(200).json({success: false, message: "Invalid values!"});
    }

    const employeeID = req.body.employeeID;
    const otp = req.body.otp;
    const newPassword =req.body.password;
    const confirmNewPassword = req.body.confirmPassword;

    if(!employeeID){
        return res.status(200).json({success: false, message: "Please fill-in your Staff ID# to reset password!"});
    }else if(!otp){
        return res.status(200).json({success: false, message: "Input the OTP codes to reset password!"});
    }else if(!newPassword){
        return res.status(200).json({success: false, message: "Please input your new password!"});
    }else if(newPassword.length<10){
        return res.status(200).json({success: false, message: "Passwords should not be less than 10 characters in length!"});
    }else if(!confirmNewPassword){
        return res.status(200).json({success: false, message: "Please confirm your password!"});
    }else if(newPassword !== confirmNewPassword){
        return res.status(200).json({success: false, message: "Passwords mismatched! Please confirm your password again."});
    }

    try{
        const userData = await Staff.findOne({"employeeID": employeeID});

        if(!userData){
            res.status(200).json({success: false, message: "Employee Account not found!"});
        }else if(userData.resetOTP === "" || userData.resetOTP !== otp){
            res.status(200).json({success: false, message: "Invalid OTP codes!"});
        }else if(userData.resetOTPExpire <= Date.now()){
            res.status(200).json({success: false, message: "OTP codes are already expired!"});
        }else{
            const salt = Number (process.env.SALT || 10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            userData.password = hashedPassword;
            userData.resetOTP="";
            userData.resetOTPExpire=0;
            
            await Staff.findByIdAndUpdate(userData._id, userData);

            res.status(200).json({success: true, message: "Password reset successfully!"});
        }

    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }

    return res;
}

export const changePassword = async (req, res) =>{
    if(!req.body){
        return res.status(400).json({success: false, message: "Invalid values!"});
    }

    const newPassword=req.body.password;
    const confirmNewPassword=req.body.confirmPassword;
    const id = req.body._id;

    if(!newPassword || newPassword.length < 10){
        return res.status(404).json({success: false, message: "Invalid new password!"});
    }
    if(!confirmNewPassword){
        return res.status(404).json({success: false, message: "Please confirm new password!"});
    }
    if(newPassword !== confirmNewPassword){
        return res.status(404).json({success: false, message: "Passwords mismatched! Please confirm new password again!"});
    }

    if(!id || !mongoose.isValidObjectId(id)){
        return res.status(401).json({success: false, message: "Invalid Employee Database ID!"});
    }

    const salt = Number (process.env.SALT || 10);
    const session = await mongoose.startSession();
    try{
        const user=await Staff.findById(id);
        if(!user){
            return res.status(401).json({success: false, message: "Authentication failed!"});
        }

        session.startTransaction();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        await Staff.findByIdAndUpdate(id, user, {new: true, session});
        await session.commitTransaction();
        res.status(200).json({success: true, message: "Password updated successfully!"});
    }catch(error){
        console.log("error changing password: - "+error.message);
        res.status(500).json({success: false, message: "Server Error!\n"+error.message});
        await session.abortTransaction();
    }finally{
        await session.endSession();
    }

    return res;
}

export const getMyInfo = async(req, res) =>{
    if(!req.body){
        return res.status(400).json({success: false, message: "Invalid values!"});
    }

    const id = req.body._id;

    if(!id || !mongoose.isValidObjectId(id)){
        return res.status(401).json({success: false, message: "Invalid Employee Database ID!"});
    }

    const session = await mongoose.startSession();
    try{
        const user=await Staff.findById(id);

        if(!user){
            return res.status(401).json({success: false, message: "Authentication failed!"});
        }

        const data={
            employeeID: user.employeeID,
            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName,
            emailAddress: user.emailAddress,
            contactNumber: user.contactNumber,
            address: user.address
        }

        res.status(200).json({success: true, data: data});
    }catch(error){
        console.log("error retrieving your Personal Info: - "+error.message);
        res.status(500).json({success: false, message: "Server Error!\n"+error.message});
        await session.abortTransaction();
    }finally{
        await session.endSession();
    }

    return res;
}

export const isOTPCodesCorrect = async (req, res) =>{
    if(!req.body){
        return res.status(400).json({success: false, message: "Invalid values!"});
    }

    const employeeID = req.body.employeeID;
    const otp = req.body.otp;
    
    if(!employeeID){
        return res.status(200).json({success: false, message: "Please fill-in your Employee ID# to reset password!"});
    }else if(!otp){
        return res.status(200).json({success: false, message: "Input the OTP codes to reset password!"});
    }

    try{
        const userData = await Staff.findOne({"employeeID": employeeID});

        var output = {success: true, message: "OTP codes are valid!"};

        if(!userData){
            output={success: false, message: "Employee Account not found!"};
        }else if(userData.resetOTP === "" || userData.resetOTP !== otp){
            output = {success: false, message: "Invalid OTP codes!"};
        }else if(userData.resetOTPExpire <= Date.now()){
            output={success: false, message: "OTP codes are already expired!"};
        }

        res.status(200).json(output);
        
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }

    return res;
}

export const validateMyPassword = async(req, res) =>{
    if(!req.body){
        return res.status(400).json({success: false, message: "Invalid values!"});
    }
    const id= req.body._id;
    const password=req.body.password;

    if(!id || !mongoose.isValidObjectId(id)){
        return res.status(401).json({success: false, message: "Authentication failed!"});
    } 

    if(!password){
        return res.status(200).json({success: false, message: "Invalid Password!"});
    }

    try{
        const personalInfo = await Staff.findById(id).select("-resetOTPExpire -resetOTP");
        if(!personalInfo){
            return res.status(401).json({success: false, message: "Authentication failed!"});
        }

        const correctPassword = await bcrypt.compare(password, personalInfo.password);

        if(!correctPassword){
            return res.status(200).json({success: false, message: "Invalid Password!"});
        }

        res.status(200).json({success: true, message:"Password Validated!"});

    }catch(error){
        console.log("Server Error! - "+error.message);
        res.status(500).json({success: false, message: "Server Error!\n"+error.message});
    }

    return res;
}

export const validateMyToken = async(req, res) =>{
    return res.status(200).json({success: true, message: "Token is still valid!"});
}