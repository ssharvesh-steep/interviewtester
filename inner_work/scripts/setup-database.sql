-- ============================================
-- HackerRank-Like Platform Database Schema
-- ============================================
-- This script sets up all required tables for the coding platform
-- Run this in your Supabase SQL Editor

-- ============================================
-- 1. PROBLEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS problems (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  description TEXT NOT NULL,
  input_format TEXT,
  output_format TEXT,
  constraints TEXT[],
  examples JSONB DEFAULT '[]'::jsonb,
  time_limit INTEGER DEFAULT 2000, -- milliseconds
  memory_limit INTEGER DEFAULT 256, -- MB
  created_by UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- ============================================
-- 2. TEST CASES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS test_cases (
  id SERIAL PRIMARY KEY,
  problem_id INTEGER REFERENCES problems(id) ON DELETE CASCADE,
  input TEXT NOT NULL,
  expected_output TEXT NOT NULL,
  is_public BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 3. CODE TEMPLATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS code_templates (
  id SERIAL PRIMARY KEY,
  problem_id INTEGER REFERENCES problems(id) ON DELETE CASCADE,
  language TEXT NOT NULL CHECK (language IN ('c', 'cpp', 'java', 'python', 'javascript', 'typescript')),
  template_code TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(problem_id, language)
);

-- ============================================
-- 4. SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  username TEXT NOT NULL,
  problem_id INTEGER REFERENCES problems(id),
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  verdict TEXT NOT NULL CHECK (verdict IN ('Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compilation Error', 'Memory Limit Exceeded')),
  test_cases_passed INTEGER DEFAULT 0,
  total_test_cases INTEGER DEFAULT 0,
  execution_time INTEGER, -- milliseconds
  memory_used INTEGER, -- KB
  error_message TEXT,
  submitted_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 5. USER STATISTICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  problems_solved INTEGER DEFAULT 0,
  total_submissions INTEGER DEFAULT 0,
  accepted_submissions INTEGER DEFAULT 0,
  languages_used JSONB DEFAULT '{}'::jsonb,
  easy_solved INTEGER DEFAULT 0,
  medium_solved INTEGER DEFAULT 0,
  hard_solved INTEGER DEFAULT 0,
  ranking INTEGER,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 6. INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_problems_slug ON problems(slug);
CREATE INDEX IF NOT EXISTS idx_test_cases_problem_id ON test_cases(problem_id);
CREATE INDEX IF NOT EXISTS idx_submissions_username ON submissions(username);
CREATE INDEX IF NOT EXISTS idx_submissions_problem_id ON submissions(problem_id);
CREATE INDEX IF NOT EXISTS idx_submissions_verdict ON submissions(verdict);
CREATE INDEX IF NOT EXISTS idx_user_stats_username ON user_stats(username);

-- ============================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Problems: Everyone can read active problems
CREATE POLICY "Anyone can view active problems" ON problems
  FOR SELECT USING (is_active = true);

-- Problems: Only admins can insert/update/delete
CREATE POLICY "Admins can manage problems" ON problems
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.username = current_user 
      AND admins.role IN ('admin', 'super_admin')
    )
  );

-- Test Cases: Users can only see public test cases
CREATE POLICY "Users can view public test cases" ON test_cases
  FOR SELECT USING (is_public = true);

-- Test Cases: Admins can see all test cases
CREATE POLICY "Admins can view all test cases" ON test_cases
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.username = current_user 
      AND admins.role IN ('admin', 'super_admin')
    )
  );

-- Test Cases: Admins can manage test cases
CREATE POLICY "Admins can manage test cases" ON test_cases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.username = current_user 
      AND admins.role IN ('admin', 'super_admin')
    )
  );

-- Code Templates: Everyone can read templates
CREATE POLICY "Anyone can view code templates" ON code_templates
  FOR SELECT USING (true);

-- Code Templates: Admins can manage templates
CREATE POLICY "Admins can manage code templates" ON code_templates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.username = current_user 
      AND admins.role IN ('admin', 'super_admin')
    )
  );

-- Submissions: Users can view their own submissions
CREATE POLICY "Users can view own submissions" ON submissions
  FOR SELECT USING (username = current_user);

-- Submissions: Users can insert their own submissions
CREATE POLICY "Users can create submissions" ON submissions
  FOR INSERT WITH CHECK (username = current_user);

-- Submissions: Admins can view all submissions
CREATE POLICY "Admins can view all submissions" ON submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.username = current_user 
      AND admins.role IN ('admin', 'super_admin')
    )
  );

-- User Stats: Users can view their own stats
CREATE POLICY "Users can view own stats" ON user_stats
  FOR SELECT USING (username = current_user);

-- User Stats: Users can update their own stats
CREATE POLICY "Users can update own stats" ON user_stats
  FOR UPDATE USING (username = current_user);

-- User Stats: Users can insert their own stats
CREATE POLICY "Users can create own stats" ON user_stats
  FOR INSERT WITH CHECK (username = current_user);

-- User Stats: Everyone can view all stats (for leaderboard)
CREATE POLICY "Anyone can view all user stats" ON user_stats
  FOR SELECT USING (true);

-- ============================================
-- 8. FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for problems table
DROP TRIGGER IF EXISTS update_problems_updated_at ON problems;
CREATE TRIGGER update_problems_updated_at
    BEFORE UPDATE ON problems
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_stats table
DROP TRIGGER IF EXISTS update_user_stats_updated_at ON user_stats;
CREATE TRIGGER update_user_stats_updated_at
    BEFORE UPDATE ON user_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE 'Database schema created successfully!';
  RAISE NOTICE 'Tables created: problems, test_cases, code_templates, submissions, user_stats';
  RAISE NOTICE 'Next step: Run seed-problems.sql to add sample problems';
END $$;
