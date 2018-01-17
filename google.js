
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('./User');

passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (obj, done) {
    done(null, obj);
})

passport.use(new GoogleStrategy({
    clientID: "288577850664-i4tta03f23tim3rvtclh3djv7lqvam0i.apps.googleusercontent.com",
    clientSecret: "WppgzIWhvgKzYzM-x1gC4uEw",
    callbackURL: "http://localhost:3000/login/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        console.log('Objeto Profile: ' + JSON.stringify(profile));
        User.findOrCreate({ userid: profile.id }, {
            name: profile.displayName,
            userid: profile.id,
            email: profile.emails[0].value, 
            photo: profile._json.image.url
        }, function (err, user) {
            return done(err, user);
        });
    }
));

module.exports = passport;
