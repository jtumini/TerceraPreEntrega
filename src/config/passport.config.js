import passport from 'passport'
import local from 'passport-local'
import passport_jwt from "passport-jwt"
import UserModel from '../models/user.models.js'
import { createHash, extractCookie, generateToken, isValidPassword, JWT_PRIVATE_KEY} from '../utils.js'

const JWTStrategy = passport_jwt.Strategy
const ExtractJWT = passport_jwt.ExtractJwt

const LocalStrategy = local.Strategy 

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(req, username, password, done) => {

        const { first_name, last_name, email, age } = req.body
        try {
            const user = await UserModel.findOne({ email: username })
            if (user) {
                console.log('User already exists')
                return done(null, false)
            }

            const newUser = {
                first_name, last_name, email, age, password: createHash(password) , role: email === 'admin@gmail.com' ? 'admin' : 'user'
            }
            const result = await UserModel.create(newUser)
            return done(null, result)
        } catch(err) {
            return done("error al obtener el user" + error)
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(username, password, done) => {
        try {
            const user = await UserModel.findOne({ email: username })
            if (!user ) {
                console.log("User dont exist");
                return done(null, false)
            }

            if (!isValidPassword(user, password)) return done(null, false)
            
            const token = generateToken(user)
            user.token = token
            
            return done(null, user)
        } catch(err) {

        }
    }))

    passport.use ('jwt', new  JWTStrategy ({
        jwtFromRequest: ExtractJWT.fromExtractors([extractCookie]),
        secretOrKey: JWT_PRIVATE_KEY
    }, async(jwt_payload, done)=>{
        done(null, jwt_payload)
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })

}

export default initializePassport; 