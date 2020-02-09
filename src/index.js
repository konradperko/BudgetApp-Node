const express = require('express')
require('./db/mongoose')
const expensesRouter = require('./routers/expenses')
const headersSettings = require('./configuration/headers.config')

const { KEYS, HEADERS_SETTINGS, METHODS } = headersSettings
const app = express()
const port = process.env.PORT

const allowCrossDomain = (req, res, next) => {
    const {
        ACCESS_CONTROL_ALLOW_ORIGIN,
        ACCESS_CONTROL_ALLOW_METHODS,
        ACCESS_CONTROL_ALLOW_HEADERS
    } = KEYS
    res.header(
        ACCESS_CONTROL_ALLOW_ORIGIN,
        HEADERS_SETTINGS.get(ACCESS_CONTROL_ALLOW_ORIGIN)
    )
    res.header(
        ACCESS_CONTROL_ALLOW_METHODS,
        HEADERS_SETTINGS.get(ACCESS_CONTROL_ALLOW_METHODS)
    )
    res.header(
        ACCESS_CONTROL_ALLOW_HEADERS,
        HEADERS_SETTINGS.get(ACCESS_CONTROL_ALLOW_HEADERS)
    )

    if (req.method === METHODS.OPTIONS) {
        res.send(200)
        return
    }
    next()
}

app.use(express.json())
app.use(allowCrossDomain)
app.use(expensesRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
