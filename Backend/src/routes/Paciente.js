import express from "express"
import upload from "../utils/cloudinary.js"
import pacienteController from "../controller/pacientesController.js"

const router = express.Router()


router.route("/")
.get(pacienteController.getPacientes)

router.route("/:id")
.put(upload.single("profilePhoto"), pacienteController.putPaciente)
.delete(pacienteController.deletePaciente)

export default router