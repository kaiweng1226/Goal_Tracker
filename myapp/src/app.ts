import goalRoute from "./routes/goalRoute"
import authRoute from "./routes/authRoute"
import "reflect-metadata";
import {createConnection} from "typeorm"
import {renderFile} from "squirrelly"

// for authentication
import passportConfig from "./auth/passport-conf";
import * as session from "express-session";
import * as passport from "passport";
import * as express from "express"
export const app = express()
// IMPORTANT: Order matters when it comes to middle ware
app.use(express.json())                             // for parsing application/json
app.use(express.urlencoded({extended: true}))       // for parsing application/x-www-form-urlencoded
app.engine('html', renderFile)
app.set('views', './src/views')
// Authentication middleware
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat', // TODO get the secret from an environment var
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport) // might fix the error


app.use("/auth", authRoute)
app.use("/goal", goalRoute);


const port = 3000

createConnection().then(connection => {

    app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

})
