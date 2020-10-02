const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id:userOneId,
    name:'Mike',
    email: 'mike@example.com',
    password: 'mike@123',
    tokens:[{
        token:jwt.sign({_id:userOneId},process.env.JWT_TOKEN)
    }]
}
const userTwoId = new mongoose.Types.ObjectId()

const userTwo = {
    _id:userTwoId,
    name:'Dhaval Bheda',
    email: 'dhaval@example.com',
    password: 'dhaval@123',
    tokens:[{
        token:jwt.sign({_id:userTwoId},process.env.JWT_TOKEN)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First Task',
    author: userOneId
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second Task',
    author: userTwoId,
    status:true
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Three Task',
    author: userOneId
}

const setupDatabase = async ()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()

}

module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}