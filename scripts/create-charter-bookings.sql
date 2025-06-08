-- Create charter_bookings table
CREATE TABLE IF NOT EXISTS charter_bookings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  pickup_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER NOT NULL,
  vehicle VARCHAR(100) NOT NULL,
  vehicle_name VARCHAR(255) NOT NULL,
  passengers INTEGER NOT NULL,
  special_requests TEXT,
  total_price INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_charter_bookings_email ON charter_bookings(email);
CREATE INDEX IF NOT EXISTS idx_charter_bookings_date ON charter_bookings(date);
CREATE INDEX IF NOT EXISTS idx_charter_bookings_status ON charter_bookings(status);
