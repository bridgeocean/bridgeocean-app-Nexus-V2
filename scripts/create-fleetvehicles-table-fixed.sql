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

-- Add RLS policy to allow read access
ALTER TABLE fleetvehicles ENABLE ROW LEVEL SECURITY;

-- Drop the policy if it exists (to avoid errors)
DO $$
BEGIN
  -- Check if policy exists and drop it if it does
  IF EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'fleetvehicles' AND policyname = 'Allow public read access to fleetvehicles'
  ) THEN
    DROP POLICY "Allow public read access to fleetvehicles" ON fleetvehicles;
  END IF;
END
$$;

-- Create policy to allow public read access
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
