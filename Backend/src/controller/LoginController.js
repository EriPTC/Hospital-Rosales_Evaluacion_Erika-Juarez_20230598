import bcrypt from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import { config } from "../../config.js";
import PacientesModels from "../models/Pacientes.js";

const loginPacientes = {}

loginPacientes.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const PacienteFound = await PacientesModels.findOne({ email })

        if (!PacienteFound) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        if (PacienteFound.timeOut && PacienteFound.timeOut > Date.now()) {
            return res.status(403).json({ message: "Cuenta bloqueada" })

        }

        const isMatch = await bcrypt.compare(password, PacienteFound.password)

        if (!isMatch) {
            PacienteFound.loginAttempts = (PacienteFound.loginAttempts || 0) + 1

            if (PacienteFound.loginAttempts >= 5) {
                PacienteFound.timeOut = Date.now() + 15 * 60 * 100
                PacienteFound.loginAttempts = 0

                await PacienteFound.save()
                return res.status(403).json({ message: "Cuenta bloqueada" })

            }

            await PacienteFound.save()
            return res.status(401).json({ message: "Contraseña incorrecta" })

        }

        PacienteFound.loginAttempts = 0
        PacienteFound.timeOut = null
        await PacienteFound.save()

        const token = JsonWebToken.sign (
            {id:PacienteFound._id, userType: "Paciente"},
            config.Jwt.SECRET,
            {expiresIn: "30d"}

        )

        res.cookie("authCookie", token)
        return res.status(200).json({ message: "Login exitoso" })

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal Served Error" })
    }
}

export default loginPacientes