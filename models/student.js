const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
          required: true,
      lowercase: true,
    },

    lastName: {
      type: String,
        required: true,
      lowercase: true,
    },

    gender: {
      type: String,
      enum: ["", "male", "female", "others"],
        default: "",
      lowercase: true
    },

    age: {
      type: Number,
      default: null,
    },

    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("student", studentSchema);
