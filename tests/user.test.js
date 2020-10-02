
const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const {userOne,userOneId,setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)


test('Upadate User', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Dhaval Bheda"
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Dhaval Bheda')

})

test('should login a existing User', async() => {
    await request(app).post('/users/login').send({
        email: 'mike@example.com',
    password: 'mike@123'
    }).expect(200)
})

test('should Sign Up a New User', async() => {
    await request(app).post('/users').send({
        name: 'OnlyD',
        email: 'onlyd@example.com',
        password: 'onlyd@123'
    }).expect(201)
})

test('should mot login a non-existing User', async() => {
    await request(app).post('/users/login').send({
        email: 'mike@example.com',
        password: 'ike@123'
    }).expect(400)
})

test('get Profile for User', async() => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('NOt get Profile for nonUser', async() => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Delete User', async() => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Delete NonUser', async() => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('upload Avatar',async () => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/8.jpeg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})