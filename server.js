const express = require('express')
const connectDB = require('./config/db')

const app = express()

//import routers
const usersRouter = require('./routes/api/users')
const postsRouter = require('./routes/api/posts')
const authRouter = require('./routes/api/auth')
const profileRouter = require('./routes/api/profile')

//connect database
connectDB()

app.get('/', (req, res) => {
    res.send('Hello')
})

//define routers
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)
app.use('/api/posts', postsRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on ${PORT}`))