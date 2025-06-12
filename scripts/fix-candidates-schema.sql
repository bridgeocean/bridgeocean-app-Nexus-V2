-- Fix the candidates table by adding the missing last_contact column
ALTER TABLE candidates 
ADD COLUMN IF NOT EXISTS last_contact TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update existing rows to have a value (use created_at if available, otherwise current time)
UPDATE candidates 
SET last_contact = COALESCE(created_at, NOW()) 
WHERE last_contact IS NULL;

-- Verify the column was added successfully
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'candidates' 
ORDER BY ordinal_position;
