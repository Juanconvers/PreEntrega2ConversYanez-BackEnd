import express from 'express'
import mongoose from 'mongoose'
import messageModel from './models/messages.js'
import indexRouter from './routes/indexRouter.js'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'


//Configuraciones o declaraciones
const app = express()
const PORT = 11000

//Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(server)

//Connection DB
mongoose.connect("mongodb+srv://juanconverslegal:Malkut27.7@cluster0.j6k2srb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB is connected"))
    .catch(e => console.log(e))


    await orderModel.insertMany([
        { title: "Avena", description: "El mejor", category: "Producto no perecedero", status: true, stock: 65, code: "AV2", price: 1500, thumbnail: [] },
        { title: "Platano", description: "El mejor", category: "Producto perecedero", status: true, stock: 16, code: "BV6", price: 450, thumbnail: [] },
        { title: "Blanquador", description: "El mejor", category: "Producto de aseo", status: true, stock: 85, code: "CV7", price: 1250, thumbnail: [] },
        { title: "Harina de maiz", description: "El mejor", category: "Producto no perecedero", status: true, stock: 33, code: "AV3", price: 1970, thumbnail: [] },
        { title: "Banano", description: "El mejor", category: "Producto perecedero", status: true, stock: 150, code: "BV12", price: 750, thumbnail: [] },
        { title: "Jabón azul", description: "Calidad superior", category: "Producto de aseo", status: true, stock: 17, code: "CV3", price: 2500, thumbnail: [] },
        { title: "Arroz", description: "Excelente condición", category: "Producto no perecedero", status: true, stock: 75, code: "AV5", price: 3500, thumbnail: [] },
        { title: "Manzana", description: "Perfecta condición", category: "Producto perecedero", status: true, stock: 100, code: "BV5", price: 350, thumbnail: [] },
        { title: "Limpiador multiusos", description: "Perfecta condición", category: "Producto de aseo", status: true, stock: 32, code: "CV6", price: 1000, thumbnail: [] },
        { title: "Garbanzo", description: "Calidad superior", category: "Producto no perecedero", status: true, stock: 27, code: "AV10", price: 975, thumbnail: [] },
        { title: "Aceituna", description: "Calidad superior", category: "Producto no perecedero", status: true, stock: 45, code: "AV11", price: 4500, thumbnail: [] },
        { title: "Jabón detergente", description: "Excelente condición", category: "Producto de aseo", status: true, stock: 18, code: "CV45", price: 3200, thumbnail: [] },
        { title: "Lechuga", description: "Excelente condición", category: "Producto perecedero", status: true, stock: 20, code: "BV8", price: 1300, thumbnail: [] },
        { title: "Zanahoria", description: "Perfecta condición", category: "Producto perecedero", status: true, stock: 75, code: "BV10", price: 500, thumbnail: [] },
        { title: "Cepillo para el piso", description: "Perfecta condición", category: "Producto de aseo", status: true, stock: 6, code: "CV2", price: 1550, thumbnail: [] },
    ])




//Middlewares
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/', indexRouter)
io.on('connection', (socket) => {
    console.log("Conexion con Socket.io")
    socket.on('mensaje', async (mensaje) => {
        try {
            await messageModel.create(mensaje)
            const mensajes = await messageModel.find()
            io.emit('mensajeLogs', mensajes)
        } catch (e) {
            io.emit('mensajeLogs', e)
        }
    })
})
