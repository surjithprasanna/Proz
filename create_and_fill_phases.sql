-- 0. Ensure UUID extension exists
create extension if not exists "uuid-ossp";

-- 1. Create Profiles Table (if missing)
create table if not exists profiles (
  id uuid references auth.users(id) primary key,
  role text default 'client',
  full_name text,
  contact_email text,
  contact_phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Projects Table (if missing)
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id),
  name text not null,
  description text,
  status text default 'Discovery',
  progress integer default 0
);

-- 2.1 Ensure client_id column exists in projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS client_id uuid references profiles(id);

-- 3. Create Project Phases Table (if missing)
create table if not exists project_phases (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  name text not null,
  description text,
  status text default 'pending',
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable RLS
alter table profiles enable row level security;
alter table projects enable row level security;
alter table project_phases enable row level security;

-- 5. Add Policies
-- Profiles
drop policy if exists "Public profiles are viewable by everyone" on profiles;
create policy "Public profiles are viewable by everyone" on profiles for select using (true);

-- Phases
drop policy if exists "Admins can manage phases" on project_phases;
create policy "Admins can manage phases" on project_phases for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

drop policy if exists "Clients can view phases of their projects" on project_phases;
create policy "Clients can view phases of their projects" on project_phases for select using (
  exists (select 1 from projects where id = project_phases.project_id and client_id = auth.uid())
);

-- 6. Backfill Data (Insert default phases for existing projects)
INSERT INTO project_phases (project_id, name, description, status, order_index)
SELECT 
    p.id,
    t.name,
    t.description,
    t.status,
    t.order_index
FROM projects p
CROSS JOIN (
    SELECT 'System Architecture Analysis' as name, 'Analyzing requirements and designing the core system architecture.' as description, 'processing' as status, 0 as order_index
    UNION ALL SELECT 'UI/UX Design & Prototyping', 'Creating high-fidelity mockups and interactive prototypes.', 'pending', 1
    UNION ALL SELECT 'Core Development', 'Implementing backend logic, database structure, and frontend interfaces.', 'pending', 2
    UNION ALL SELECT 'Quality Assurance & Testing', 'Rigorous testing of all features, security audits, and performance tuning.', 'pending', 3
    UNION ALL SELECT 'Production Deployment', 'Deploying to live servers and final handover.', 'pending', 4
) t
WHERE NOT EXISTS (
    SELECT 1 FROM project_phases pp WHERE pp.project_id = p.id
);
