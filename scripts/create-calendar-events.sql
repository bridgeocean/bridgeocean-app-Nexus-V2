-- Create calendar_events table for Bridgeocean calendar integration
CREATE TABLE IF NOT EXISTS calendar_events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('charter', 'interview', 'contract', 'handover', 'maintenance')),
    customer VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    duration VARCHAR(50),
    location TEXT,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    booking_id INTEGER REFERENCES charter_bookings(id),
    google_event_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_calendar_events_date ON calendar_events(date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_type ON calendar_events(type);
CREATE INDEX IF NOT EXISTS idx_calendar_events_status ON calendar_events(status);

-- Insert sample calendar events
INSERT INTO calendar_events (title, type, customer, date, time, duration, location, notes, status) VALUES
('Charter: Victoria Island to Lekki', 'charter', 'John Doe', '2024-01-15', '09:00', '2 hours', 'Victoria Island', 'Toyota Camry - Airport pickup', 'confirmed'),
('Partner Interview - Final Stage', 'interview', 'Mike Johnson', '2024-01-16', '10:00', '1 hour', 'Ajah Office', 'Final interview for partnership', 'pending'),
('Contract Signing & Vehicle Handover', 'contract', 'Sarah Williams', '2024-01-17', '12:00', '2 hours', 'Ajah Office', 'Ms Yetunde conducting, Mr Fatai witness', 'confirmed'),
('Fleet Maintenance Check', 'maintenance', 'Bridgeocean Fleet', '2024-01-18', '08:00', '4 hours', 'Yaba Workshop', 'Monthly vehicle inspection', 'pending');
