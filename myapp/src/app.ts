const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
var passport = require('passport')
var crypto = require('crypto')
// var routes = require('./routes')
const connection = require('./config/database')

import goalRoute from "./routes/goalRoute"
import userRoute from "./routes/userRoute"
import "reflect-metadata";
import {createConnection} from "typeorm"

// testing out handlebars *****
import {getAllGoals} from "./db";
const exphbs = require('express-handlebars')


export const app = express()

app.use(express.json())                             // for parsing application/json
app.use(express.urlencoded({extended: true}))       // for parsing application/x-www-form-urlencoded
app.use("/goal", goalRoute);
app.use("/user", userRoute);

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// Handlebars Middleware *****
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Homepage Route *****
async function getGoals(){
    const goals = await getAllGoals()
    return goals
}

app.get('/', async (req,res) => {
    const goals = await getGoals()
    res.render('index', {title: 'Goal Tracker', goals})
})

const port = 3000

createConnection().then(connection => {

    app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

})