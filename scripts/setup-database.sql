-- Create users table for authentication and user management
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  position VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create charter bookings table
CREATE TABLE IF NOT EXISTS charter_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  pickup_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER NOT NULL,
  vehicle VARCHAR(255) NOT NULL,
  passengers INTEGER NOT NULL,
  special_requests TEXT,
  total_price DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create fleet vehicles table
CREATE TABLE IF NOT EXISTS fleet_vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  year VARCHAR(4) NOT NULL,
  passengers INTEGER NOT NULL,
  price_per_hour DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'booked', 'maintenance')),
  features TEXT[] DEFAULT '{}',
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create partner registrations table
CREATE TABLE IF NOT EXISTS partner_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  company VARCHAR(255) NOT NULL,
  vehicle_make VARCHAR(100) NOT NULL,
  vehicle_model VARCHAR(100) NOT NULL,
  vehicle_year VARCHAR(4) NOT NULL,
  vehicle_color VARCHAR(50) NOT NULL,
  license_plate VARCHAR(20) NOT NULL,
  identification_type VARCHAR(50) NOT NULL,
  identification_number VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create driver candidates table
CREATE TABLE IF NOT EXISTS driver_candidates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  stage VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'hired', 'rejected')),
  last_contact TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user
INSERT INTO users (email, name, company, position, role, status) 
VALUES ('bridgeocean@cyberservices.com', 'BridgeOcean Admin', 'BridgeOcean', 'Administrator', 'admin', 'approved')
ON CONFLICT (email) DO NOTHING;

-- Insert sample fleet vehicles
INSERT INTO fleet_vehicles (name, category, year, passengers, price_per_hour, features, description) VALUES
('Toyota Camry (2006)', 'Sedan', '2006', 4, 10000, '{"AC", "GPS", "Bluetooth"}', 'Reliable sedan for city trips'),
('GMC Terrain (2011)', 'SUV', '2011', 7, 20000, '{"AC", "GPS", "Entertainment System", "Spacious"}', 'Comfortable SUV for family trips')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_charter_bookings_date ON charter_bookings(date);
CREATE INDEX IF NOT EXISTS idx_fleet_vehicles_status ON fleet_vehicles(status);
CREATE INDEX IF NOT EXISTS idx_partner_registrations_status ON partner_registrations(status);
CREATE INDEX IF NOT EXISTS idx_driver_candidates_status ON driver_candidates(status);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE charter_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE fleet_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_candidates ENABLE ROW LEVEL SECURITY;

-- Create policies for Row Level Security
-- Users can read their own data, admins can read all
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid()::text = id OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::text AND role = 'admin'));
CREATE POLICY "Admins can manage users" ON users FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::text AND role = 'admin'));

-- Charter bookings - users can create, admins can manage
CREATE POLICY "Anyone can create bookings" ON charter_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all bookings" ON charter_bookings FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::text AND role = 'admin'));
CREATE POLICY "Admins can manage bookings" ON charter_bookings FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::text AND role = 'admin'));

-- Fleet vehicles - public read, admin write
CREATE POLICY "Anyone can view fleet" ON fleet_vehicles FOR SELECT USING (true);
CREATE POLICY "Admins can manage fleet" ON fleet_vehicles FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::text AND role = 'admin'));

-- Partner registrations - anyone can create, admins can manage
CREATE POLICY "Anyone can register as partner" ON partner_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view partner registrations" ON partner_registrations FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::text AND role = 'admin'));
CREATE POLICY "Admins can manage partner registrations" ON partner_registrations FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::text AND role = 'admin'));

-- Driver candidates - admins only
CREATE POLICY "Admins can manage driver candidates" ON driver_candidates FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::text AND role = 'admin'));
