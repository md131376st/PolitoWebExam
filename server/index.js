'use strict';
const express = require('express');
const morgan = require('morgan');
const userDao = require('./dao_user'); // module for accessing the DB
const cors = require('cors');

// Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const app = new express();
const PORT = 3001;

// set up the middlewares
app.use(morgan('dev'));
app.use(express.json()); // for parsing json request body

// set up and enable cors
const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
};
app.use(cors(corsOptions));

// Passport: set up local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
	const user = await userDao.getUser(username, password)
	if (!user)
		return cb(null, false, 'Incorrect username or password.');

	return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

passport.deserializeUser(function (user, cb) { // this user is id + email + name
	return cb(null, user);
	// if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
	secret: "monadavari2021",
	resave: false,
	saveUninitialized: false,
}));

app.use(passport.authenticate('session'));

const StudyPlanRouter = require('./StudyPlanRouting');
const PREFIX = '/api/v1';
app.use(express.json());
app.use(PREFIX, StudyPlanRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
