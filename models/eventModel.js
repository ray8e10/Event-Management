const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: [
        "main",
        "orientation",
        "workshop",
        "guest_lecture",
        "seminar",
        "conference",
        "panel_discussion",
        "semifinal",
        "final",
        "fellowship",
        "hackathon",
        "competition",
        "coding_challenge",
        "award_ceremony",
        "others",
      ],
    },
    otherType: {
      type: String,
      required: function () {
        return this.eventType === "others";
      },
      message: "Provided event type.",
    },
    description: {
      type: String,
      required: true,
    },
    eventImage: {
      type: String,
      required: true,
    },
    eventDocument: {
      type: String,
    },
    eventSchedule: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
      },
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registration",
      },
    ],
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    eventFor: {
      college: {
        type: String,
        enum: ["KCE", "KEC", "ALL"],
      },
      faculty: {
        type: [String],
        enum: [
          "computer",
          "electrical",
          "architecture",
          "civil",
          "electronics",
          "any",
        ],
      },
      userCategory: {
        type: [String],
        enum: ["student", "teacher", "coordinator", "guest", "staff"],
      },
    },
    eventStatus: {
      type: String,
      enum: ["upcoming", "Ongoing", "Completed"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Events", eventSchema);
