import express, { json } from 'express'
import handlebars from 'express-handlebars'
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/cart.router.js'
import viewsRouter from './routers/views.router.js'
import mongoose from 'mongoose' 
import { Server } from 'socket.io'
import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express ()

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017',
        dbName:'usuarios',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }    
    }),
    secret: 'secretWord',
    resave: true,
    saveUninitialized: true
}))

app.get ('/user/profile', (req, res) => {
    const user = {  
        username: req.session.user.username ,
        ui_preference: 'dark',
        language: 'es',
        location: 'ar'
    }
    // res.cookie('preference', JSON.stringify(user), {signed: true})
    req.session.user = user
    res.json({ status: 'succes', message: 'session creada!' })
})


app.get('/user/getpreference',(req, res)=>{
    res.send(req.session.user.username)
})

app.get('/user/deletepreference',(req, res)=>{
    req.session.destroy( err=> {
        if (err) return res.json ({ status: 'error', message: 'Ocurrio un error' })
        return res.json({status:'succes', message:'Cookie deleteada' })
    })
})

app.engine ('handlebars' , handlebars.engine())
app.set('views' , './src/views') 
app.set('view engine' , 'handlebars')

app.use(express.static('./src/public'))
app.use(express.json(   ))

app.get ('/' , (req,res) => res.send('Servidor activo'))
app.use('/api/products' , productsRouter)
app.use('/products' , viewsRouter)
app.use('/api/carts', cartsRouter)

const auth = (req, res, next) => {
    if (req.session?.user && req.session.user.username === "juantumini") {
        return next ()
    }
    return res.status(401).json({ status: 'fail' , message: 'auth error'})
}

app.get('/products', auth, (req, res) => {
    res.render('products', {
        username: 'juantumini'
    })
})

mongoose.set('strictQuery',false)
try {
    await mongoose.connect('mongodb://localhost:27017')
} catch (err){
    console.log('no se pudo conectar a la base')
}
    

const serverHttp = app.listen(8080,() => console.log('server up'))
const io = new Server(serverHttp)

app.set('socketio' , io)

io.on('connection', () => {
    console.log('se ah realizado una conexion!')
})

export { app, io };