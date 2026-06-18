import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import limiter  from "./src/middlewares/limiter"

//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*

import citasMedicas from "./src/routes/citasMedicas.js"
import equipoMedico from "./src/routes/equipoMedico.js"
import especialidadesMedicas from "./src/routes/especialidades.js"
import expedientes from "./src/routes/expedientes.js"
import login from "./src/routes/login.js"
import logout from "./src/routes/Logout.js"
import paciente from "./src/routes/Paciente.js"
import recoveryPassword from "./src/routes/recoveryPassword.js"
import registrar from "./src/routes/registrarPaciente.js"
//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*


const app = express ()

app.use(cors({
    origin:[
        "http://localhost:5173", "http://localhost:5174"
    ],
    credentials: true
}))

app.use(cookieParser())
app.use(limiter)
app.use(express.json())

//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*

app.use("/api/citas", limiter, citasMedicas)
app.use("/api/equipo",limiter,  equipoMedico)
app.use("/api/especialidades",limiter, especialidadesMedicas)
app.use("/api/expedientes",limiter, expedientes)
app.use("/api/login",limiter, login)
app.use("/api/logout",limiter, logout)
app.use("/api/pacientes",limiter, paciente)
app.use("/api/recovery",limiter, recoveryPassword)
app.use("/api/registrar",limiter, registrar)


//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*


export default app