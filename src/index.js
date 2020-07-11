//For Node Server
const express = require('express')

//For MongoDb
require('./db/mongoose')

//For Router
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT  

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port)

const multer = require('multer')
const upload = multer({
    dest: 'image'
})
app.post('/upload', upload.single('upload'), (req,res)=>res.send())