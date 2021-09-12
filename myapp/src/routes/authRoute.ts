import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { createUser, getUserByEmail } from "../db/user-actions";
import { User } from "../entity/User"
import * as passport from "passport";

const router = Router()

export const registerUser = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await getUserByEmail(req.body.email);
        if (user !== undefined) {
            return res.status(401).send("User already exists");
        }
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // The API might be differerent to create the user?
        const newUser = new User(req.body.username, req.body.email, req.body.password)
        const createdUser = await createUser(newUser)
        
        res.status(201).send(`Registered User with id: ${createdUser.id}`);
    } catch (e) {
        console.error(e);
        res.status(400).send(
            `The server couldn't process your request, sorry!`,
        );
    }
};
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        passport.authenticate("local", (err, usr, info) => {
            if (info !== undefined) {
                return res.send(info.message);
            }
            if (err) throw err;
            if (!usr) return res.send("No User Exists");
            req.login(usr, (err) => {
                if (err) throw err;
                res.send("You were authenticated & logged in!\n");
            });
        })(req, res, next);
    } catch (e) {
        console.error(e);
        res.status(400).send(
            `The server couldn't process your request, sorry!`,
        );
    }
};
export const logout = (req: Request, res: Response) => {
    req.logout();
    res.send("logged out user");
};
export const getUser = (req: Request, res: Response) => {
    res.send(req.user);
};

router.get('/register', (req, res, next) => {
    const form = '<h1>Register Page</h1><form method="post" action="/auth/register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Email:<br><input type="email" name="email">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
})

router.post('/register', registerUser)

router.post('/login', login);

router.get('/login', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="/auth/login">\
    Enter Email:<br><input type="email" name="email">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

export default router