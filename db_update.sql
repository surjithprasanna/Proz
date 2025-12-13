-- Run these commands in your Supabase SQL Editor to ensure your database is up to date

-- 1. Add missing columns to project_requests table
ALTER TABLE project_requests ADD COLUMN IF NOT EXISTS proposal_status text DEFAULT 'none';
ALTER TABLE project_requests ADD COLUMN IF NOT EXISTS proposal_price text;
ALTER TABLE project_requests ADD COLUMN IF NOT EXISTS proposal_plan text;
ALTER TABLE project_requests ADD COLUMN IF NOT EXISTS access_code text;
ALTER TABLE project_requests ADD COLUMN IF NOT EXISTS proposal_docs jsonb;
ALTER TABLE project_requests ADD COLUMN IF NOT EXISTS client_id uuid REFERENCES profiles(id);

-- 2. Ensure Storage Bucket exists for files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-assets', 'project-assets', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Ensure Storage Policies exist (Safe block)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Public Uploads' 
        AND tablename = 'objects' 
        AND schemaname = 'storage'
    ) THEN
        CREATE POLICY "Public Uploads" 
        ON storage.objects FOR INSERT 
        WITH CHECK ( bucket_id = 'project-assets' );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Public View' 
        AND tablename = 'objects' 
        AND schemaname = 'storage'
    ) THEN
        CREATE POLICY "Public View" 
        ON storage.objects FOR SELECT 
        USING ( bucket_id = 'project-assets' );
    END IF;
END
$$;
