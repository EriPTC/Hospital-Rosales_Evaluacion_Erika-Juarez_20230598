/*
specialtyName,
description,
isAvailable
*/

//:{type:}

import { Schema, model } from "mongoose"

const especialidadesMedicasSChema = new Schema(
    {
        specialtyName: { type: String },
        description: { type: String },
        isAvailable: { type: Boolean }

    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("especialidadesMedicas", especialidadesMedicasSChema)