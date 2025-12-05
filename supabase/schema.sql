-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null,
  full_name text,
  role text default 'client' check (role in ('client', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PROJECT REQUESTS TABLE
create table public.project_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id),
  field text not null,
  organization_type text,
  project_description text,
  budget_range text,
  deadline date,
  platform text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'in_progress', 'completed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MESSAGES TABLE
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  request_id uuid references public.project_requests(id),
  sender_id uuid references public.users(id),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ATTACHMENTS TABLE
create table public.attachments (
  id uuid default uuid_generate_v4() primary key,
  request_id uuid references public.project_requests(id),
  file_url text not null,
  file_name text not null,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PAYMENTS TABLE
create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  request_id uuid references public.project_requests(id),
  amount integer not null,
  currency text default 'usd',
  status text default 'pending',
  stripe_payment_intent_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ROW LEVEL SECURITY (RLS)
alter table public.users enable row level security;
alter table public.project_requests enable row level security;
alter table public.messages enable row level security;
alter table public.attachments enable row level security;
alter table public.payments enable row level security;

-- POLICIES

-- Users can view their own profile
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

-- Users can view their own requests
create policy "Users can view own requests" on public.project_requests
  for select using (auth.uid() = user_id);

-- Admins can view all requests (assuming admin role check logic in app or separate admin table)
-- For simplicity, allowing authenticated users to insert requests
create policy "Users can insert requests" on public.project_requests
  for insert with check (auth.uid() = user_id);

-- Messages: Users can view messages for their requests
create policy "Users can view messages" on public.messages
  for select using (
    exists (
      select 1 from public.project_requests
      where public.project_requests.id = messages.request_id
      and public.project_requests.user_id = auth.uid()
    )
  );
