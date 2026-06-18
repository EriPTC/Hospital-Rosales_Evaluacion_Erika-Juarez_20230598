import express from "express"
import recoveryPassword from "../controller/RecoveryPasswordController.js"

const router = express.Router()

router.route("/")
.post(recoveryPassword.recoveryPassword)

router.route("/verifyCodeEmail")
.post(recoveryPassword.verifyCode)

router.route("/newPassword")
.post(recoveryPassword.newPassword)

export default router


