-- Add new columns to project_phases table
ALTER TABLE project_phases 
ADD COLUMN IF NOT EXISTS estimated_time text,
ADD COLUMN IF NOT EXISTS start_date timestamp with time zone;

-- Update existing phases with default values if needed (optional)
-- UPDATE project_phases SET estimated_time = '2 days' WHERE estimated_time IS NULL;
