/*
name, 
lastName,
email,
password,
phone,
address,
phoneEmergencyContacts, //[{phone, nameEmergencyContact}]
profilePhoto,
isverified,
loginAttempts,
timeOut
*/

//:{type:}

import { Schema, model } from "mongoose"

const PacientesSchema = new Schema(
    {
        name: { type: String },
        lastName: { type: String },
        email: { type: String },
        password: { type: String },
        phone: { type: String },
        address: { type: String },
        phoneEmergencyContacts: [{
            phone: { type: String },
            nameEmergencyContact: { type: String }

        }],
        profilePhoto: { type: String },
        public_id: { type: String },
        isverified: { type: Boolean },
        loginAttempts: { type: Number },
        timeOut: { type: Date }

    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("pacientes", PacientesSchema)