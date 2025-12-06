-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Project Requests Table
create table if not exists project_requests (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text,
  email text,
  phone text,
  organization_type text,
  project_field text,
  features text[],
  description text,
  platform text,
  budget_range text,
  deadline text,
  nda_required boolean default false,
  file_url text,
  status text default 'pending' -- pending, contacted, converted, rejected
);

-- Projects Table (Active Projects)
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id),
  name text not null,
  description text,
  status text default 'Discovery', -- Discovery, Design, Development, Testing, Deployed
  progress integer default 0,
  repo_url text,
  live_url text,
  next_milestone text,
  next_milestone_date date
);

-- Enable Row Level Security
alter table project_requests enable row level security;
alter table projects enable row level security;

-- Policies for Project Requests
-- Allow anyone to insert (public form)
create policy "Anyone can insert requests" on project_requests
  for insert with check (true);

-- Allow admins (service role) to view all
create policy "Service role can view all requests" on project_requests
  for select using (auth.role() = 'service_role');

-- Policies for Projects
-- Users can view their own projects
create policy "Users can view own projects" on projects
  for select using (auth.uid() = user_id);

-- Service role can do everything
create policy "Service role can manage all projects" on projects
  for all using (auth.role() = 'service_role');
