// src/pages/BookingPortal.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AccommodationInformation from '../../pdfs/Accommodation Information from LOC - Pune 2025.pdf';
import JuniorAndSenior from '../../pdfs/Junior and Senior ART National Championship 2025 Pune, MAH.pdf';
import PuneArtisticNationals from '../../pdfs/Pune Artistic Nationals OC Communication.pdf';
import CompetitionScedule from '../../pdfs/Competition Schedule MAG & WAG - Pune 2025.pdf'
import subdivision from '../../pdfs/MAG Sub Divisions.pdf'
import './BookingPortal.css';



const BookingPortal = () => {
  const navigate = useNavigate();

  const bookingOptions = [
    {
      title: "(MAG & WAG) Accommodation Booking",
      description: "Book accommodations for WAG/MAG event participants",
      route: "/mag-wag-booking",
      icon: "🛋️",
      bgColor: "linear-gradient(135deg,rgb(67, 139, 233) 0%,rgb(56, 249, 188) 100%)"
    },
    {
      title: "International Athletes Accommodation Booking",
      description: "Accommodation booking for international athletes",
      route: "/international-athlete-booking",
      icon: "🌍",
       bgColor: "linear-gradient(135deg,rgb(145, 91, 252) 0%,rgb(200, 184, 255) 100%)"
    },
    // {
    //   title: "Nominative Entry",
    //   description: "Register for nominative entries (judges, coaches, etc.)",
    //   route: "/nominative-booking",
    //   icon: "📋",
    //   bgColor: "linear-gradient(135deg,rgb(233, 158, 67) 0%,rgb(141, 61, 184) 100%)"
    // },
  ];

  return (
<>

<div className="booking-portal-page">

 <div className='punelogo'>
 </div>

 <div className="portal-hero">
     <h1>Junior & Senior Artistic Gymnastics National Championships</h1>
     <h2>Pune, Maharashtra - 25th April to 3rd May 2025</h2>
     <h3>Nationals 2025-26</h3>
 </div>

 <div className="booking-options-container">
   {bookingOptions.map((option, index) => (
     <div 
       key={index}
       className="booking-card"
       onClick={() => navigate(option.route)}
       style={{ background: option.bgColor }}
     >
       <div className="card-icon">{option.icon}</div>
       <h3>{option.title}</h3>
       <p>{option.description}</p>
       <div className="card-arrow">→</div>
     </div>
   ))}
 </div>

<div className="pdf-section">
  <h2 className="pdf-heading">LOC Documents</h2>
  <div className="pdf-card-container">
    <a href={AccommodationInformation} target="_blank" rel="noopener noreferrer" className="pdf-card">
      <div className="pdf-icon">📑</div>
      <h4>Accommodation Info</h4>
      <p>Details provided by LOC for Pune 2025 accommodations.</p>
    </a>
    <a href={JuniorAndSenior} target="_blank" rel="noopener noreferrer" className="pdf-card">
      <div className="pdf-icon">📑</div>
      <h4>Championship Circular</h4>
      <p>Junior & Senior ART Nationals 2025 official circular.</p>
    </a>
    <a href={PuneArtisticNationals} target="_blank" rel="noopener noreferrer" className="pdf-card">
      <div className="pdf-icon">📑</div>
      <h4>OC Communication</h4>
      <p>Important communication from the organizing committee.</p>
    </a>
    <a href={CompetitionScedule} target="_blank" rel="noopener noreferrer" className="pdf-card">
      <div className="pdf-icon">📑</div>
      <h4>MAG WAG Schedule</h4>
      <p>Competition Schedule MAG & WAG</p>
    </a>
    <a href={subdivision} target="_blank" rel="noopener noreferrer" className="pdf-card">
      <div className="pdf-icon">📑</div>
      <h4>MAG Sub Divisions</h4>
      <p></p>
    </a>
  </div>
</div>
</div>

</>


  );
};

export default BookingPortal;