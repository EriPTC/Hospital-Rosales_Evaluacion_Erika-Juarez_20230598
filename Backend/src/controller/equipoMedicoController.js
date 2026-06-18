import equipoMedicoModels from "../models/equipoMedico.js";

const equipoMedico = {}

equipoMedico.getEquipoMedico = async (req, res) => {
    try {
        const EquipoMedico = await equipoMedicoModels.find()
        return res.status(200).json(EquipoMedico)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}

equipoMedico.insertEquipo = async (req, res) => {
    try {
        let {
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            status,
            isAvailable,
        } = req.body

        if (purchaseDate > new Date()) {
            return res.status(400).json({ message: "Fecha Invalida" })
        }

        if (!equipmentName || !description || !brand || !model || !purchaseDate || !maintenanceDate ) {
            return res.status(400).json({ message: "Campos requeridos" })
        }

        const NewEquipo = new equipoMedicoModels({
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            image: req.file.path,
            public_id: req.file.filename ,
            status,
            isAvailable,
        })

        await NewEquipo.save()
        return res.status(200).json({ message: "Equipo agregado correctamente" })


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}

equipoMedico.putEquipo = async (req, res) => {

    try {
        let {
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            status,
            isAvailable,
        } = req.body

        if (purchaseDate > new Date()) {
            return res.status(400).json({ message: "Fecha Invalida" })
        }

        if (!equipmentName || !description || !brand || !model || !purchaseDate || !maintenanceDate ) {
            return res.status(400).json({ message: "Campos requeridos" })
        }

        const equipoFound = await equipoMedicoModels.findById(req.params.id)
        

        const dataToUpdate = {
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            status,
            isAvailable,
        }

        if (req.file) {
                    await cloudinary.uploader.destroy(equipoFound.public_id)
        
                    dataToUpdate.image = req.file.path
                    dataToUpdate.public_id = req.file.filename
                }


        const updateEquipo =await equipoMedicoModels.findByIdAndUpdate(req.params.id, dataToUpdate, {new: true})

        if(!updateEquipo){
        return res.status(404).json({ message: "Equipo no encontrado" })
        }

        return res.status(200).json({ message: "Equipo actualizado" })


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
    
}

equipoMedico.deleteEquipo = async (req, res) => {
    try {
        const equipoFound = await equipoMedicoModels.findById(req.params.id)

        await cloudinary.uploader.destroy(equipoFound.public_id)

        const EquipoDeleted = await equipoMedicoModels.findByIdAndDelete(req.params.id)

         if (!EquipoDeleted) {
            return res.status(404).json({ message: "Equipo no encontrado" })
        }

        return res.status(200).json({ message: "Equipo eliminado" })


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}

export default equipoMedico
