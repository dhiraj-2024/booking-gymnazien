import Booking from "../models/Booking.js";
import Accommodation from "../models/Accommodation.js";
import axios from "axios";
import ExcelJS from "exceljs";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;


export const createBooking = async (req, res) => {
  try {
    const {  //! teamName, memberDetails 
      name, teamType, state, mobileNumber, email,
      checkIn, checkOut, stayDuration,  totalPrice,
      hotelId, hotelName, roomType1, roomType2, accommodationType
    } = req.body;

    if (!hotelId) {
      return res.status(400).json({ 
        success: false,
        message: "Hotel ID is required" 
      });
    }

    const orderId = `BOOK-${Date.now()}`;
    // const totalMembers = memberDetails.length;
    const personsPerType1 = accommodationType === "hostel" ? 3 : 2;
    const personsPerType2 = accommodationType === "hostel" ? 4 : 3;
    const totalMembers = (roomType1 * personsPerType1) + (roomType2 * personsPerType2);

    const totalRooms = roomType1 + roomType2;

    const newBooking = new Booking({
      name,
      // teamName,
      teamType,
      state,
      mobileNumber,
      email,
      checkIn,
      checkOut,
      stayDuration,
      // memberDetails,
      totalPrice,
      hotelId,
      hotelName,
      accommodationType,
      roomDetails: {
        roomType1,
        roomType2
      },
      totalMembers,
      totalRooms,
      paymentStatus: "PENDING",
      orderId
    });

    await newBooking.save();

    const cashfreeResponse = await axios.post(process.env.CASHFREE_API_URL,
      {
        order_id: orderId,
        order_amount: totalPrice,
        order_currency: "INR",
        customer_details: {
          customer_id: `CUST-${Date.now()}`,
          customer_name: name,
          customer_email: email,
          customer_phone: mobileNumber,
        },
        order_meta: {
          return_url: `${process.env.FRONTEND_URL}/success?${orderId}`,
          notify_url: `${process.env.BACKEND_URL}/api/bookings/status/${orderId}`,
          payment_methods: 'cc,dc,upi,nb',
          order_type: "hotel_booking"
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-client-id": process.env.CASHFREE_CLIENT_ID,
          "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
          "x-api-version": process.env.CASHFREE_API_VERSION
        }
      }
    );

    res.json({
      success: true,
      sessionId: cashfreeResponse.data.payment_session_id,
      order_id: orderId
    });

  } catch (error) {
    console.error("Booking Error:", error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: error.response?.data?.message || "Booking creation failed" 
    });
  }
};

export const checkStatus = async (req, res) => {
  try {
    const { order_id } = req.params;

    const response = await axios.get(
      `${process.env.CASHFREE_API_URL}/${order_id}/payments`, 
      {
        headers: {
          "x-client-id": process.env.CASHFREE_CLIENT_ID,
          "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
          "x-api-version": process.env.CASHFREE_API_VERSION
        }
      }
    );

    const paymentStatus = response.data[0]?.payment_status || 'PENDING';
    const booking = await Booking.findOne({ orderId: order_id });

    if (!booking) {
      console.error(`Booking not found for order: ${order_id}`);
      return res.status(404).json({ 
        success: false, 
        message: "Booking not found" 
      });
    }
    
    if (paymentStatus === 'SUCCESS' && booking.paymentStatus !== 'PAID') {
        try {
          // Update room availability
          const updatedHotel = await Accommodation.findOneAndUpdate(
            { 
              _id: booking.hotelId,
              type: 'hotel'
            },
            { 
              $inc: { availableRooms: -booking.totalRooms },
              $set: { updatedAt: new Date() }
            },
            { new: true }
          );

          if (!updatedHotel) {
            console.error(`Hotel not found or not a hotel type: ${booking.hotelId}`);
          }
        } catch (error) {
          console.error("Error updating hotel availability:", error);
        }

        // Update booking status
        await Booking.findOneAndUpdate(
          { orderId: order_id },
          { paymentStatus: 'PAID' },
          { new: true }
        );
        return res.redirect(
          `${process.env.FRONTEND_URL}/success?order_id=${order_id}`
        );
    } else {
      await Booking.findOneAndUpdate(
        { orderId: order_id },
        { paymentStatus: 'FAILED' },
        { new: true }
      );
      
      return res.redirect(
        `${process.env.FRONTEND_URL}/failure?order_id=${order_id}`
      );
    }
  } catch (error) {
    console.error("Status Check Error:", error);
    return res.redirect(
      `${process.env.FRONTEND_URL}/failure?error=status_check_failed`
    );
  }
};

