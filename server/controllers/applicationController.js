const db = require('../config/db');

// Apply for job (Employee only)
const applyForJob = async (req, res) => {
    try {
        const { job_id } = req.body;
        const employee_id = req.user.id;

        const [existing] = await db.query('SELECT * FROM applications WHERE job_id = ? AND employee_id = ?', [job_id, employee_id]);
        if (existing.length > 0) return res.status(400).json({ message: 'Already applied' });

        await db.query('INSERT INTO applications (job_id, employee_id) VALUES (?, ?)', [job_id, employee_id]);
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error in applying for job' });
    }
};

// Get all applications for a job (Employer only)
const getJobApplications = async (req, res) => {
    try {
        const { job_id } = req.params;
        const [rows] = await db.query(
            'SELECT applications.*, users.name as applicant_name, users.email as applicant_email FROM applications JOIN users ON applications.employee_id = users.id WHERE applications.job_id = ? ORDER BY applied_at DESC',
            [job_id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching applications' });
    }
};

// Update application status (Employer only)
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await db.query('UPDATE applications SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Status updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating status' });
    }
};

// Get employee's own applications
const getEmployeeApplications = async (req, res) => {
    try {
        const employee_id = req.user.id;
        const [rows] = await db.query(
            'SELECT applications.*, jobs.title as job_title, jobs.location FROM applications JOIN jobs ON applications.job_id = jobs.id WHERE applications.employee_id = ? ORDER BY applied_at DESC',
            [employee_id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching applications' });
    }
};

module.exports = { applyForJob, getJobApplications, updateStatus, getEmployeeApplications };
