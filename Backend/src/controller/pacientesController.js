import pacientesModels from "../models/Pacientes.js";
import bcryptjs from "bcryptjs"
import { v2 as cloudinary } from "cloudinary"


const pacientes = {}

pacientes.getPacientes = async (req, res) => {
    try {
        const Pacientes = await pacientesModels.find()
        return res.status(200).json(Pacientes)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}

pacientes.putPaciente = async (req, res) => {

    try {
        let {
            name,
            lastName,
            email,
            password,
            phone,
            address,
            phoneEmergencyContacts,
        } = req.body

        if (!email || !email.includes("@")) {
            return res.status(400).json({ message: "Correo Invalido" })
        }

        const PacienteFound = await pacientesModels.findById(req.params.id)

        const dataToUpdate = {
            name,
            lastName,
            email,
            password,
            phone,
            address,
            phoneEmergencyContacts,
        }

        if (req.file) {
            await cloudinary.uploader.destroy(PacienteFound.public_id)

            dataToUpdate.profilePhoto = req.file.path
            dataToUpdate.public_id = req.file.filename
        }

        if (password) {
            dataToUpdate.password = await bcryptjs.hash(password, 10)
        }


        const updatePaciente = await pacientesModels.findByIdAndUpdate(req.params.id, dataToUpdate, { new: true })

        if (!updatePaciente) {
            return res.status(404).json({ message: "Paciente no encontrado" })
        }

        return res.status(200).json({ message: "Paciente actualizado" })


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }

}

pacientes.deletePaciente = async (req, res) => {
    try {
        const PacienteFound = await pacientesModels.findById(req.params.id)

        await cloudinary.uploader.destroy(PacienteFound.public_id)

        const pacienteDeleted = await pacientesModels.findByIdAndDelete(req.params.id)

         if (!pacienteDeleted) {
            return res.status(404).json({ message: "Paciente no encontrado" })
        }

        return res.status(200).json({ message: "Paciente eliminado" })


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}

export default pacientes

