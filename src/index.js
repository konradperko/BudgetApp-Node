const express = require('express')
require('./db/mongoose')
const expensesRouter = require('./routers/expenses')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(expensesRouter)

const router = express.Router()
app.use(router)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
