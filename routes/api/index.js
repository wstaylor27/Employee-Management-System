const router = require('express').Router();
const departmentRoutes = require('./departmentRoutes');
const rolesRoutes = require('./rolesRoutes');
const employeeRoutes = require('./employeeRoutes');

router.use('/department', departmentRoutes);
router.use('/roles', rolesRoutes);
router.use('/employee', employeeRoutes);

module.exports = router;