const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { validate, adminCreateUserSchema, adminUpdateUserSchema, adminChangeRoleSchema } = require('../validations/userValidation');
const {
    listUsers,
    createUser,
    updateUser,
    changeRole,
    deleteUser
} = require('../controllers/adminUserController');

// Every route here requires an authenticated admin.
router.use(protect, admin);

router.get('/users', listUsers);
router.post('/users', validate(adminCreateUserSchema), createUser);
router.put('/users/:id', validate(adminUpdateUserSchema), updateUser);
router.patch('/users/:id/role', validate(adminChangeRoleSchema), changeRole);
router.delete('/users/:id', deleteUser);

module.exports = router;
