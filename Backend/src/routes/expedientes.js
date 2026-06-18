import express from "express"
import expedientescontroller from "../controller/expedientesController.js"

const router = express.Router()

router.route("/")
.get(expedientescontroller.getExpedientes)
.post(expedientescontroller.insertExpediente)

router.route("/:id")
.put(expedientescontroller.putExpediente)
.delete(expedientescontroller.deleteExpedientes)

export default router