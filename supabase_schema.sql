-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles Table (Role Management)
create table if not exists profiles (
  id uuid references auth.users(id) primary key,
  role text default 'client', -- 'admin' or 'client'
  full_name text,
  contact_email text,
  contact_phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Project Requests Table
create table if not exists project_requests (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text,
  email text, -- Added missing field
  phone text, -- Added missing field
  organization_type text,
  project_field text,
  profession text, -- New
  college text, -- New (for Students)
  degree text, -- New (for Students)
  project_goal text, -- New
  features text[],
  description text,
  platform text,
  budget_range text,
  deadline text,
  nda_required boolean default false,
  file_url text, -- Legacy
  files jsonb, -- New: Array of { name, url, type }
  status text default 'pending', -- pending, contacted, converted, rejected
  
  -- Proposal Fields
  proposal_status text default 'none', -- none, quoted, accepted, modification_requested, rejected
  proposal_price text,
  proposal_docs jsonb, -- Array of { name, url, type }
  client_id uuid references profiles(id) -- Linked user account if created
);

-- Projects Table (Active Projects)
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id), -- Creator/Admin
  client_id uuid references profiles(id), -- Assigned Client
  name text not null,
  description text,
  status text default 'Discovery', -- Discovery, Design, Development, Testing, Deployed
  progress integer default 0,
  repo_url text,
  live_url text,
  next_milestone text,
  next_milestone_date date,
  price text, -- e.g., "$5,000"
  pricing_plan text -- e.g., "Pro Scale"
);

-- Project Phases Table (Dynamic Progress Tracking)
create table if not exists project_phases (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  name text not null, -- e.g., "System Architecture Analysis"
  description text, -- e.g., "AI is optimizing database schema..."
  status text default 'pending', -- pending, processing, completed
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table project_requests enable row level security;
alter table projects enable row level security;
alter table profiles enable row level security;
alter table project_phases enable row level security;

-- Policies for Project Requests
create policy "Anyone can insert requests" on project_requests for insert with check (true);
create policy "Service role can view all requests" on project_requests for select using (auth.role() = 'service_role');

-- Policies for Profiles
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Policies for Projects
create policy "Admins can do everything on projects" on projects for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Clients can view assigned projects" on projects for select using (
  client_id = auth.uid()
);

-- Policies for Project Phases
create policy "Admins can manage phases" on project_phases for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Clients can view phases of their projects" on project_phases for select using (
  exists (select 1 from projects where id = project_phases.project_id and client_id = auth.uid())
);

-- STORAGE BUCKET SETUP (Run this manually in SQL Editor)
-- 1. Create Bucket
insert into storage.buckets (id, name, public) 
values ('project-assets', 'project-assets', true)
on conflict (id) do nothing;

-- 2. Policy: Anyone can upload (for Request Form)
create policy "Public Uploads" 
on storage.objects for insert 
with check ( bucket_id = 'project-assets' );

-- 3. Policy: Anyone can view (for Admin/User Dashboard)
create policy "Public View" 
on storage.objects for select 
using ( bucket_id = 'project-assets' );
