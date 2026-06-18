import citasMedicasModels from "../models/citasMedicas.js";

const citasMedicas = {}

citasMedicas.getCitas = async (req, res) => {
    try {
        const Citas = await citasMedicasModels.find()
        return res.status(200).json(Citas)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}

citasMedicas.insertCitas = async (req, res) => {
    try {
        let {
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations,
        } = req.body

        if (appointmentDate > new Date()) {
            return res.status(400).json({ message: "Fecha Invalida" })
        }

        if (!patient_id || !specialty_id|| !appointmentDate|| !reason|| !status ) {
            return res.status(400).json({ message: "Campos requeridos" })            
        }

        const NewCitas = new citasMedicasModels({
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations,
        })

        await NewCitas.save()
        return res.status(200).json({ message: "Cita agregada correctamente" })


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}

citasMedicas.putCitas = async (req, res) => {

    try {
        let {
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations,
        } = req.body

        if (appointmentDate > new Date()) {
            return res.status(400).json({ message: "Fecha Invalida" })
        }

        if (!patient_id || !specialty_id|| !appointmentDate|| !reason|| !status ) {
            return res.status(400).json({ message: "Campos requeridos" })            
        }
        
        const dataToUpdate = {
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations,
        }


        const updateCitas =await citasMedicasModels.findByIdAndUpdate(req.params.id, dataToUpdate, {new: true})

        if(!updateCitas){
        return res.status(404).json({ message: "Cita no encontrada" })
        }

        return res.status(200).json({ message: "Cita actualizada" })


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
    
}

citasMedicas.deleteCitas = async (req, res) => {
    try {
        const CitasDeleted = await citasMedicasModels.findByIdAndDelete(req.params.id)

         if (!CitasDeleted) {
            return res.status(404).json({ message: "Cita no encontrada" })
        }

        return res.status(200).json({ message: "Cita eliminada" })


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}

export default citasMedicas
