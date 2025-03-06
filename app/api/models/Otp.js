import mongoose, { Schema } from 'mongoose';

const otpSchema = new Schema({
  name:{type:String},
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  otp: {
    type: Number,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true, // Ensure mobile number is unique
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // OTP expires in 5 minutes (300 seconds)
  },
});

const Otp = mongoose.models.Otp || mongoose.model('Otp', otpSchema);

export default Otp;