//For Node Server
const express = require('express')

//For MongoDb
try{
    require('./db/mongoose')

}catch(e){
    console.log(e)
}

//For Router
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()


app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

module.exports = app

