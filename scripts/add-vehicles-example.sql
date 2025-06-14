-- Examples of adding vehicles to your fleet
-- Run these commands one by one or all at once

-- Add a Toyota Camry
SELECT add_vehicle('Toyota Camry LE', 'Camry', 2019, 'sedan');

-- Add a GMC Terrain
SELECT add_vehicle('GMC Terrain SLT', 'Terrain', 2021, 'suv');

-- Add a Honda Accord
SELECT add_vehicle('Honda Accord EX', 'Accord', 2020, 'sedan');

-- Add a Toyota Highlander
SELECT add_vehicle('Toyota Highlander XLE', 'Highlander', 2022, 'suv');

-- View all vehicles in your fleet
SELECT * FROM fleetvehicles;
