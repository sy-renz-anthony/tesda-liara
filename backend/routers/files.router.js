import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

router.get("/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(process.cwd(), "uploads", filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(200).json({ success: false, message: "File not found!" });
  }
});

export default router;