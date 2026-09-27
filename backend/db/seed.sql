
-- Seed Users (Role: instructor)
INSERT IGNORE INTO users (name, email, password, role) VALUES
('Sarah Jenkins', 'sarah@yoga.com', '$2a$10$YourHashedPasswordHere', 'instructor'),
('Michael Chen', 'michael@yoga.com', '$2a$10$YourHashedPasswordHere', 'instructor'),
('Elena Rodriguez', 'elena@yoga.com', '$2a$10$YourHashedPasswordHere', 'instructor');

-- Seed Instructors (linked to users via email)
INSERT IGNORE INTO instructors (user_id, bio) 
SELECT id, 'Expert in Vinyasa and Hatha with 10 years of experience.' FROM users WHERE email = 'sarah@yoga.com';
INSERT IGNORE INTO instructors (user_id, bio) 
SELECT id, 'Specializes in restorative yoga and meditation.' FROM users WHERE email = 'michael@yoga.com';
INSERT IGNORE INTO instructors (user_id, bio) 
SELECT id, 'Passionate about Power Yoga and strength training.' FROM users WHERE email = 'elena@yoga.com';

-- Seed Yoga Classes (linked to instructors via instructor_id lookup)
INSERT INTO yoga_classes (instructor_id, title, description, class_date, start_time, duration, difficulty, meeting_link, max_students) 
SELECT i.id, 'Morning Vinyasa Flow', 'Dynamic Vinyasa flow for energy.', '2026-09-20', '08:00:00', 60, 'Intermediate', 'https://meet.google.com/abc-def-ghi', 20 
FROM instructors i JOIN users u ON i.user_id = u.id WHERE u.email = 'sarah@yoga.com';

INSERT INTO yoga_classes (instructor_id, title, description, class_date, start_time, duration, difficulty, meeting_link, max_students) 
SELECT i.id, 'Hatha Harmony', 'Gentle Hatha yoga for balance.', '2026-09-21', '10:00:00', 75, 'Beginner', 'https://meet.google.com/xyz-123-456', 25 
FROM instructors i JOIN users u ON i.user_id = u.id WHERE u.email = 'sarah@yoga.com';

INSERT INTO yoga_classes (instructor_id, title, description, class_date, start_time, duration, difficulty, meeting_link, max_students) 
SELECT i.id, 'Restorative Sunset', 'Relaxing restorative session.', '2026-09-20', '18:00:00', 45, 'Beginner', 'https://meet.google.com/uvw-789-012', 15 
FROM instructors i JOIN users u ON i.user_id = u.id WHERE u.email = 'michael@yoga.com';

INSERT INTO yoga_classes (instructor_id, title, description, class_date, start_time, duration, difficulty, meeting_link, max_students) 
SELECT i.id, 'Midday Meditation', 'Guided midday meditation.', '2026-09-22', '12:00:00', 30, 'Beginner', 'https://meet.google.com/jkl-456-789', 30 
FROM instructors i JOIN users u ON i.user_id = u.id WHERE u.email = 'michael@yoga.com';

INSERT INTO yoga_classes (instructor_id, title, description, class_date, start_time, duration, difficulty, meeting_link, max_students) 
SELECT i.id, 'Power Yoga Intensity', 'Challenging power yoga class.', '2026-09-23', '07:00:00', 60, 'Advanced', 'https://meet.google.com/mno-321-654', 15 
FROM instructors i JOIN users u ON i.user_id = u.id WHERE u.email = 'elena@yoga.com';

INSERT INTO yoga_classes (instructor_id, title, description, class_date, start_time, duration, difficulty, meeting_link, max_students) 
SELECT i.id, 'Strength & Core', 'Focused core strength training.', '2026-09-24', '17:30:00', 60, 'Intermediate', 'https://meet.google.com/pqr-987-321', 20 
FROM instructors i JOIN users u ON i.user_id = u.id WHERE u.email = 'elena@yoga.com';
