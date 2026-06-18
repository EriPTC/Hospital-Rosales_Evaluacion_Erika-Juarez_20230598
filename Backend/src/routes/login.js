import express from "express"
import login from "../controller/LoginController.js"

const router = express.Router()

router.route("/")
.post(login.login)

export default router