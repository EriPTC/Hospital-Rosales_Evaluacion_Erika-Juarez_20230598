/*
patient_id,
diagnosis,
medications, // [{ medicineName }]
medicalNotes,
*/

//:{type:}

import { Schema, model } from "mongoose"

const expedientesSchema = new Schema(
    {
        patient_id: { type: String },
        diagnosis: { type: String },
        medications: [{
            medicineName: { type: String }
        }],
        medicalNotes: { type: String },

    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("expedientes", expedientesSchema)