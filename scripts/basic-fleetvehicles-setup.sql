-- Create fleetvehicles table if it doesn't exist
CREATE TABLE IF NOT EXISTS fleetvehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  model VARCHAR(255),
  year INTEGER,
  vehicle_type VARCHAR(50),
  status VARCHAR(50) DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on the table
ALTER TABLE fleetvehicles ENABLE ROW LEVEL SECURITY;

-- Try to drop the policy first (ignore errors)
DROP POLICY IF EXISTS "Allow public read access to fleetvehicles" ON fleetvehicles;

-- Create policy to allow public read access (without IF NOT EXISTS)
CREATE POLICY "Allow public read access to fleetvehicles" 
  ON fleetvehicles FOR SELECT 
  USING (true);

-- Insert sample data if table is empty
INSERT INTO fleetvehicles (name, model, year, vehicle_type, status)
SELECT 'Toyota Camry', 'Camry', 2018, 'sedan', 'available'
WHERE NOT EXISTS (SELECT 1 FROM fleetvehicles WHERE model = 'Camry');

INSERT INTO fleetvehicles (name, model, year, vehicle_type, status)
SELECT 'GMC Terrain', 'Terrain', 2020, 'suv', 'available'
WHERE NOT EXISTS (SELECT 1 FROM fleetvehicles WHERE model = 'Terrain');

-- Create a function to add vehicles
CREATE OR REPLACE FUNCTION add_vehicle(
  vehicle_name VARCHAR,
  vehicle_model VARCHAR,
  vehicle_year INTEGER,
  vehicle_type VARCHAR,
  vehicle_status VARCHAR DEFAULT 'available'
) RETURNS UUID AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO fleetvehicles (name, model, year, vehicle_type, status)
  VALUES (vehicle_name, vehicle_model, vehicle_year, vehicle_type, vehicle_status)
  RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Example of how to add a new vehicle:
-- SELECT add_vehicle('Toyota Camry LE', 'Camry', 2019, 'sedan');
