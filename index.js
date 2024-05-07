import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import lugarRoutes from './routes/lugarRoutes.js'
import paisRoutes from './routes/paisRoutes.js'
import usuariosRoutes from './routes/usuariosRoutes.js'
import auth from "./routes/auth.js"
import path from "path"

const app = express();

mongoose
    .connect(process.env.MONGO_DEPLOY)
    .then(() => console.log("conectado a mongo db"))
    .catch(() => console.log("error al conectar a mongo db"))

const port = process.env.PORT || 3002

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('./public/index.html', { root: path.resolve() })
})
app.use("/lugares", lugarRoutes);
app.use("/paises", paisRoutes)
app.use("/login", auth)
app.use("/users", usuariosRoutes)
app.listen(port)