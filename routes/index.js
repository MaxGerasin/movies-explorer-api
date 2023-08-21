const router = require('express').Router();
const authRouter = require('./auth');
const movieRouter = require('./movies');
const otherRouter = require('./other');
const userRouter = require('./users');
const authMiddleware = require('../middlewares/auth');

router.use(authRouter);

router.use(authMiddleware);

router.use(userRouter);
router.use(movieRouter);
router.use(otherRouter);

module.exports = router;
