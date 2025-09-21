import mongoose from 'mongoose';

const UserInputSchema = new mongoose.Schema({
    nameOfTVI:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    qualification:{
        type: String,
        required: true
    },
    nameOfTrainer:{
        type: String,
        required: true
    },
    letter:{
        type: String,
    },
    letterPublicID:{
        type: String,
        default: null
    },
    f20_TVET_NTTC:{
        type: String,
    },
    f20_TVET_NTTCPUblicID:{
        type: String,
        default: null
    },
    copyOfTM:{
        type: String
    },
    copyOfTMPublicID:{
        type: String,
        default: null
    },
    certOfTraining:{
        type: String
    },
    certOfTrainingPublicID:{
        type: String,
        default: null
    },
    certOfEmployment:{
        type: String
    },
    certOfEmploymentPublicID:{
        type: String,
        default: null
    },
    inputDate:{
        type: Date,
        required: true,
        default: Date.now()
    }
});

const UserInput=mongoose.model('UserInput', UserInputSchema);

export default UserInput;