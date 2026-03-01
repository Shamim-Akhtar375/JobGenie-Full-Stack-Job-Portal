const express = require('express');
const router = express.Router();
const { applyForJob, getJobApplications, updateStatus, getEmployeeApplications } = require('../controllers/applicationController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Protected: Apply for job (Employee only)
router.post('/apply', authMiddleware, roleMiddleware(['employee']), applyForJob);

// Protected: Get employee's own applications
router.get('/employee', authMiddleware, roleMiddleware(['employee']), getEmployeeApplications);

// Protected: Get applications for a job (Employer only)
router.get('/job/:job_id', authMiddleware, roleMiddleware(['employer']), getJobApplications);

// Protected: Update application status (Employer only)
router.put('/:id/status', authMiddleware, roleMiddleware(['employer']), updateStatus);

module.exports = router;
