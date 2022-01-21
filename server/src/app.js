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

require('./routes')(app)
app.use(require("./middleware/auth").verify);



sequelize.sync({ force: false })
    .then(() => {
        app.listen(config.port)
        console.log(`Server started on port ${config.port}`)
        })

