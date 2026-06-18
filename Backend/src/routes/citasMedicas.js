import express from "express"
import citasController from "../controller/citasMedicasController.js"

const router = express.Router()

router.route("/")
.get(citasController.getCitas)
.post(citasController.insertCitas)

router.route("/:id")
.put(citasController.putCitas)
.delete(citasController.deleteCitas)

export default router