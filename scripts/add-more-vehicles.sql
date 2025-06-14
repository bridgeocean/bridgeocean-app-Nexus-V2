-- Example SQL to add more vehicles to the fleet
-- You can run this script whenever you want to add new vehicles

-- Add a Toyota Camry
SELECT add_vehicle('Toyota Camry LE', 'Camry', 2019, 'sedan');

-- Add a GMC Terrain
SELECT add_vehicle('GMC Terrain SLT', 'Terrain', 2021, 'suv');

-- Add other vehicle types
SELECT add_vehicle('Honda Accord', 'Accord', 2020, 'sedan');
