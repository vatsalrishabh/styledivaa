import mongoose from "mongoose";

const ContactUsSchema = new mongoose.Schema({
    ticketId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    number: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ContactUs = mongoose.models.ContactUs || mongoose.model("ContactUs", ContactUsSchema);
export default ContactUs;
