const express = require('express')
require('./db/mongoose')
const expensesRouter = require('./routers/expenses')
const categoryRouter = require('./routers/categories')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(expensesRouter)
app.use(categoryRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
