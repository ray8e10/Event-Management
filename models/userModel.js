const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    college: {
      collegeName: {
        type: String,
        enum: ["KCE", "KEC"],
        required: true,
      },
      collegeId: {
        type: String,
        unique: true,
        required: true,
      },
      stream: {
        type: String,
        enum: ["computer", "electrical", "architecture", "civil"],
      },
      batch: {
        type: Number,
        validate: {
          validator: function (v) {
            return v <= 2081;
          },
          message: "Please provide your valid batch year",
        },
      },
    },
    profileImage: {
      type: String,
      default: "profilelogo.jpg",
    },
    userType: {
      type: String,
      enum: ["student", "teacher", "coordinator", "staff", "guest"],
      default: "student",
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isCoordinator: {
      type: Boolean,
      default: false,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

userSchema.plugin(plm, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
