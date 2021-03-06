const mongoose = require('mongoose') // mongoose package
const validator = require('validator') // Field Validation
const bycypt = require('bcryptjs') //Password Encreption
const jwt = require('jsonwebtoken') //Token Generate

const Task = require('../models/task')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required: true
    },
    email:{
        type:String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("Invalid Email Address..")
        }
    },
    password:{
        type: String,
        minlength: 7,
        trim:true,
        required: true,
        validate(value){
            if(value.toLowerCase().includes('password'))
                throw new Error('Password Does Not Contain Password')
        }
    },  
    age: {
        type:Number,
        default: 18
    },
    tokens: [{
        token:{
                type:String
        }
    }],
    avatar: {
        type: Buffer
    }
},{
    timestamps: true
})
//virtual Field Not Store in Database
userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'author'
})
//Generate Token With User ID
userSchema.methods.generateToken = async function() {
    const user = this
    
    const tkn = jwt.sign({_id: user._id.toString()},process.env.JWT_TOKEN)
    user.tokens = user.tokens.concat({token:tkn}) 
    await user.save()
    return tkn;
}
//Autometical Call When User Object Pass In res Method
userSchema.methods.toJSON =  function(){
    try{
        const user = this
        const publicProfile = user.toObject()
        delete publicProfile.password
        delete publicProfile.tokens
        delete publicProfile.avatar
        return publicProfile
    }catch(e)
    {
        console.log(e)
        return {}
        
    }
}
//For Login
userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})
    console.log(password)
    if(!user)
        throw new Error('Unable To Login')

    const isMatch = await bycypt.compare(password, user.password)
    console.log(user.password)
    if(!isMatch)
        throw new Error('Incorrect Password')
    return user
}
//Hash the Plain Text Password Before Save
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password'))
        user.password = await bycypt.hash(user.password,8)
    next()
})
//Delete Task when User Delete Account 
userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({author: user._id})
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User;  