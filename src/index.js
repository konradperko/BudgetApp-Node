const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const expensesRouter = require('./routers/expenses')
const headersSettings = require('./configuration/headers.config')

const { KEYS, HEADERS_SETTINGS, METHODS } = headersSettings
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(allowCrossDomain)
app.use(expensesRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
