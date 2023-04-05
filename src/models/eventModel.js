import mongoose from "mongoose";

import db from "../connections/dbConnection.js";

const Schema = mongoose.Schema;

// Creating cab schema
const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required!"],
    },
    registrationLink: {
        type: String,
        required: [true, "Registration link is required!"],
    },
    eventDate: {
        type: Date,
        required: [true, "Event Date is required!"],
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
    },
    speakers: [
        {
            name: {
                type: String,
                required: true,
            },
            image: String,
            about: String,
        },
    ],
    moderator: [
        {
            name: {
                type: String,
                required: true,
            },
            image: String,
            about: String,
        },
    ],
    content: {
        type: String,
        required: true,
    },
    joiningInfo: {
        type: String,
        required: true,
    },
    organisedBy: Array,
    tags: Array,
});

// Creating model from schema
export default db.model("Event", eventSchema);
