import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../Success/Success.css";


export const BookingStatus = () => {
    const [bookingDetails, setBookingDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");
  
    useEffect(() => {
      if (!orderId) {
        setLoading(false);
        return;
      }
  
      axios.get(`/api/bookings/booking/${orderId}`)
        .then(response => {
          setBookingDetails(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching booking details:", error);
          setLoading(false);
        });
    }, [orderId]);
  
    return (
      <div className="invoice-container">
        <h2 className="invoice-title">Payment Successful!</h2>
        {loading ? (
          <p>Loading booking details...</p>
        ) : bookingDetails ? (
          <div className="invoice">
            {/* <h3>Booking Invoice</h3> */}
            <div className="invoice-header">
              {/* <div className="company-details">
                <p><strong>Gymnazien</strong></p>
                <p>Mr. Shubham Rajput</p>
                <p>Mobile: +91 93707 19213</p>
                <p>Email: Pune2025.ART@gmail.com</p>
              </div> */}
              <div className="invoice-meta">
                <p><strong>Booking Number:</strong> {orderId}</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              </div>
            </div>
  
            <div className="invoice-details">
              <p><strong>Name:</strong> {bookingDetails.name}</p>
              <p><strong>Team:</strong> {bookingDetails.teamType}</p>
              <p><strong>State:</strong> {bookingDetails.state}</p>
              <p><strong>Accommodation Type</strong> {bookingDetails.hotelName}</p>
              <p><strong>Check-in:</strong> {bookingDetails.checkIn}</p>
              <p><strong>Check-out:</strong> {bookingDetails.checkOut}</p>
              <p><strong>Total Members:</strong> {bookingDetails.totalMembers}</p>
              <p><strong>Type 1 Rooms:</strong> {bookingDetails.roomDetails.roomType1}</p>
              <p><strong>Type 2 Rooms:</strong> {bookingDetails.roomDetails.roomType2}</p>
              {/* <p><strong>Selected Members:</strong></p> */}
              
              {/* {bookingDetails.memberDetails && bookingDetails.memberDetails.length > 0 ? (
                <table className="members-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Member Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingDetails.memberDetails.map((member, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{member.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No members selected.</p>
              )} */}
  
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
export default BookingStatus;  
