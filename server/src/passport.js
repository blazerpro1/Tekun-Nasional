// const passport = require('passport');
const config = require('./config/config');
const {
    User
} = require('./models')

const {
    Strategy,
    ExtractJwt
} = require('passport-jwt')

module.exports = (passport) => {
    console.log('ahhh');

    passport.use(
        new Strategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.authentication.jwtSecret
        }, async function (payload, done) {
            const user = await User.findOne({
                where: {
                    id: payload.id,
                    role: payload.roles
                }
            });

            if (!user) {
                return done(new Error(), null);
            } else {
                return done(null, user);
            }

            // then(user => {
            //     console.log(`fdafd`)
            //     console.log(user)
            //     console.log(`fdafd`)

            // }).catch((err) => {
            //     done(new Error(), null)
            //   })
        })
    )
};