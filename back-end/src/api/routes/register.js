const router = require('express').Router();
const { registerUser, registerByAdmin } = require('../controllers/registerController');

router.get('/register', (req, res) => res.send('to na rota!'));
router.post('/register', registerUser);
router.post('/register/admin', registerByAdmin);

module.exports = router;