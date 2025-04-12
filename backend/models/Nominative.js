import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  discipline: { type: String, required: true, enum: ["MAG", "WAG"] }, 
  role: { type: String, required: true, enum: ["gymnast", "hod", "judge", "coach", "manager"] },
  state: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  registrationFee: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["PENDING", "PAID", "FAILED", "FREE"], default: "PENDING" }
});

const NominativeSchema = new mongoose.Schema({
  participants: [ParticipantSchema],
  totalAmount: { type: Number, required: true },
  orderId: { type: String, required: true, unique: true },
  paymentStatus: { type: String, enum: ["PENDING", "PAID", "FAILED", "FREE"], default: "PENDING" },
  paymentLink: { type: String },
  orderType: { type: String, default: "nominative_entry" }
}, { timestamps: true });

const Nominative = mongoose.model("Nominative", NominativeSchema);

export default Nominative;

// import mongoose from "mongoose";

// const NominativeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   role: { type: String, required: true, enum: ["gymnast", "hod", "judge", "technical_official", "coach", "manager"] },
//   state: { type: String, required: true },
//   mobileNumber: { type: String, required: true },
//   dateOfBirth: { type: Date, required: true }, 
//   // email: { type: String, required: true },
//   // teamName: { type: String, required: true },
//   registrationFee: { type: Number, required: true },
//   paymentStatus: { type: String, enum: ["PENDING", "PAID", "FAILED", "FREE"], default: "PENDING" },
//   orderId: { type: String, required: true, unique: true },
//   paymentLink: { type: String },
//   orderType: { type: String, default: "nominative_entry" }
// }, { timestamps: true });

// const Nominative = mongoose.model("Nominative", NominativeSchema);

// export default Nominative;

