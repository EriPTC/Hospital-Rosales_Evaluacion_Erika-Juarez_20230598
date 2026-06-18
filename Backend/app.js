import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import limiter  from "./src/middlewares/limiter"

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

export default app