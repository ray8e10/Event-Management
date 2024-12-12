const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    events: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Events",
    },
    bookingSchedule: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
    },
    bookingType: {
      type: String,
      enum: ["hall", "seat"],
      required: true,
    },
    hall: {
      type: String,
      enum: ["hall1", "hall2", "hall3", "hall4"],
      required: true,
    },
    seatNumber: {
      type: String,
    },
    unavailbleSeat: {
      type: [String],
      default: [],
      validate: {
        validator: function () {
          return this.bookingType === "hall";
        },
      },
    },
    status: {
      type: String,
      enum: ["awaiting", "approved", "canceled"],
      default: "awaiting",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
