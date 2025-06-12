-- Simple script to just add the missing last_contact column
ALTER TABLE candidates 
ADD COLUMN IF NOT EXISTS last_contact TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update existing rows to have a value
UPDATE candidates 
SET last_contact = COALESCE(created_at, NOW()) 
WHERE last_contact IS NULL;

-- Show the result
SELECT 'Column added successfully!' as status;
