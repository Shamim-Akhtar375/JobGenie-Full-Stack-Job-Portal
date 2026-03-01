CREATE DATABASE IF NOT EXISTS jobgenie;
USE jobgenie;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('employer', 'employee') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jobs table
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employer_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    salary VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employer_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX (location),
    INDEX (title)
);

-- Profiles table (for employees)
CREATE TABLE profiles (
    user_id INT PRIMARY KEY,
    skills TEXT,
    experience TEXT,
    resume_path VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Applications table
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    employee_id INT NOT NULL,
    status ENUM('pending', 'shortlisted', 'rejected') DEFAULT 'pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sample Data
INSERT INTO users (name, email, password, role) VALUES 
('TechCorp Solutions', 'hr@techcorp.com', '$2a$10$X7.m1F7fG/fN.S9Z2l/KxeQf.XfRzM7zG7zG7zG7zG7zG7zG7zG7', 'employer'),
('InnovateSoft', 'hr@innovatesoft.io', '$2a$10$X7.m1F7fG/fN.S9Z2l/KxeQf.XfRzM7zG7zG7zG7zG7zG7zG7zG7', 'employer'),
('Global Systems', 'jobs@globalsystems.com', '$2a$10$X7.m1F7fG/fN.S9Z2l/KxeQf.XfRzM7zG7zG7zG7zG7zG7zG7zG7', 'employer');

INSERT INTO jobs (employer_id, title, description, location, salary) VALUES 
(1, 'Senior Software Engineer (React/Node)', 'We are looking for a highly skilled Senior Software Engineer to join our core product team. You will be responsible for building scalable web applications using React and Node.js. Experience with AWS and microservices is a plus.', 'Remote', '$120k - $160k'),
(1, 'Product Designer', 'Join TechCorp as a Product Designer and help us shape the future of our enterprise platform. You will work closely with product managers and engineers to create intuitive and beautiful user experiences.', 'San Francisco, CA', '$100k - $140k'),
(2, 'Backend Developer (Go)', 'InnovateSoft is expanding! We need a Backend Developer with strong Go experience to help us build high-performance APIs and distributed systems.', 'New York, NY', '$110k - $150k'),
(3, 'Data Analyst', 'Global Systems is looking for a Data Analyst to interpret complex data sets and provide actionable insights to our business units. Proficiency in SQL and Python is required.', 'Chicago, IL', '$85k - $115k'),
(2, 'Full Stack Intern', 'We are looking for a motivated Full Stack Intern to assist our team in developing new features. This is a great opportunity to learn from experienced developers and work on a real-world product.', 'Austin, TX', '$30 - $45 / hr');
