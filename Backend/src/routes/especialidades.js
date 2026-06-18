import express from "express"
import especialidadesMedicasController from "../controller/especialidadesMedicasController.js"

const router = express.Router()

router.route("/")
.get(especialidadesMedicasController.getEspecialidades)
.post(especialidadesMedicasController.insertEspecialidades)

router.route("/:id")
.put(especialidadesMedicasController.putEspecialidades)
.delete(especialidadesMedicasController.deleteEspecialidades)

export default router