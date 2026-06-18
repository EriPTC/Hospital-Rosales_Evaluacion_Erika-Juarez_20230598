import express from "express"
import logoutController from "../controller/logoutController"

const router = express.Router()

router.route("/")
.post (logoutController.logout)