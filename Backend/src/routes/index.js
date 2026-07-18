const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const userRoutes = require('../modules/users/user.routes');
const adminRoutes = require('../modules/users/admin.routes');

const router = express.Router();


router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/admin/users', adminRoutes);

module.exports = router;
