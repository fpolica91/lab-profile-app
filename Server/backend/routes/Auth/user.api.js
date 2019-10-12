const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')

router.get('/auth/loggedin', (req, res, next) => {
    if (req.user) {
        req.user.encryptedPassword = undefined
        res.status(200).json(req.user)
    } else {
        res.status(401).json({ userDoc: null })
    }
})

router.post('/auth/signup', (req, res, next) => {
    const { username, password, campus, course } = req.body
    if (!username || !password || !campus || !course) {
        res.status(401).json({ message: "All fields are required" })
    }

    User.findOne({ username })
        .then(userAlreadyInDB => {
            if (userAlreadyInDB !== null) {
                res.status(404).json({ message: "username already in use" })
                return
            }
        })
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt)

    User.create({
        username: username,
        password: hashPass,
        campus: campus,
        course: course
    }).then(user => {
        req.login(user, (error) => {
            if (error) {
                res.status(500).json({ message: "Unable to Log In" })
                return
            }
            res.status(200).json(user)
        })
    })
})



router.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }
        if (!user) {
            res.status(401).json(failureDetails);
            return;
        }
        // save user in session
        req.login(user, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }
            user.encryptedPassword = undefined
            res.status(200).json({ user });
        });
    })(req, res, next);
})



router.delete("/auth/logout", (req, res, next) => {
    req.logout()
    res.json({ user: null })
})

router.post('/auth/edit', (req, res, next) => {
    const { username, campus, course } = req.body

    User.findByIdAndUpdate(req.user._id, {
        username,
        campus,
        course
    })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(err))
})






module.exports = router