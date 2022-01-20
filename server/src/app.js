const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const passport = require('passport')

/* eslint-env node */
app.use(cors())

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(express.json()) //=> req.body (diff from video part-2)

require('./passport')(passport);
app.use(passport.initialize());
// app.use(passport.session());

require('./routes')(app)

sequelize.sync({ force: false })
    .then(() => {
        app.listen(config.port)
        console.log(`Server started on port ${config.port}`)
        })

