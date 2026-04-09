import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    customer: String,
    service: {
        title: String,
        category: String,
        durationMins: Number,
        rating: Number
    },
    bookingTime: Date,
    location: String,
    status: {
        type: String,
        default: "Pending"
    },
    paymentStatus: {
        type: String,
        default: "Unpaid"
    }

}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);