-- ============================================
-- Add Candidates Table and Admins Table
-- ============================================
-- This script adds the missing candidates and admins tables
-- Run this in your Supabase SQL Editor

-- ============================================
-- 1. CANDIDATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  bio TEXT,
  banned BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 2. ADMINS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'super_admin')) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 3. INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_candidates_username ON candidates(username);
CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);

-- ============================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on candidates table
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

-- Candidates can view their own profile
CREATE POLICY "Candidates can view own profile" ON candidates
  FOR SELECT USING (username = current_user);

-- Candidates can update their own profile
CREATE POLICY "Candidates can update own profile" ON candidates
  FOR UPDATE USING (username = current_user);

-- Admins can view all candidates
CREATE POLICY "Admins can view all candidates" ON candidates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.username = current_user 
      AND admins.role IN ('admin', 'super_admin')
    )
  );

-- Admins can manage candidates
CREATE POLICY "Admins can manage candidates" ON candidates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.username = current_user 
      AND admins.role IN ('admin', 'super_admin')
    )
  );

-- Enable RLS on admins table
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Admins can view their own profile
CREATE POLICY "Admins can view own profile" ON admins
  FOR SELECT USING (username = current_user);

-- Super admins can manage all admins
CREATE POLICY "Super admins can manage admins" ON admins
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.username = current_user 
      AND admins.role = 'super_admin'
    )
  );

-- ============================================
-- 5. TRIGGERS FOR UPDATED_AT
-- ============================================

-- Trigger for candidates table
DROP TRIGGER IF EXISTS update_candidates_updated_at ON candidates;
CREATE TRIGGER update_candidates_updated_at
    BEFORE UPDATE ON candidates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for admins table
DROP TRIGGER IF EXISTS update_admins_updated_at ON admins;
CREATE TRIGGER update_admins_updated_at
    BEFORE UPDATE ON admins
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. INSERT DEFAULT DATA
-- ============================================

-- Insert a test candidate (password: test123)
INSERT INTO candidates (username, password, full_name, email, phone, bio)
VALUES (
  'Test Candidate',
  'test123',
  'John Doe',
  'john.doe@example.com',
  '+1 234 567 8900',
  'Experienced software developer with a passion for problem-solving and clean code.'
)
ON CONFLICT (username) DO NOTHING;

-- Insert a super admin (username: admin, password: admin123)
INSERT INTO admins (username, password, role)
VALUES ('admin', 'admin123', 'super_admin')
ON CONFLICT (username) DO NOTHING;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE 'Candidates and Admins tables created successfully!';
  RAISE NOTICE 'Default test candidate: username="Test Candidate", password="test123"';
  RAISE NOTICE 'Default admin: username="admin", password="admin123"';
END $$;
