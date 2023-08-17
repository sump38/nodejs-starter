const express = require('express');
const users = require('../data/users');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));


router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // const user = users.find(user => user.name.toLowerCase().trim() === username.toLowerCase().trim() && user.password === password);
    const user = users[0];
    if (user) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.status(401).json('Error occured');
    }
});



module.exports = router;