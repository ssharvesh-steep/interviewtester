# Database Setup Guide

## Issue Found
The application is trying to access a `candidates` table that doesn't exist in your Supabase database.

## What's Missing
- **candidates** table (for storing user profiles)
- **admins** table (for admin authentication)

## Solution: Run the SQL Migration

### Step 1: Access Supabase SQL Editor
1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Navigate to **SQL Editor** in the left sidebar

### Step 2: Run the Migration Script
1. Open the file: `scripts/add-candidates-table.sql`
2. Copy the entire contents
3. Paste into the Supabase SQL Editor
4. Click **Run** (or press Cmd/Ctrl + Enter)

### Step 3: Verify the Tables
After running the script, you should see:
- ✅ `candidates` table created
- ✅ `admins` table created
- ✅ Default test data inserted

### Default Test Accounts Created
**Test Candidate:**
- Username: `Test Candidate`
- Password: `test123`

**Admin:**
- Username: `admin`
- Password: `admin123`

## What This Fixes
✅ Profile loading error  
✅ "Initialize Assessment" button will work  
✅ Admin dashboard will function  
✅ Candidate management features enabled  

## Database Schema Overview

### Candidates Table
```sql
- id (UUID)
- username (TEXT, unique)
- password (TEXT)
- full_name (TEXT)
- email (TEXT)
- phone (TEXT)
- bio (TEXT)
- banned (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Admins Table
```sql
- id (UUID)
- username (TEXT, unique)
- password (TEXT)
- role (TEXT: 'admin' or 'super_admin')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## After Running the Migration
1. Refresh your browser at http://localhost:5173
2. The profile section should now load without errors
3. You can edit the profile fields
4. The "Initialize Assessment" button should work

---

**Need help?** Check the browser console for any remaining errors.
