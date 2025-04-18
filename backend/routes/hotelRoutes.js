import express from "express";
import { 
  createBooking, 
  checkStatus, 
  getBookingDetails,
  updateRoomAvailability, 
  excelExport
} from "../controllers/bookingController.js"; 

const router = express.Router();

// Create a booking
router.post("/", createBooking);

// Check payment status
router.get("/status/:order_id", checkStatus);

// Get booking details by order ID
router.get("/booking/:order_id", getBookingDetails);

// Update room availability
router.put("/accommodations/:id/update-rooms", updateRoomAvailability);

// Export bookings to Excel
router.get("/export-bookings", excelExport);

export default router;


// const express = require("express");
// const Hotel = require("../models/Hotel");
// const router = express.Router();

// // Get all hotels
// router.get("/hotels", async (req, res) => {
//   try {
//     const hotels = await Hotel.find();
//     res.json(hotels);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Update room availability
// router.patch("/hotels/:id/rooms", async (req, res) => {
//   try {
//     const { roomType, quantity } = req.body;
//     const hotel = await Hotel.findById(req.params.id);
    
//     const roomTypeObj = hotel.roomTypes.find(rt => rt.capacity === roomType);
//     if (!roomTypeObj) {
//       return res.status(404).json({ message: "Room type not found" });
//     }
    
//     if (roomTypeObj.availableRooms < quantity) {
//       return res.status(400).json({ message: "Not enough rooms available" });
//     }
    
//     roomTypeObj.availableRooms -= quantity;
//     await hotel.save();
    
//     res.json(hotel);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;