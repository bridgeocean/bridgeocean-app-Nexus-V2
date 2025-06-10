-- Create candidates table if it doesn't exist
CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    stage VARCHAR(50) DEFAULT 'Screening',
    status VARCHAR(50) DEFAULT 'Active',
    service_type VARCHAR(50) DEFAULT 'ehailing',
    vehicle VARCHAR(100),
    address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample candidates for testing
INSERT INTO candidates (name, email, phone, stage, status, service_type, vehicle) VALUES
('Tobi Johnson', 'tobi.johnson@email.com', '+234 803 123 4567', 'Screening', 'Active', 'ehailing', 'Toyota Camry'),
('Mike Johnson', 'mike.johnson@email.com', '+234 813 526 1568', 'Onboarding', 'Active', 'ehailing', 'Toyota Camry'),
('Sarah Williams', 'sarah.williams@email.com', '+234 805 123 4567', 'Interview', 'Active', 'ehailing', 'GMC Terrain'),
('David Chen', 'david.chen@email.com', '+234 701 987 6543', 'Selection', 'Active', 'ehailing', 'Toyota Camry')
ON CONFLICT (email) DO NOTHING;

-- Create messages table for WhatsApp analytics
CREATE TABLE IF NOT EXISTS whatsapp_messages (
    id SERIAL PRIMARY KEY,
    recipient_phone VARCHAR(20),
    message_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'sent',
    delivered_at TIMESTAMP,
    read_at TIMESTAMP,
    replied_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample message data
INSERT INTO whatsapp_messages (recipient_phone, message_type, status, delivered_at, read_at) VALUES
('+234 803 123 4567', 'screening', 'delivered', CURRENT_TIMESTAMP - INTERVAL '2 hours', CURRENT_TIMESTAMP - INTERVAL '1 hour'),
('+234 813 526 1568', 'inspection_reminder', 'read', CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_TIMESTAMP - INTERVAL '23 hours'),
('+234 805 123 4567', 'interview_invite', 'delivered', CURRENT_TIMESTAMP - INTERVAL '3 hours', CURRENT_TIMESTAMP - INTERVAL '2 hours')
ON CONFLICT DO NOTHING;
