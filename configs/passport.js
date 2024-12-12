const passport = require("passport");
const userModel = require("../models/userModel");
const GoogleStrategy = require("passport-google-oauth20");

passport.use(userModel.createStrategy({}));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModel.findOne({ googleId: profile.id });
        if (!user) {
          user = await userModel.create({
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            googleId: profile.id,
            username: profile.displayName.toLowerCase().replace(/\s+/g, ""),
            email: profile.emails[0].value,
            profileImage: profile.photos[0].value,
          });
          console.log(user);
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
