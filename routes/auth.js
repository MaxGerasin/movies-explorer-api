const router = require('express').Router();
const { postUser, login, logout } = require('../controllers/users');
const { signinCelebrate, signupCelebrate } = require('../middlewares/celebrate');

router.post('/signin', signinCelebrate, login);
router.post('/signup', signupCelebrate, postUser);
router.get('/signout', logout);

module.exports = router;
