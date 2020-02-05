const mongoose = require('mongoose')

// could change and should be put into some config file in future
const dbUrl = 'mongodb+srv://budgetapp:budgetapp1234@cluster0-49c5u.mongodb.net/budget-app-api'

mongoose.connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
