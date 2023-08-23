const router = require('express').Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');
const { postMovieCelebrate, deleteMovieCelebrate } = require('../middlewares/celebrate');

router.get('/movies', getMovies);
router.post('/movies', postMovieCelebrate, postMovie);
router.delete('/movies/:movieId', deleteMovieCelebrate, deleteMovie);

module.exports = router;
