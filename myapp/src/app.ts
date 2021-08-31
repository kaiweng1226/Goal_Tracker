import goalRoute from "./routes/goalRoute"
import userRoute from "./routes/userRoute"
import "reflect-metadata";
import {createConnection} from "typeorm"
import {renderFile} from "squirrelly"

const express = require('express')
export const app = express()

app.use(express.json())                             // for parsing application/json
app.use(express.urlencoded({extended: true}))       // for parsing application/x-www-form-urlencoded
app.use("/goal", goalRoute);
app.use("/user", userRoute);
app.engine('html', renderFile)
app.set('views', './src/views')

/*
app.get('/', (req, res) => {
    res.render("template.html", {Hello: "World"})
})
*/

const port = 3000

createConnection().then(connection => {

    app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

})