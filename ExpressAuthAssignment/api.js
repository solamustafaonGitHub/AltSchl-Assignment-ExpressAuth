const express = require('express')
const inventoryRouter = require('./router/inventory_route.js');
const usersRouter = require('./users/users_route.js');
const {connect} = require('./db/index')
const UserModel = require('./model/UserModel');
// create an express application
connect()
const app = express()

//port
const port = 8000;

// middleware
app.use(express.json())

// inventory
app.use('/items', inventoryRouter);

// user creation
app.use('/users', usersRouter);




app.post('/students', async (req, res) => {
const body = req.body
const student = await UserModel.create(body)
res.status(201).json(student)

})

app.get('/students', async (req, res) => {
    const students = await UserModel.find()
    res.status(200).json(students)
})
// 404
app.get('*' , (req, res) => {
    res.status(404).send('404 Item Not Found')
})



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
    }
)