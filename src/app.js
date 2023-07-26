import express from 'express'
import handlebars from 'express-handlebars'
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/cart.router.js'
import viewsRouter from './routers/views.router.js'
import mongoose from 'mongoose' 
import { Server } from 'socket.io'


const app = express ()

app.engine ('handlebars' , handlebars.engine())
app.set('views' , './src/views') 
app.set('view engine' , 'handlebars')

app.use(express.static('./src/public'))
app.use(express.json(   ))

app.get ('/' , (req,res) => res.send('Servidor activo'))
app.use('/api/products' , productsRouter)
app.use('/products' , viewsRouter)
app.use('/api/carts', cartsRouter)

mongoose.set('strictQuery',false)
try {
    await mongoose.connect('mongodb+srv://juantumini5:juantumini5@cluster0.7ascp7r.mongodb.net/')
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