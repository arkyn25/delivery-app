const router = require('express').Router();
const loginController = require('../controllers/login');

router.get('/', loginController.login);
router.post('/login', loginController.login2);

module.exports = router;