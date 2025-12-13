-- 1. Enable RLS for project_requests if not already enabled
ALTER TABLE project_requests ENABLE ROW LEVEL SECURITY;

-- 2. Add Policy: Clients can view their own requests
DROP POLICY IF EXISTS "Clients can view own requests" ON project_requests;
CREATE POLICY "Clients can view own requests" 
ON project_requests FOR SELECT 
USING ( client_id = auth.uid() );

-- 3. DATA FIX: Link existing users to their requests based on email
-- This is crucial for the user who just converted their request
UPDATE project_requests
SET client_id = auth.users.id
FROM auth.users
WHERE 
  -- Match where the request email matches the user's real email stored in metadata
  project_requests.email = (auth.users.raw_user_meta_data->>'real_email')
  AND project_requests.client_id IS NULL;
