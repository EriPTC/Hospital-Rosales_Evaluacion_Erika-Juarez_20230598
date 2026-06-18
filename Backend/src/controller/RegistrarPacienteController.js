import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import { config } from "../../config.js";
import PacientesModels from "../models/Pacientes.js";
import {v2 as Cloudinary} from "cloudinary"




const registerPacientes = {};

registerPacientes.register = async (req, res) => {
    const {
        name,
        lastName,
        email,
        password,
        phone,
        address,
        phoneEmergencyContacts,
        isverified,
        loginAttempts,
        timeOut,
    } = req.body;

    try {
        const existPaciente = await PacientesModels.findOne({ email });

        if (existPaciente) {
            return res.status(400).json({ message: "Paciente existente" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const VerificationCodeRequest = crypto.randomBytes(3).toString("hex");
        const tokenCode = JsonWebToken.sign(
            {
                name,
                lastName,
                email,
                password: passwordHash,
                phone,
                address,
                phoneEmergencyContacts,
                profilePhoto: req.file.path,
                public_id: req.file.filename,
                isverified,
                loginAttempts,
                timeOut,
                VerificationCodeRequest
            },
            config.Jwt.SECRET,
            {
                expiresIn: "15m"
            }
        );

        res.cookie("verificationToken", tokenCode, { MaxAge: 15 * 60 * 1000 })


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
            subject: "Verificar correo",
            text: "Utiliza este codigo: " + VerificationCodeRequest + " para verificar tu correo, Expira en 15 minutos"
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
        console.log("error" + error);
        return res.status(500).json({ message: "Internal Served Error" });
    }
};

registerPacientes.verifycode = async (req, res) => {
    try {
        const { VerificationCodeRequest } = req.body
        const token = req.cookies.verificationToken
        const decoded = JsonWebToken.verify(token, config.Jwt.SECRET)

        const {
            name,
            lastName,
            email,
            password,
            phone,
            address,
            phoneEmergencyContacts,
            isverified,
            loginAttempts,
            timeOut,
            VerificationCodeRequest: storedCode

        } = decoded

        if (VerificationCodeRequest !== storedCode) {
            return res.status(400).json({ message: "Codigo Invalido" });
        }

        const passwordHash = await bcrypt.hash(password, 10);


        const newPaciente = new PacientesModels({
            name,
            lastName,
            email,
            password:passwordHash,
            phone,
            address,
            phoneEmergencyContacts,
            isverified:true,
            loginAttempts,
            timeOut
        })

        await newPaciente.save()

        const paciente = await PacientesModels.findOne({ email })
        paciente.isverified = true
        await paciente.save()

        res.clearCookie("verificationToken")
        res.json({ message: "Paciente Registrado" });


    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal Served Error" });
    }

}

export default registerPacientes
