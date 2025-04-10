import express from "express";
import { 
  createInternationalAthlete, 
  checkStatus,
  getInternationalAthleteDetails,
  updateRoomAvailability,
  exportInternationalAthletes
} from "../controllers/internationalAthleteController.js";

const router = express.Router();

router.post("/", createInternationalAthlete);
router.get("/status/:order_id", checkStatus);
router.get("/:order_id", getInternationalAthleteDetails);
router.put("/accommodations/:id/update-rooms", updateRoomAvailability);
router.get("/export/excel", exportInternationalAthletes);

export default router;


// const express = require("express");
// const { 
//   createInternationalAthlete, 
//   checkStatus,
//   getInternationalAthleteDetails,
//   updateRoomAvailability,
//   exportInternationalAthletes
// } = require("../controllers/internationalAthleteController.js");

// const router = express.Router();

// router.post("/", createInternationalAthlete);
// router.get("/status/:order_id", checkStatus);
// router.get("/:order_id", getInternationalAthleteDetails);
// router.put("/accommodations/:id/update-rooms", updateRoomAvailability);
// router.get("/export/excel", exportInternationalAthletes);




// module.exports = router;