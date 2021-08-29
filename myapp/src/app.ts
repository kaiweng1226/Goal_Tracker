import goalRoute from "./routes/goalRoute"
import userRoute from "./routes/userRoute"
import "reflect-metadata";
import {createConnection} from "typeorm";
const express = require('express')
export const app = express()
app.use(express.json())                             // for parsing application/json
app.use(express.urlencoded({extended: true}))     // for parsing application/x-www-form-urlencoded
app.use("/goal", goalRoute);
app.use("/user", userRoute);

const port = 3000

createConnection().then(connection => {

    app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

})