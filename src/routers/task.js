const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
 
const router = new express.Router()


router.post('/tasks', auth, async(req,res) => {
    const task = new Task({
        ...req.body,
        author:req.user._id})

    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks',auth, async (req,res) => {
    const match = {}
    const sort = {}
    if(req.query.status)
        match.status = req.query.status === 'true'

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try{
        
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(202).send(req.user.tasks)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id',auth, async (req,res) => {

    const _id = req.params.id

    try{
        // const result = await Task.findById(_ID)
        const result = await Task.findOne({_id,author:req.user._id})

        result?res.status(202).send(result):res.status(404).send()
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id',auth, async(req,res) => {

    const taskField = ['_id', 'description', 'status']
    const updateField = Object.keys(req.body)

    if(!updateField.every(key => taskField.includes(key)))
        return res.status(400).send({'error': 'Invalid Update Operation'})
    
    try{
        const task = await Task.findOne({_id: req.params.id, author: req.user._id})
        
        if(!task)
            return res.status(404).send()

        updateField.forEach(key => task[key] = req.body[key])
        const result = await task.save()
        result?res.status(200).send(result):res.status(400).send()
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id',auth, async (req,res) => {
    try{
        const result = await Task.findOneAndDelete({_id: req.params.id, author: req.user._id})

        console.log(result)
        result?res.status(200).send(result):res.status(404).send()
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = router