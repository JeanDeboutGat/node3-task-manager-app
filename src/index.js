const express = require('express')
require('./db/mongoose.js')

const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter, taskRouter)


app.listen(PORT, () => {
    console.log('server is up on port', PORT)
})

