-- Fix for "new row for relation project_requests violates check constraint"
-- This will update the allowed values for the status column

ALTER TABLE project_requests DROP CONSTRAINT IF EXISTS project_requests_status_check;

ALTER TABLE project_requests 
ADD CONSTRAINT project_requests_status_check 
CHECK (status IN ('pending', 'contacted', 'converted', 'rejected', 'in_progress', 'completed'));
