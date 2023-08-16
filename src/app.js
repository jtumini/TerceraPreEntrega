import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from "socket.io";
import mongoose from 'mongoose' 
import session from 'express-session'
import MongoStore from "connect-mongo";
import __dirname from "./utils.js"
import passport from "passport";
import cookieParser from "cookie-parser";
import initializePassport from "./config/passport.config.js";
import run from "./run.js";

const app = express ()

app.use(express.static('./src/public'))
app.use(express.json())
app.use(cookieParser())
app.use('/products' , viewsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/session', sessionRouter)
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))

app.engine ('handlebars' , handlebars.engine())

app.get ('/' , (req,res) => res.send('Servidor activo'))
app.use('/api/products' , productsRouter)

app.set("views" , __dirname + "/views" ) 
app.set("view engine" , "handlebars")


const MONGO_URI = "mongodb://localhost:27017"
const MONGO_DB_NAME = "coder_proyect"



app.use(session({
    secret: 'secretWord',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(MONGO_URI, {
    dbName: MONGO_DB_NAME
}, (error) => {
    if(error){
        console.log("DB No conected...")
        return
    }
    const httpServer = app.listen(8080, () => console.log("Listening..."))
    const socketServer = new Server(httpServer)
    httpServer.on("error", (e) => console.log("ERROR: " + e))

    run(socketServer, app)
})

// app.get ('/user/profile', (req, res) => {
//     const user = {  
//         username: req.session.user.username ,
//         ui_preference: 'dark',
//         language: 'es',
//         location: 'ar'
//     }
//     // res.cookie('preference', JSON.stringify(user), {signed: true})
//     req.session.user = user
//     res.json({ status: 'succes', message: 'session creada!' })
// })


// app.get('/user/getpreference',(req, res)=>{
//     res.send(req.session.user.username)
// })

// app.get('/user/deletepreference',(req, res)=>{
//     req.session.destroy( err=> {
//         if (err) return res.json ({ status: 'error', message: 'Ocurrio un error' })
//         return res.json({status:'succes', message:'Cookie deleteada' })
//     })
// })

// const auth = (req, res, next) => {
//     if (req.session?.user && req.session.user.username === "juantumini") {
//         return next ()
//     }
//     return res.status(401).json({ status: 'fail' , message: 'auth error'})
// }

// app.get('/products', auth, (req, res) => {
//     res.render('products', {
//         username: 'juantumini'
//     })
// })



