// src/components/NominativeForm/NominativeForm.js
import React, { useState } from "react";
import Select from "react-select";
import { State } from "country-state-city";
import "./NominativeForm.css";
import { cashfree } from "../../MAG_WAG_booking_compnents/BookingForm/utils/utils.cashfree.js";

const NominativeForm = () => {
  const [rows, setRows] = useState([
    {
      firstName: "",
      lastName: "",
      discipline: "",
      group: "",
      role: "",
      state: "",
      mobileNumber: "",
      dateOfBirth: "",
      paymentStatus: "PENDING",
      registrationFee: 1000,
    },
  ]);

  const disciplines = [
    { value: "MAG", label: "MAG (Men Artistic Gymnastics)" },
    { value: "WAG", label: "WAG (Women Artistic Gymnastics)" },
  ];
  const groups = [
    { value: "junior", label: "Junior" },
    { value: "senior", label: "Senior" },
  ];
  const roles = [
    { value: "gymnast", label: "Gymnast" },
    { value: "hod", label: "HOD" },
    { value: "judge", label: "Judge" },
    { value: "coach", label: "Coach" },
    { value: "manager", label: "Manager" },
  ];

  const handleDisciplineChange = (index, selectedOption) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      discipline: selectedOption.value,
    };
    setRows(updatedRows);
  };
  const handleGroupChange = (index, selectedOption) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      group: selectedOption.value,
    };
    setRows(updatedRows);
  };

  const baseStates = State.getStatesOfCountry("IN").map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));
  const additionalOptions = [
    { value: "SSCB", label: "SSCB" },
    { value: "Railways", label: "Railways" },
    {
      value: "Andaman and Nicobar Islands",
      label: "Andaman and Nicobar Islands",
    },
    { value: "Chandigarh", label: "Chandigarh" },
    {
      value: "Dadra and Nagar Haveli and Daman and Diu",
      label: "Dadra and Nagar Haveli and Daman and Diu",
    },
    { value: "Delhi", label: "Delhi" },
    { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
    { value: "Ladakh", label: "Ladakh" },
    { value: "Lakshadweep", label: "Lakshadweep" },
    { value: "Puducherry", label: "Puducherry" },
    { value: "Others", label: "Others" },
  ];

  const indianStates = [...baseStates, ...additionalOptions];

  const handleRowChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      [name]: value,
    };

    // Update registration fee if role is changed
    if (name === "role") {
      updatedRows[index].registrationFee = value === "judge" ? 0 : 1000;
    }

    setRows(updatedRows);
  };

  const handleRoleChange = (index, selectedOption) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      role: selectedOption.value,
      registrationFee: selectedOption.value === "judge" ? 0 : 1000,
    };
    setRows(updatedRows);
  };

  const handleStateChange = (index, selectedOption) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      state: selectedOption.value,
    };
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        firstName: "",
        lastName: "",
        role: "",
        state: "",
        mobileNumber: "",
        dateOfBirth: "",
        paymentStatus: "PENDING",
        registrationFee: 1000,
      },
    ]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    }
  };

  const validateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 10 && age <= 80;
  };

  const validateMobile = (number) => {
    return /^[0-9]{10}$/.test(number);
  };

  const calculateTotal = () => {
    return rows.reduce((total, row) => total + row.registrationFee, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all rows
    for (const row of rows) {
      if (!validateAge(row.dateOfBirth)) {
        alert("Age must be between 10 and 80 years for all participants");
        return;
      }

      if (!validateMobile(row.mobileNumber)) {
        alert(
          "Please enter valid 10-digit mobile numbers for all participants"
        );
        return;
      }
    }

    try {
      const endpoint = `/api/nominative/`;
      console.log("Endpoint:", endpoint);
      const payload = {
        participants: rows,
        totalAmount: calculateTotal(),
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.text();
        try {
          const jsonError = JSON.parse(errorData);
          throw new Error(jsonError.message || "Registration failed");
        } catch {
          throw new Error(errorData || "Registration failed");
        }
      }

      const data = await response.json();

      // Check if all roles are judge (no payment needed)
      const allJudges = rows.every((row) => row.role === "judge");
      if (allJudges) {
        alert("Registration successful!");
      } else {
        if (data.success && data.sessionId) {
          let checkoutOptions = {
            paymentSessionId: data.sessionId,
            returnUrl: `/api/nominative/status/${data.order_id}`,
          };
          cashfree.checkout(checkoutOptions);
        } else {
          throw new Error(data.message || "Payment initialization failed");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="main-c">
      <div className="nominative-container">
        <div className="nominative-header">
          <h2>Nominative Entry Form</h2>
          <p className="subtitle">
            Note: If you need to update any field after submission, an
            additional fee of ₹1000 will be applicable.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="nominative-form">
          {rows.map((row, index) => (
            <div key={index} className="participant-section">
              <h3>Row {index + 1}</h3>

              <div className="form-group">
                <label htmlFor={`firstName-${index}`}>First Name</label>
                <input
                  type="text"
                  id={`firstName-${index}`}
                  name="firstName"
                  placeholder="Enter first name"
                  value={row.firstName}
                  onChange={(e) => handleRowChange(index, e)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor={`lastName-${index}`}>Last Name</label>
                <input
                  type="text"
                  id={`lastName-${index}`}
                  name="lastName"
                  placeholder="Enter last name"
                  value={row.lastName}
                  onChange={(e) => handleRowChange(index, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`discipline-${index}`}>Discipline</label>
                <Select
                  id={`discipline-${index}`}
                  options={disciplines}
                  name="discipline"
                  value={disciplines.find((d) => d.value === row.discipline)}
                  onChange={(selectedOption) =>
                    handleDisciplineChange(index, selectedOption)
                  }
                  placeholder="Select discipline"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`group-${index}`}>Group</label>
                <Select
                  id={`group-${index}`}
                  options={groups}
                  name="group"
                  value={groups.find((g) => g.value === row.group)}
                  onChange={(selectedOption) =>
                    handleGroupChange(index, selectedOption)
                  }
                  placeholder="Select group"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor={`role-${index}`}>Role</label>
                <Select
                  id={`role-${index}`}
                  options={roles}
                  name="role"
                  value={roles.find((r) => r.value === row.role)}
                  onChange={(selectedOption) =>
                    handleRoleChange(index, selectedOption)
                  }
                  placeholder="Select role"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor={`dateOfBirth-${index}`}>Date of Birth</label>
                <input
                  type="date"
                  id={`dateOfBirth-${index}`}
                  name="dateOfBirth"
                  value={row.dateOfBirth}
                  onChange={(e) => handleRowChange(index, e)}
                  required
                  max={new Date().toISOString().split("T")[0]}
                  className="date-input"
                  onFocus={(e) => (e.target.showPicker = false)}
                />
                {row.dateOfBirth && !validateAge(row.dateOfBirth) && (
                  <p className="error-message">
                    Age must be between 10 and 80 years
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor={`state-${index}`}>State</label>
                <Select
                  id={`state-${index}`}
                  options={indianStates}
                  name="state"
                  value={indianStates.find((s) => s.value === row.state)}
                  onChange={(selectedOption) =>
                    handleStateChange(index, selectedOption)
                  }
                  placeholder="Select state / Union Territories"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor={`mobileNumber-${index}`}>Mobile Number</label>
                <input
                  type="tel"
                  id={`mobileNumber-${index}`}
                  name="mobileNumber"
                  placeholder="Enter 10-digit mobile number"
                  value={row.mobileNumber}
                  onChange={(e) => handleRowChange(index, e)}
                  required
                  minLength="10"
                  maxLength="10"
                  pattern="[0-9]{10}"
                />
                {row.mobileNumber && !validateMobile(row.mobileNumber) && (
                  <p className="error-message">
                    Please enter a valid 10-digit mobile number
                  </p>
                )}
              </div>

              {index > 0 && (
                <button
                  type="button"
                  className="remove-row-button"
                  onClick={() => removeRow(index)}
                >
                  Remove Row
                </button>
              )}
            </div>
          ))}

          <button type="button" className="add-row-button" onClick={addRow}>
            Add Another Participant
          </button>

          <div className="price-summary">
            <h3>Total Registration Fee</h3>
            <p className="total-amount">Rs. {calculateTotal()}</p>
            {/* <p className="fee-note">(Judges are exempt from registration fee)</p> */}
          </div>

          <button type="submit" className="submit-button">
            {rows.every((row) => row.role === "judge")
              ? "Submit Registration"
              : "Proceed to Pay"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NominativeForm;

// // src/components/NominativeForm/NominativeForm.js
// import React, { useState } from "react";
// import Select from "react-select";
// import { State } from "country-state-city";
// import "./NominativeForm.css";
// import { cashfree } from "../../MAG_WAG_booking_compnents/BookingForm/utils/utils.cashfree.js";

// const NominativeForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     state: "",
//     mobileNumber: "",
//     dateOfBirth: "",
//     // email: "",
//     // teamName: "",
//     paymentStatus: "PENDING",
//     registrationFee: 0,
//   });

//   const roles = [
//     { value: "gymnast", label: "Gymnast" },
//     { value: "hod", label: "HOD" },
//     { value: "judge", label: "Judge" },
//     // { value: "technical_official", label: "Technical Official" },
//     { value: "coach", label: "Coach" },
//     { value: "manager", label: "Manager" },
//   ];

//   const baseStates = State.getStatesOfCountry("IN").map((state) => ({
//     value: state.isoCode,
//     label: state.name,
//   }));
//   const additionalOptions = [
//     { value: "SSCB", label: "SSCB" },
//     { value: "Railways", label: "Railways" },
//     { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
//     { value: "Chandigarh", label: "Chandigarh" },
//     { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
//     { value: "Delhi", label: "Delhi" },
//     { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
//     { value: "Ladakh", label: "Ladakh" },
//     { value: "Lakshadweep", label: "Lakshadweep" },
//     { value: "Puducherry", label: "Puducherry" },
//     { value: "Others", label: "Others" },
//   ];

//   const indianStates = [...baseStates, ...additionalOptions];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       registrationFee: name === "role" && value === "judge" ? 0 : 1000,
//     }));
//   };

//   const handleRoleChange = (selectedOption) => {
//     setFormData((prev) => ({
//       ...prev,
//       role: selectedOption.value,
//       registrationFee: selectedOption.value === "judge" ? 0 : 1000,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const endpoint = "/api/nominative/";
//       const payload = {
//         ...formData,
//         // Ensure all required fields are included
//       };

//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//         credentials: "include", // If using cookies/sessions
//       });

//       if (!response.ok) {
//         const errorData = await response.text(); // First try to read as text
//         try {
//           // If it's JSON, parse it
//           const jsonError = JSON.parse(errorData);
//           throw new Error(jsonError.message || "Registration failed");
//         } catch {
//           // If not JSON, use the raw text
//           throw new Error(errorData || "Registration failed");
//         }
//       }

//       const data = await response.json();

//       if (formData.role === "judge") {
//         alert("Registration successful!");
//         // Optionally reset form or redirect
//       } else {
//         if (data.success && data.sessionId) {
//           let checkoutOptions = {
//             paymentSessionId: data.sessionId,
//             returnUrl: `/api/nominative/status/${data.order_id}`,
//           };
//           cashfree.checkout(checkoutOptions);
//         } else {
//           throw new Error(data.message || "Payment initialization failed");
//         }
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert(error.message || "Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="main-c">
//       <div>
//       </div>
//       <div className="nominative-container">
//         <div className="nominative-header">
//           <h2>Nominative Entry Form</h2>
//           <p className="subtitle">Note: If you need to update any field after submission, an additional fee of ₹1000 will be applicable.</p>
//         </div>

//         <form onSubmit={handleSubmit} className="nominative-form">
//           <div className="form-group">
//             <label htmlFor="name">Full Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter your full name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="role">Role</label>
//             <Select
//               id="role"
//               options={roles}
//               name="role"
//               value={roles.find((r) => r.value === formData.role)}
//               onChange={handleRoleChange}
//               placeholder="Select your role"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="dateOfBirth">Date of Birth</label>
//             <input
//               type="date"
//               id="dateOfBirth"
//               name="dateOfBirth"
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//               required
//               max={new Date().toISOString().split("T")[0]}
//               className="date-input" // Add this if you want specific styling
//               onFocus={(e) => (e.target.showPicker = false)} // Prevent immediate popup
//             />
//           </div>

//           {/* <div className="form-group">
//             <label htmlFor="teamName">Team Name</label>
//             <input
//               type="text"
//               id="teamName"
//               name="teamName"
//               placeholder="Enter your team name"
//               value={formData.teamName}
//               onChange={handleChange}
//               required
//             />
//           </div> */}

//           <div className="form-group">
//             <label htmlFor="state">State</label>
//             <Select
//               id="state"
//               options={indianStates}
//               name="state"
//               value={indianStates.find((s) => s.value === formData.state)}
//               onChange={(selectedOption) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   state: selectedOption.value,
//                 }))
//               }
//               placeholder="Select state / Union Territories"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="mobileNumber">Mobile Number</label>
//             <input
//               type="tel"
//               id="mobileNumber"
//               name="mobileNumber"
//               placeholder="Enter 10-digit mobile number"
//               value={formData.mobileNumber}
//               onChange={handleChange}
//               required
//               minLength="10"
//               maxLength="10"
//               pattern="[0-9]{10}"
//             />
//           </div>

//           {/* <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div> */}

//           {formData.role !== "judge" && (
//             <div className="price-summary">
//               <h3>Registration Fee</h3>
//               <p className="total-amount">Rs. {formData.registrationFee}</p>
//             </div>
//           )}

//           <button type="submit" className="submit-button">
//             {formData.role === "judge"
//               ? "Submit Registration"
//               : "Proceed to Pay"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NominativeForm;
