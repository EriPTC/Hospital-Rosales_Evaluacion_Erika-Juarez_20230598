import especialidadesMedicasModels from "../models/especialidadesMedicas.js";

const especialidadesMedicas = {}

especialidadesMedicas.getEspecialidades = async (req, res) => {
    try {
        const Especialidades = await especialidadesMedicasModels.find()
        return res.status(200).json(Especialidades)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}

especialidadesMedicas.insertEspecialidades = async (req, res) => {
    try {
        let {
            specialtyName,
            description,
            isAvailable
        } = req.body

        if (!specialtyName || !description || !isAvailable ) {
            return res.status(400).json({ message: "Campos requeridos" })
        }

        const NewEspecialidades = new especialidadesMedicasModels({
            specialtyName,
            description,
            isAvailable
        })

        await NewEspecialidades.save()
        return res.status(200).json({ message: "Especialidad agregada correctamente" })


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}

especialidadesMedicas.putEspecialidades = async (req, res) => {

    try {
        let {
            specialtyName,
            description,
            isAvailable
        } = req.body

        if (!specialtyName || !description || !isAvailable ) {
            return res.status(400).json({ message: "Campos requeridos" })
        }

        const dataToUpdate = {
            specialtyName,
            description,
            isAvailable
        }


        const updateEspecialidades =await especialidadesMedicasModels.findByIdAndUpdate(req.params.id, dataToUpdate, {new: true})

        if(!updateEspecialidades){
        return res.status(404).json({ message: "Especialidad no encontrada" })
        }

        return res.status(200).json({ message: "Especialidad actualizada" })


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
    
}

especialidadesMedicas.deleteEspecialidades = async (req, res) => {
    try {
        const EspecialidadesDeleted = await especialidadesMedicasModels.findByIdAndDelete(req.params.id)

         if (!EspecialidadesDeleted) {
            return res.status(404).json({ message: "Especialidad no encontrada" })
        }

        return res.status(200).json({ message: "Especialidad eliminada" })


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}


export default especialidadesMedicas
