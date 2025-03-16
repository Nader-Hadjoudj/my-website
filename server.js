import express from "express";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// 🔹 Route to Start Google Login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 🔹 Google OAuth Callback Route
app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard"); // Redirect after successful login
  }
);

// 🔹 Logout Route
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// Test Route to Check Authentication
app.get("/dashboard", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.json({ success: true, user: req.user });
});

// Start Server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
