import goalRoute from "./routes/goalRoute"
import userRoute from "./routes/userRoute"
import "reflect-metadata";
import {createConnection} from "typeorm"
import {renderFile} from "squirrelly"

// testing out handlebars *****
import {getAllGoals} from "./db";
import { Goal } from "./entity/Goal";
const exphbs = require('express-handlebars')

const express = require('express')
export const app = express()

app.use(express.json())                             // for parsing application/json
app.use(express.urlencoded({extended: true}))       // for parsing application/x-www-form-urlencoded
app.use("/goal", goalRoute);
app.use("/user", userRoute);

/*
app.engine('html', renderFile)
app.set('views', './src/views')
*/

/*
app.get('/', (req, res) => {
    res.render("template.html", {Hello: "World"})
})
*/

// Handlebars Middleware *****
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Homepage Route *****
async function getGoals(){
    const goals = await getAllGoals()
    return goals
}

app.get('/hello', async (req,res) => {
    const goals = await getGoals()
    res.render('index', {title: 'Goal Tracker', goals})
})

const port = 3000

createConnection().then(connection => {

    app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

})