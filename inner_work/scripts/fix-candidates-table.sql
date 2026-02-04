-- ============================================
-- Fix Candidates Table - Add Missing Columns
-- ============================================
-- This script adds missing columns to the existing candidates table

-- Add missing columns to candidates table if they don't exist
DO $$ 
BEGIN
    -- Add full_name column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'candidates' AND column_name = 'full_name'
    ) THEN
        ALTER TABLE candidates ADD COLUMN full_name TEXT;
        RAISE NOTICE 'Added full_name column';
    END IF;

    -- Add email column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'candidates' AND column_name = 'email'
    ) THEN
        ALTER TABLE candidates ADD COLUMN email TEXT;
        RAISE NOTICE 'Added email column';
    END IF;

    -- Add phone column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'candidates' AND column_name = 'phone'
    ) THEN
        ALTER TABLE candidates ADD COLUMN phone TEXT;
        RAISE NOTICE 'Added phone column';
    END IF;

    -- Add bio column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'candidates' AND column_name = 'bio'
    ) THEN
        ALTER TABLE candidates ADD COLUMN bio TEXT;
        RAISE NOTICE 'Added bio column';
    END IF;

    -- Add banned column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'candidates' AND column_name = 'banned'
    ) THEN
        ALTER TABLE candidates ADD COLUMN banned BOOLEAN DEFAULT false;
        RAISE NOTICE 'Added banned column';
    END IF;

    -- Add updated_at column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'candidates' AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE candidates ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();
        RAISE NOTICE 'Added updated_at column';
    END IF;
END $$;

-- Update existing Test Candidate with profile data
UPDATE candidates 
SET 
    full_name = 'John Doe',
    email = 'john.doe@example.com',
    phone = '+1 234 567 8900',
    bio = 'Experienced software developer with a passion for problem-solving and clean code.',
    updated_at = NOW()
WHERE username = 'Test Candidate';

-- Create admins table if it doesn't exist
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'super_admin')) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_candidates_username ON candidates(username);
CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);

-- Enable RLS if not already enabled
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Anyone can view candidates" ON candidates;
DROP POLICY IF EXISTS "Anyone can update candidates" ON candidates;
DROP POLICY IF EXISTS "Anyone can insert candidates" ON candidates;
DROP POLICY IF EXISTS "Anyone can view admins" ON admins;

-- Create RLS Policies
CREATE POLICY "Anyone can view candidates" ON candidates FOR SELECT USING (true);
CREATE POLICY "Anyone can update candidates" ON candidates FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert candidates" ON candidates FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view admins" ON admins FOR SELECT USING (true);

-- Create triggers if they don't exist
DROP TRIGGER IF EXISTS update_candidates_updated_at ON candidates;
CREATE TRIGGER update_candidates_updated_at
    BEFORE UPDATE ON candidates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admins_updated_at ON admins;
CREATE TRIGGER update_admins_updated_at
    BEFORE UPDATE ON admins
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert admin if doesn't exist
INSERT INTO admins (username, password, role)
VALUES ('admin', 'admin123', 'super_admin')
ON CONFLICT (username) DO NOTHING;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Candidates table updated successfully!';
  RAISE NOTICE '✅ Missing columns added: full_name, email, phone, bio';
  RAISE NOTICE '✅ Test Candidate profile updated';
  RAISE NOTICE '✅ Admin account created (username: admin, password: admin123)';
END $$;
