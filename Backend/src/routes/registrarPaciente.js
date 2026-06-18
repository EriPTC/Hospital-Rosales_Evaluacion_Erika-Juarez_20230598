import express from "express"
import upload from "../utils/cloudinary.js"
import registerPacientes from "../controller/RegistrarPacienteController.js"

const router = express.Router()

router.route("/")
.post(upload.single("profilePhoto"),registerPacientes.register)

router.route("/verifyCodeEmail")
.post(upload.single("profilePhoto"),registerPacientes.verifycode)

export default router


