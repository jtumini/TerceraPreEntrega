import { Router } from "express";
import { JWT_COOKIE_NAME } from '../utils.js'
import UserModel from "../dao/models/user.models.js";
import { isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router()


router.get('/register', (req, res) => {
    res.render('sessions/register')
})

// API para crear usuarios en la DB
router.post('/register', passport.authenticate('register', {
    failureRedirect: '/session/failRegister'
}), async(req, res) => {
    res.redirect('/session/login')
})

router.get('/failRegister', (req, res) => {
    res.send({ error: 'Failed!'})
})

// Vista de Login
router.get('/login', (req, res) => {
    res.render('/session/login')
})

// API para login
router.post('/login', passport.authenticate('login', { failureRedirect: '/session/failLogin'}), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: "error", error: "Invalid credentiales" })
    }
    res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/products')
})
router.get('/faillogin', (req, res) => {
    res.send({error: "Fail Login"})
})



// Cerrar Session
router.get('/logout', (req, res) => {
    res.clearCookie(JWT_COOKIE_NAME).redirect('/')
})



export default router