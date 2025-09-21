import Staff from '../models/staff.model.js';

export const isUserEmailExisting = async (email, idToExcempt) =>{
    try{
        const staff=await Staff.find({emailAddress: email});

        if(!staff || staff.length<1){
            return false;
        }else if(idToExcempt == staff[0]._id){
            return false;
        }else{
            return true;
        }
    }catch(error){
        console.error("Error in checking existence of Staff email! - "+error.message);
        error.message = "Server Error!\n"+error.message;
        throw(error);
    }
}

export const isUserIDExisting = async (id, idToExcempt) =>{
    try{
        const staff=await Staff.find({employeeID: id.toString()});
        if(!staff || staff.length<1){
            return false;
        }else if(idToExcempt == staff[0]._id){
            return false;
        }else{
            return true;
        }
    }catch(error){
        console.error("Error in checking existence of Staff ID! - "+error.message);
        error.message = "Server Error!\n"+error.message;
        throw(error);
    }
}


export const isDateValid = async (stringInput) =>{
    if(typeof stringInput != 'string'){
        return false;
    }

    const tokens = stringInput.split("-");
    if(tokens.length != 3){
        return false;
    }

    for(var i=0; i<tokens.length; i++){
        if(isNaN(tokens[i]))
            return false;
    }

    if(tokens[0]<999)
        return false;

    if(tokens[1]<1 || tokens[1]>12)
        return false;

    if(tokens[2]<1)
        return false;
    else if(tokens[1] == 2 && tokens[2]>29)
        return false;
    else if((tokens[1] == 1 || tokens[1] == 3 || tokens[1] == 5 || tokens[1] == 7 || tokens[1] == 8 || tokens[1] == 10 || tokens[1] == 12) && tokens[2] > 31)
        return false;
    else if((tokens[1] == 4 || tokens[1] == 6 || tokens[1] == 9 || tokens[1] == 11) && tokens[2] > 30)
        return false;
    
    return true;
}