const express = require('express')
require('./db/mongoose')
const categoryRouter = require('./routers/categories')
const expensesRouter = require('./routers/expenses')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(categoryRouter)
app.use(expensesRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
