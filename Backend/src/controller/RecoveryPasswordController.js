import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import { config } from "../../config.js";
import PacientesModels from "../models/Pacientes.js";

const recoveryPasswordPaciente = {}

recoveryPasswordPaciente.recoveryPassword = async (req, res) => {
    try {
        const { email } = req.body
        const existPaciente = await PacientesModels.findOne({ email });

        if (existPaciente) {
            return res.status(400).json({ message: "Paciente existente" });
        }
        const VerificationCode = crypto.randomBytes(3).toString("hex");

        const tokenCode = JsonWebToken.sign(
            {
                email,
                VerificationCode,
                userType: "Paciente",
                verified: "false"
            },
            config.Jwt.SECRET,
            {
                expiresIn: "15m"
            }
        );

        res.cookie("recoveryCookie", tokenCode, { MaxAge: 15 * 60 * 1000 })

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.USER_EMAIL,
                pass: config.email.USER_PASSWORD
            }
        })

        const mailOptions = {
            from: config.email.USER_EMAIL,
            to: email,
            subject: "Recuperar contraseña",
            text: "Utiliza este codigo: " + VerificationCode + " para recuperar tu contraseña, Expira en 15 minutos"
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error" + error);
                return res.status(500).json({ message: "Error al enviar el correo" });
            }
            res.json({ message: "Correo enviado correctamente" });
        }
        )

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }

}

recoveryPasswordPaciente.verifyCode = async (req, res) => {
    try {
        const { codeRequest } = req.body
        const token = req.cookie.recoveryCookie
        const decoded = JsonWebToken.verify(token, config.Jwt.SECRET)

        if (decoded.code !== codeRequest) {
            return res.status(500).json({ message: "Codigo invalido" })
        }

        const newToken = JsonWebToken.sign(
            {
                email: decoded.email,
                userType: "Paciente",
                verified: true
            },
            config.Jwt.SECRET,
            {
                expiresIn: "15m"
            }
        );

        res.cookie("recoveryCookie", newToken, { MaxAge: 15 * 60 * 1000 })
        return res.status(200).json({ message: "Codigo Verificado" })

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }

}

recoveryPasswordPaciente.newPassword = async (req, res) => {
    try {
        const { newPassword, confirmNewPassword } = req.body

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "Las contraseñas no coinciden" })
        }

        const token = req.cookie.recoveryCookie
        const decoded = JsonWebToken.verify(token, config.Jwt.SECRET)

        if (!decoded.verified) {
            return res.status(400).json({ message: "Codigo no verificado" })
        }

        const passwordHash = await bcrypt.hash(newPassword, 10)

        await PacientesModels.findOneAndUpdate(
            { email: decoded.email },
            { password: passwordHash },
            { new: true }
        )

        res.clearCookie("recoveryCookie")
        return res.status(200).json({ message: "Contraseña actualizada" })
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }

}

export default recoveryPasswordPaciente