-- Fix the duplicate key error by using ON CONFLICT
INSERT INTO admin_users (id, username, email, role, status, phone, is_active_phone)
VALUES ('super-admin-1', 'nsedidier', 'nsedidier@gmail.com', 'super_admin', 'active', '+255755823336', TRUE)
ON CONFLICT (id) DO UPDATE SET
  role = 'super_admin',
  status = 'active',
  phone = '+255755823336',
  is_active_phone = TRUE;