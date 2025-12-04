-- Drop existing policies that cause infinite recursion
DROP POLICY IF EXISTS "Allow authenticated users to read admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow super_admins to manage admin_users" ON admin_users;

-- Disable RLS temporarily to fix the issue
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Or create simple policies without recursion
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Simple policy: allow all authenticated users to read
CREATE POLICY "authenticated_read_admin_users" ON admin_users
  FOR SELECT USING (auth.role() = 'authenticated');

-- Simple policy: allow all authenticated users to update/delete
CREATE POLICY "authenticated_manage_admin_users" ON admin_users
  FOR ALL USING (auth.role() = 'authenticated');