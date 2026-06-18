import moongose from "mongoose"
import {config} from "./config.js"

moongose.connect(config.db.URI)

const connection = moongose.connection

connection.once("open", ()=> {
    console.log("DB is connected")
})

connection.on("disconnected", ()=> {
    console.log("DB is disconnected")
})

connection.on("error", (error)=> {
    console.log("error found" + error)
})