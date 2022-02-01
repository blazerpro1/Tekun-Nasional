const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')


/* eslint-env node */
app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(express.json()) //=> req.body (diff from video part-2)

const AuthenticationController = require('./controllers/AuthenticationController')
app.post('/login', AuthenticationController.login);

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register);

const forgotPassword = require("./controllers/forgotPassword");
app.post('/forgotPassword', 
forgotPassword.sendResetLink);

app.post('/resetPassword', 
forgotPassword.resetPassword);

app.use(require("./middleware/auth").verify) //Line 1
require('./routes')(app)
// app.use(require("./middleware/auth").verify) //Line 2
require('./services/reminder')()



sequelize.sync({ force: false })
    .then(() => {
        app.listen(config.port)
        console.log(`Server started on port ${config.port}`)
        })

