-- ============================================
-- Create New Candidate User (Fixed)
-- ============================================

-- Step 1: Add UNIQUE constraint to username if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'candidates_username_key'
    ) THEN
        ALTER TABLE candidates ADD CONSTRAINT candidates_username_key UNIQUE (username);
        RAISE NOTICE 'Added UNIQUE constraint to username column';
    END IF;
END $$;

-- Step 2: Insert a new candidate (simple version without ON CONFLICT)
-- Change the values below to create your user
INSERT INTO candidates (username, password, full_name, email, phone, bio)
VALUES (
  'new_candidate',           -- Change this username
  'password123',             -- Change this password
  'Jane Smith',              -- Change this full name
  'jane.smith@example.com',  -- Change this email
  '+1 555 123 4567',         -- Change this phone
  'Software engineer with 5 years of experience in web development.'  -- Change this bio
);

-- Step 3: Verify the user was created
SELECT username, full_name, email, created_at 
FROM candidates 
ORDER BY created_at DESC
LIMIT 5;
