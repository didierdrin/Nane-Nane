-- Create admin_users table for managing admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  phone TEXT,
  is_active_phone BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the super admin (nsedidier@gmail.com)
INSERT INTO admin_users (id, username, email, role, status, phone, is_active_phone)
VALUES (
  'super-admin-1',
  'nsedidier',
  'nsedidier@gmail.com',
  'super_admin',
  'active',
  '+255755823336',
  TRUE
) ON CONFLICT (email) DO UPDATE SET
  role = 'super_admin',
  status = 'active',
  is_active_phone = TRUE;

-- Add some sample pending users
INSERT INTO admin_users (id, username, email, role, status, phone, is_active_phone)
VALUES 
  ('pending-1', 'john_doe', 'john@example.com', 'admin', 'pending', '+255700000001', FALSE),
  ('pending-2', 'jane_smith', 'jane@example.com', 'admin', 'pending', '+255700000002', FALSE)
ON CONFLICT (email) DO NOTHING;

-- Enable RLS (Row Level Security)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read admin_users
CREATE POLICY "Allow authenticated users to read admin_users" ON admin_users
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy to allow super_admins to manage all users
CREATE POLICY "Allow super_admins to manage admin_users" ON admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE email = auth.jwt() ->> 'email' 
      AND role = 'super_admin' 
      AND status = 'active'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_admin_users_updated_at 
  BEFORE UPDATE ON admin_users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();