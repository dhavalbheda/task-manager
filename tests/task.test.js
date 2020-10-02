
const request = require('supertest')
const app = require('../src/app')


const {userOne,
        userOneId,
        userTwo,
        userTwoId,
        taskOne,
        taskTwo,
        taskThree,
    setupDatabase} = require('./fixtures/db')

const Task = require('../src/models/task')

beforeEach(setupDatabase)

test('create Task', async() => {
    const response = await request(app)
                    .post('/tasks')
                    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                    .send({
                        description: '1 Test'
                    })
                    .expect(201)
    
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.status).toEqual(false)
})

test('get Task', async() =>{
    const response = await request(app)
                    .get('/tasks')
                    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                    .send()
                    .expect(202)
    expect(response.body.length).toEqual(2)
})

test('Delete Task From Non User', async()=>{
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization',`Bearere ${userTwo.tokens[0].token}`)
        .send()
        .expect(401)

    const task = Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})