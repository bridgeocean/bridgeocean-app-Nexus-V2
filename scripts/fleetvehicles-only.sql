-- Create the fleetvehicles table if it doesn't exist
CREATE TABLE IF NOT EXISTS fleetvehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  vehicle_type TEXT,
  status TEXT DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE fleetvehicles ENABLE ROW LEVEL SECURITY;

-- Drop the policy if it exists (to avoid errors)
DO $$
BEGIN
  BEGIN
    DROP POLICY IF EXISTS "fleetvehicles_read_policy" ON fleetvehicles;
  EXCEPTION
    WHEN undefined_object THEN
      -- Policy doesn't exist, so nothing to drop
  END;
END $$;

-- Create a policy for public read access with a unique name
CREATE POLICY "fleetvehicles_read_policy" ON fleetvehicles
  FOR SELECT
  USING (true);

-- Create a function to add vehicles
CREATE OR REPLACE FUNCTION add_fleet_vehicle(
  vehicle_name TEXT,
  vehicle_model TEXT,
  vehicle_year INTEGER,
  vehicle_type TEXT,
  vehicle_status TEXT DEFAULT 'available'
) RETURNS UUID AS $$
DECLARE
  new_vehicle_id UUID;
BEGIN
  INSERT INTO fleetvehicles (name, model, year, vehicle_type, status)
  VALUES (vehicle_name, vehicle_model, vehicle_year, vehicle_type, vehicle_status)
  RETURNING id INTO new_vehicle_id;
  
  RETURN new_vehicle_id;
END;
$$ LANGUAGE plpgsql;

-- Add sample vehicles if they don't exist
DO $$
DECLARE
  camry_count INTEGER;
  gmc_count INTEGER;
BEGIN
  -- Check if Toyota Camry exists
  SELECT COUNT(*) INTO camry_count FROM fleetvehicles WHERE model ILIKE 'Camry';
  
  -- Add Toyota Camry if it doesn't exist
  IF camry_count = 0 THEN
    PERFORM add_fleet_vehicle('Toyota Camry LE', 'Camry', 2020, 'sedan');
  END IF;
  
  -- Check if GMC Terrain exists
  SELECT COUNT(*) INTO gmc_count FROM fleetvehicles WHERE model ILIKE 'Terrain';
  
  -- Add GMC Terrain if it doesn't exist
  IF gmc_count = 0 THEN
    PERFORM add_fleet_vehicle('GMC Terrain SLT', 'Terrain', 2021, 'suv');
  END IF;
END $$;

-- Example of how to add more vehicles:
-- SELECT add_fleet_vehicle('Honda Accord', 'Accord', 2020, 'sedan');
-- SELECT add_fleet_vehicle('Toyota Highlander', 'Highlander', 2022, 'suv');