export const getBookingDetails = async (req, res) => {
  try {
    const { order_id } = req.params;
    const booking = await Booking.findOne({ orderId: order_id });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const response = await axios.get(
      `${process.env.CASHFREE_API_URL}/${order_id}/payments`,
      {
        headers: {
          "x-client-id": process.env.CASHFREE_CLIENT_ID,
          "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
          "x-api-version": process.env.CASHFREE_API_VERSION,
        },
      }
    );

    const paymentStatus = response.data[0]?.payment_status || "PENDING";

    if (paymentStatus === "SUCCESS" && booking.paymentStatus !== "PAID") {
      try {
        // Update room availability
        const updatedHotel = await Accommodation.findOneAndUpdate(
          {
            _id: new ObjectId(booking.hotelId),
            type: booking.accommodationType,
          },
          {
            $inc: { availableRooms: -booking.totalRooms },
            $set: { updatedAt: new Date() },
          },
          { new: true }
        );

        if (!updatedHotel) {
          console.error(
            `Hotel not found or not a hotel type: ${booking.hotelId}`
          );
        }
      } catch (error) {
        console.error("Error updating hotel availability:", error);
      }

      // Update booking status
      await Booking.findOneAndUpdate(
        { orderId: order_id },
        { paymentStatus: "PAID" },
        { new: true }
      );
      return res.json(booking);
    } else {
      await Booking.findOneAndUpdate(
        { orderId: order_id },
        { paymentStatus: "FAILED" },
        { new: true }
      );

      // Ensure proper redirection
      return res.redirect(
        `${process.env.FRONTEND_URL}/failure?order_id=${order_id}`
      );
    }
  } catch (error) {
    console.error("Error fetching booking details:", error);
    // Redirect to failure page with error details
    return res.redirect(
      `${process.env.FRONTEND_URL}/failure?error=server_error`
    );
  }
};

export const updateRoomAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomsBooked } = req.body;

    const accommodation = await Accommodation.findById(id);
    if (!accommodation) {
      return res.status(404).json({ success: false, message: "Accommodation not found" });
    }

    // Prevent negative availability
    if (accommodation.availableRooms < roomsBooked) {
      return res.status(400).json({ 
        success: false, 
        message: "Not enough rooms available" 
      });
    }

    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      id,
      { $inc: { availableRooms: -roomsBooked } },
      { new: true }
    );

    res.json({ 
      success: true, 
      availableRooms: updatedAccommodation.availableRooms 
    });
  } catch (error) {
    console.error("Error updating room availability:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const excelExport = async (req, res) => {
  try {
    // Fetch all bookings from database
    const bookings = await Booking.find({});

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Bookings');

    // Add headers
    worksheet.columns = [
      { header: 'Order ID', key: 'orderId', width: 20 },
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Team Type', key: 'teamType', width: 15 },
      { header: 'State', key: 'state', width: 20 },
      { header: 'Mobile', key: 'mobileNumber', width: 15 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Accommodation Type', key: 'accommodationType', width: 20 },
      { header: 'Check In', key: 'checkIn', width: 15 },
      { header: 'Check Out', key: 'checkOut', width: 15 },
      { header: 'Duration', key: 'stayDuration', width: 10 },
      // { header: 'Hotel Name', key: 'hotelName', width: 30 },
      { header: 'Room Type 1', key: 'roomType1', width: 15 },
      { header: 'Room Type 2', key: 'roomType2', width: 15 },
      { header: 'Total Members', key: 'totalMembers', width: 15 },
      { header: 'Total Rooms', key: 'totalRooms', width: 15 },
      { header: 'Total Price', key: 'totalPrice', width: 15 },
      { header: 'Payment Status', key: 'paymentStatus', width: 15 },
      { header: 'Booking Date', key: 'createdAt', width: 20 }
    ];

    // Add data rows
    bookings.forEach(booking => {
      worksheet.addRow({
        orderId: booking.orderId,
        name: booking.name,
        teamType: booking.teamType,
        state: booking.state,
        mobileNumber: booking.mobileNumber,
        email: booking.email,
        accommodationType: booking.accommodationType,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        stayDuration: booking.stayDuration,
        // hotelName: booking.hotelName,
        roomType1: booking.roomDetails.roomType1,
        roomType2: booking.roomDetails.roomType2,
        totalMembers: booking.totalMembers,
        totalRooms: booking.totalRooms,
        totalPrice: booking.totalPrice,
        paymentStatus: booking.paymentStatus,
        createdAt: booking.createdAt.toISOString().split('T')[0]
      });
    });

    // Set response headers for Excel file download
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=bookings.xlsx'
    );

    // Write workbook to response
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ success: false, message: 'Export failed' });
  }
};