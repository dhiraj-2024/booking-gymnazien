import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./InternationalAthleteSuccess.css";


const InternationalAthleteSuccess = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");


  // Add this useEffect to your success component
useEffect(() => {
  if (!orderId) {
    setLoading(false);
    return;
  }

  const fetchData = async () => {
    try {
      // First get booking details
      const bookingResponse = await axios.get(
        `/api/international-athletes/${orderId}`
      );
      
      if (bookingResponse.data.success) {
        setBookingDetails(bookingResponse.data.data);
        
        // Then refresh hotel data
        const hotelResponse = await axios.get(
          `/api/accommodations/${bookingResponse.data.data.hotelId}`
        );
        
        // You can update your global state here if needed
        console.log('Updated hotel data:', hotelResponse.data);
      } else {
        throw new Error(bookingResponse.data.message || "Booking not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [orderId]);

  return (
    <div className="invoice-container">
      <h2 className="invoice-title">Payment Successful!</h2>
      {loading ? (
        <p>Loading booking details...</p>
      ) : bookingDetails ? (
        <div className="invoice">
          <div className="invoice-header">
            <div className="invoice-meta">
              <p><strong>Booking Number:</strong> {orderId}</p>
              <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="invoice-details">
            <p><strong>Name:</strong> {bookingDetails.name}</p>
            <p><strong>Type : </strong> {bookingDetails.hotelName}</p>
            <p><strong>Check-in Date :</strong> {bookingDetails.checkIn}</p>
            <p><strong>Check-out Date :</strong> {bookingDetails.checkOut}</p>
            <p><strong>Stay Duration : </strong> {bookingDetails.stayDuration}</p>
            <p><strong>Total Price:</strong> ₹{bookingDetails.totalPrice}</p>
          </div>
          {/* <div className="Note">📄 Note: This invoice serves as your payment confirmation. Kindly keep a copy for future reference.</div> */}
          <button className="download-button" onClick={() => window.print()}>
            Download Invoice
          </button>
        </div>
      ) : (
        <p>Booking details not found.</p>
      )}
      <a className="home-link" href="/">Back to Home</a>
    </div>
  );
};

export default InternationalAthleteSuccess;