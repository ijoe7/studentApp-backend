const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },

        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            select: false,
        },

        address: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("user", userSchema);
