import express from 'express';
import userAuthentication from '../functions/userAuthentication.js';
import { upload } from '../functions/uploader.js';
import { recordUserInputCloud, getUserInputRecords, getDailyRecords } from '../controllers/userInput.controller.js';

const router =express.Router();

router.post("/record-cloud", upload.fields([
    { name: "letter", maxCount: 1 },
    { name: "f20_TVET_NTTC", maxCount: 1 },
    { name: "copyOfTM", maxCount: 1 },
    { name: "certOfTraining", maxCount: 1 },
    { name: "certOfEmployment", maxCount: 1 }
  ]), recordUserInputCloud);

router.post("/search", userAuthentication, getUserInputRecords);
router.get("/dashboard-data", userAuthentication, getDailyRecords);

export default router;