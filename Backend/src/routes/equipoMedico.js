import express from "express"
import equipoController from "../controller/equipoMedicoController.js"
import upload from "../utils/cloudinary.js"


const router = express.Router()

router.route("/")
.get(equipoController.getEquipoMedico)
.post(upload.single("image"), equipoController.insertEquipo)

router.route("/:id")
.put(upload.single("image"), equipoController.putEquipo)
.delete(equipoController.deleteEquipo)

export default router