const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth');
const adminController = require('../controllers/adminController');

router.get('/', (req, res) => {
    res.send('Hello WORlD')
})

router.post('/signup', authController.postSignup)
router.post('/login', authController.postLogin)

router.get('/users', adminController.getAllusers)

router.get('/users/:email', adminController.user);
router.delete('/users/:email', adminController.deleteUser)
router.put('/users/:email', adminController.updateUser)


router.post('/questions', adminController.addQuestion)
router.get('/questions', adminController.getAllQuestion)
router.delete('/questions/:id', adminController.deleteQuestion)
router.put('/questions/:id', adminController.updateQuestion)


module.exports = router