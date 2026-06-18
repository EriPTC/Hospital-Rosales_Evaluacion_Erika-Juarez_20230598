import expedientesModels from "../models/expedientes.js";

const expedientes = {}

expedientes.getExpedientes = async (req, res) => {
    try {
        const Expedientes = await expedientesModels.find()
        return res.status(200).json(Expedientes)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}

expedientes.insertExpediente = async (req, res) => {
    try {
        const {
            patient_id,
            diagnosis,
            medications, 
            medicalNotes,
        }=req.body

        const NewExpediente = new expedientesModels({
            patient_id,
            diagnosis,
            medications, 
            medicalNotes,
        })

        await NewExpediente.save()
        return res.status(200).json({ message: "Expediente agregado correctamente" })


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}

expedientes.putExpediente = async (req, res) => {

    try {
        let {
            patient_id,
            diagnosis,
            medications, 
            medicalNotes,
        } = req.body



        if (!patient_id || !diagnosis || !medications ) {
            return res.status(400).json({ message: "Campos requeridos" })
        }

        const dataToUpdate = {
            patient_id,
            diagnosis,
            medications, 
            medicalNotes,
        }


        const updateExpediente =await expedientesModels.findByIdAndUpdate(req.params.id, dataToUpdate, {new: true})

        if(!updateExpediente){
        return res.status(404).json({ message: "Expediente no encontrado" })
        }

        return res.status(200).json({ message: "Expediente actualizado" })


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
    
}

expedientes.deleteExpedientes = async (req, res) => {
    try {
        const ExpedientesDeleted = await expedientesModels.findByIdAndDelete(req.params.id)

         if (!ExpedientesDeleted) {
            return res.status(404).json({ message: "Expediente no encontrado" })
        }

        return res.status(200).json({ message: "Expediente eliminado" })


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}

export default expedientes
