import Nominative from "../models/Nominative.js";
import axios from "axios";

export const createNominativeEntry = async (req, res) => {
  try {
    const { participants } = req.body;
    
    // Validate participants
    if (!participants || !Array.isArray(participants)) {
      return res.status(400).json({
        success: false,
        message: "Participants data is required"
      });
    }

    //  total amount calculation
    const totalAmount = participants.reduce((total, participant) => {
      return total + (participant.role === "judge" ? 0 : 1000);
    }, 0);

    const orderId = `NOM-${Date.now()}`;
    const primaryParticipant = participants[0];

    // Check if all participants are judges no payment 
    const allJudges = participants.every(p => p.role === "judge");

    const newNominative = new Nominative({
      participants: participants.map(p => ({
        ...p,
        dateOfBirth: new Date(p.dateOfBirth),
        registrationFee: p.role === "judge" ? 0 : 1000,
        paymentStatus: p.role === "judge" ? "FREE" : "PENDING"
      })),
      totalAmount,
      orderId,
      paymentStatus: allJudges ? "FREE" : "PENDING"
    });

    await newNominative.save();

    if (allJudges) {
      return res.json({
        success: true,
        order_id: orderId
      });
    }

    // Proceed with payment for non-judge entries
    const cashfreeResponse = await axios.post(process.env.CASHFREE_API_URL,
      {
        order_id: orderId,
        order_amount: totalAmount,
        order_currency: "INR",
        customer_details: {
          customer_id: `CUST-${Date.now()}`,
          customer_name: `${primaryParticipant.firstName} ${primaryParticipant.lastName}`,
          customer_phone: primaryParticipant.mobileNumber,
        },
        order_meta: {
          return_url: `${process.env.BACKEND_URL}/api/nominative/status/${orderId}`,
          notify_url: `${process.env.BACKEND_URL}/api/nominative/status/${orderId}`,
          payment_methods: 'cc,dc,upi',
          order_type: "nominative_entry"
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
    console.error("Nominative Entry Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || "Nominative entry creation failed"
    });
  }
};

export const checkNominativeStatus = async (req, res) => {
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
    const cfStatus = paymentStatus === 'SUCCESS' ? 'PAID' : 'FAILED';

    // Update both main payment status and individual participant statuses
    await Nominative.findOneAndUpdate(
      { orderId: order_id },
      {
        paymentStatus: cfStatus,
        $set: {
          "participants.$[].paymentStatus": function() {
            return this.role === "judge" ? "FREE" : cfStatus;
          }
        }
      }
    );

    if (paymentStatus === 'SUCCESS') {
      return res.redirect(`${process.env.FRONTEND_URL}/nominative-success?order_id=${order_id}`);
    } else {
      return res.redirect(`${process.env.FRONTEND_URL}/nominative-failure?order_id=${order_id}`);
    }

  } catch (error) {
    console.error("Nominative Status Check Error:", error.response?.data || error.message);
    return res.redirect(`${process.env.FRONTEND_URL}/nominative-failure?error=status_check_failed`);
  }
};

export const getNominativeDetails = async (req, res) => {
  try {
    const { order_id } = req.params;
    const nominative = await Nominative.findOne({ orderId: order_id });

    if (!nominative) {
      return res.status(404).json({ message: "Nominative entry not found" });
    }

    res.json(nominative);
  } catch (error) {
    console.error("Error fetching nominative details:", error);
    res.status(500).json({ message: "Server error" });
  }
};





// // backend/controllers/nominativeController.js
// import Nominative from "../models/Nominative.js"
// import axios from "axios"

// export const createNominativeEntry = async (req, res) => {
//   try {
//     const { 
//       name, role, state, mobileNumber,dateOfBirth,registrationFee    // email, teamName removed
//     } = req.body;


//     if (!dateOfBirth || isNaN(new Date(dateOfBirth).getTime())) {
//         return res.status(400).json({ 
//           success: false,
//           message: "Valid date of birth is required" 
//         });
//       }
  
//     const orderId = `NOM-${Date.now()}`;

//     const newNominative = new Nominative({
//       name,
//       role,
//       state,
//       mobileNumber,
//       dateOfBirth: new Date(dateOfBirth), 
//     //   email,
//     //   teamName,
//       registrationFee,
//       paymentStatus: role === "judge" ? "FREE" : "PENDING",
//       orderId
//     });

//     await newNominative.save();

//     if (role === "judge") {
//       return res.json({
//         success: true,
//         order_id: orderId
//       });
//     }

//     // Proceed with payment for other roles
//     const cashfreeResponse = await axios.post(process.env.CASHFREE_API_URL,
//       {
//         order_id: orderId,
//         order_amount: registrationFee,
//         order_currency: "INR",
//         customer_details: {
//           customer_id: `CUST-${Date.now()}`,
//           customer_name: name,
//         //   customer_email: email,
//           customer_phone: mobileNumber,
//         },
//         order_meta: {
//           return_url: `${process.env.BACKEND_URL}/api/nominative/status/${orderId}`,  
//           notify_url: `${process.env.BACKEND_URL}/api/nominative/status/${orderId}`,  
//           payment_methods: 'cc,dc,upi',
//           order_type: "nominative_entry" 
//         }
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "x-client-id": process.env.CASHFREE_CLIENT_ID,
//           "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
//           "x-api-version": process.env.CASHFREE_API_VERSION
//         }
//       }
//     );

//     res.json({
//       success: true,
//       sessionId: cashfreeResponse.data.payment_session_id,
//       order_id: orderId
//     });

//   } catch (error) {
//     console.error("Nominative Entry Error:", error.response?.data || error.message);
//     res.status(500).json({ 
//       success: false, 
//       message: error.response?.data?.message || "Nominative entry creation failed" 
//     });
//   }
// };

// export const checkNominativeStatus = async (req, res) => {
//   try {
//     const { order_id } = req.params;

//     const response = await axios.get(
//       `${process.env.CASHFREE_API_URL}/${order_id}/payments`, 
//       {
//         headers: {
//           "x-client-id": process.env.CASHFREE_CLIENT_ID,
//           "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
//           "x-api-version": process.env.CASHFREE_API_VERSION
//         }
//       }
//     );

//     const paymentStatus = response.data[0]?.payment_status || 'PENDING';
    
//     await Nominative.findOneAndUpdate(
//       { orderId: order_id },
//       { paymentStatus: paymentStatus === 'SUCCESS' ? 'PAID' : 'FAILED' }
//     );

//     if (paymentStatus === 'SUCCESS') {
//       return res.redirect(`${process.env.FRONTEND_URL}/nominative-success?order_id=${order_id}`);  
//     } else {
//       return res.redirect(`${process.env.FRONTEND_URL}/nominative-failure?order_id=${order_id}`);  
//     }

//   } catch (error) {
//     console.error("Nominative Status Check Error:", error.response?.data || error.message);
//     return res.redirect(`${process.env.FRONTEND_URL}/nominative-failure?error=status_check_failed`);  
//   }
// };

// export const getNominativeDetails = async (req, res) => {
//   try {
//     const { order_id } = req.params;
//     const nominative = await Nominative.findOne({ orderId: order_id });

//     if (!nominative) {
//       return res.status(404).json({ message: "Nominative entry not found" });
//     }

//     res.json(nominative);
//   } catch (error) {
//     console.error("Error fetching nominative details:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // module.exports = {
// //   createNominativeEntry,
// //   checkNominativeStatus,
// //   getNominativeDetails
// // };