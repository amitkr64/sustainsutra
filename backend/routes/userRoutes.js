const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getMe, updatePassword, updateMe, forgotPassword, resetPassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimitMiddleware');
const { validate, registerSchema, loginSchema, updateProfileSchema, changePasswordSchema, forgotPasswordSchema, resetPasswordSchema } = require('../validations/userValidation');

router.post('/', authLimiter, validate(registerSchema), registerUser);
router.post('/login', authLimiter, validate(loginSchema), loginUser);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), resetPassword);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe);
router.put('/me', protect, validate(updateProfileSchema), updateMe);
router.put('/update-password', protect, validate(changePasswordSchema), updatePassword);

module.exports = router;
