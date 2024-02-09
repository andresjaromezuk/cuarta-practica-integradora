import { dbChat } from "../../dao/mongoose/chat.mongoose.js"
import {randomUUID} from 'crypto'

export const chatController = {
    chat: async (req, res) =>{
        try {
            console.log("entra")
          const ioServer = req.io
          
          ioServer.on('connection', async (socket)=>{
             let messages = await dbChat.find().lean()
             console.log("Cliente conectado")
             socket.emit('mensajes', messages)
   
             socket.broadcast.emit('nuevoUsuario',
                  socket.handshake.auth.username
             )
   
             socket.on('mensaje', async message =>{
                  console.log("llega esto", message)
                  message._id = randomUUID()
                  const msg = await dbChat.create(message)
                  messages = await dbChat.find().lean()
                  ioServer.sockets.emit('mensajes',messages)
             })
   
             socket.on('disconnecting', reason => {
                  socket.broadcast.emit('usuarioDesconectado',
                    socket.handshake.auth.username)
             })
          })
          return res.render('chat', {title:"Chat"})
        } catch (error) {
             res.status(500).json({status: "Error", error: error.message})
        }
     }
}