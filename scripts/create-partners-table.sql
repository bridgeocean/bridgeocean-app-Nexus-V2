-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  city TEXT,
  experience TEXT,
  availability TEXT,
  vehicle_make TEXT NOT NULL,
  vehicle_model TEXT NOT NULL,
  vehicle_year TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  additional_info TEXT,
  documents JSONB,
  status TEXT NOT NULL DEFAULT 'pending_review',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for partner documents
-- Note: This needs to be done in the Supabase dashboard or using the Supabase Management API
