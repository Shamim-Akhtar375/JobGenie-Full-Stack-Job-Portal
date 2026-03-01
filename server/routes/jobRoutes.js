const express = require('express');
const router = express.Router();
const { createJob, getJobs, getEmployerJobs, deleteJob } = require('../controllers/jobController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Public: Get all jobs with filters
router.get('/', getJobs);

// Protected: Get employer's own jobs
router.get('/employer', authMiddleware, roleMiddleware(['employer']), getEmployerJobs);

// Protected: Post/Delete jobs (Employer only)
router.post('/', authMiddleware, roleMiddleware(['employer']), createJob);
router.delete('/:id', authMiddleware, roleMiddleware(['employer']), deleteJob);

module.exports = router;
