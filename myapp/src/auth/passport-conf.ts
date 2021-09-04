import { PassportStatic } from "passport";
import * as passportLocal from "passport-local";
import * as bcrypt from "bcrypt";
import { getUserByEmail, getUserById } from "../db/user-actions"; // TODO make the files
export default (passport: PassportStatic) => {
    const authenticateUser: passportLocal.VerifyFunction = async (
        email,
        password,
        done,
    ) => {
        try {
            const user = await getUserByEmail(email);
            if (user == null) {
                return done(null, false, {
                    message: "No user with that email",
                });
            }
            if (await bcrypt.compare(password, user.password)) {
                // The user will get passed into passport.serializeUser next!
                return done(null, user);
            } else {
                return done(null, false, { message: "Password incorrect" });
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(
        new passportLocal.Strategy(
            { usernameField: "email" },
            authenticateUser,
        ),
    );

    passport.serializeUser((user: { id: number }, done) => {
        return done(null, user.id);
    });
    passport.deserializeUser(async (id: number, done) => {
        try {
            const user = await getUserById(id);
            return done(null, user);
        } catch (err) {
            console.error(err);
        }
    });
};
