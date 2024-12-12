const mongoose = require("mongoose");

const organizerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organizerTeam: [
      {
        member: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: [
            "chairman",
            "director",
            "event_manager",
            "sponsorship_manager",
            "technical_support",
            "content_creator",
            "volunteer",
            "creative_director",
            "finance_manager",
            "legal_advisor",
            "member",
          ],
          default: "member",
          required: true,
        },
        isOrganizationCoordinator: {
          type: Boolean,
          default: false,
        },
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Oraganizer", organizerSchema);
