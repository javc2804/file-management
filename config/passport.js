import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import Usuario from "../models/Usuario.js";

import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      Usuario.findOne({ googleId: profile.id }, function (err, user) {
        if (err) {
          return cb(err);
        }
        if (!user) {
          user = new Usuario({
            googleId: profile.id,
            email: profile.emails[0].value,
            nombre: profile.displayName,
            password: "password predeterminada",
            confirmado: true,
          });
          // return;
          user.save(function (err) {
            if (err) console.log(err);
            return cb(err, user);
          });
        } else {
          return cb(err, user);
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Usuario.findById(id).then((user) => {
    done(null, user);
  });
});
