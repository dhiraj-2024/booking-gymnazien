import express from "express";
import {
  createNominativeEntry,
  checkNominativeStatus,
  getNominativeDetails
} from "../controllers/nominativeController.js";

const router = express.Router();

router.post("/", createNominativeEntry);
router.get("/status/:order_id", checkNominativeStatus);
router.get("/:order_id", getNominativeDetails);

export default router;


// // backend/routes/nominativeRoutes.js
// import express from "express";
// import { 
//   createNominativeEntry, 
//   checkNominativeStatus, 
//   getNominativeDetails 
// } from "../controllers/nominativeController.js";

// const router = express.Router();

// router.post("/", createNominativeEntry);
// router.get("/status/:order_id", checkNominativeStatus);
// router.get("/:order_id", getNominativeDetails);

// export default router;

