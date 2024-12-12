const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    registrationType: {
      type: String,
      enum: ["individual", "team"],
      required: true,
    },
    individual: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      validate: {
        validator: function (v) {
          return this.registrationType === "individual" && v.length === 1;
        },
        message: "Only one member can be registered ",
      },
    },
    team: {
      teamName: String,
      members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        validate: {
          validator: function (v) {
            return this.registrationType === "team" && v.length >= 2;
          },
          message: "There must be more than one member for registering",
        },
      },
    },

    registrationStatus: {
      type: String,
      enum: ["pending", "registered", "canceled"],
      defaule: "pending",
    },
    progress: {
      currentStage: {
        type: String,
        default: "registration",
      },
    },
    rank: {
      type: Number,
    },
    isInEvent: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
