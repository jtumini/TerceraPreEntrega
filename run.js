import productRouter from "./src/routers/products.router.js"
import cartRouter from "./src/routers/cart.router.js"
import chatRouter from "./src/routers/chat.router.js"
import messagesModel from "./src/dao/models/message.models.js";
import productViewsRouter from './src/routers/views.router.js'
import sessionRouter from './src/routers/session.router.js'
import { passportCall, handlePolicies } from "./utils.js";


const run = (socketServer, app) => {
    app.use((req, res, next) => {
        req.io = socketServer
        next()
    })

    app.use("/products", passportCall('jwt'), handlePolicies(['ADMIN']), productViewsRouter)
    app.use("/session", sessionRouter)


    app.use("/api/products", productRouter)
    app.use("/api/carts", cartRouter)
    app.use("/api/chat", chatRouter)


    socketServer.on("connection", socket => {
        console.log("New client connected")
        socket.on("message", async data => {
        await messagesModel.create(data)
        let messages = await messagesModel.find().lean().exec()
        socketServer.emit("logs", messages)
        })
    })

    app.use("/", (req, res) => res.send("HOME"))

}

export default run