create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'user' check (role in ('user','admin')),
  balance numeric(12,2) not null default 0,
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  category text not null,
  price numeric(12,2) not null default 0,
  image_url text,
  active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete set null,
  product_id uuid references products(id) on delete set null,
  quantity integer not null default 1,
  total numeric(12,2) not null default 0,
  status text not null default 'pending',
  notes text,
  created_at timestamptz default now()
);

create table if not exists wallet_transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  amount numeric(12,2) not null,
  type text not null check (type in ('deposit','purchase','refund','adjustment')),
  status text not null default 'completed',
  description text,
  created_at timestamptz default now()
);

create table if not exists deposits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  amount numeric(12,2) not null,
  method text,
  reference text,
  status text not null default 'pending',
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table wallet_transactions enable row level security;
alter table deposits enable row level security;

create policy "Public active products"
on products for select
using (active = true);

create policy "Users can view own profile"
on profiles for select
using (auth.uid() = id);

create policy "Users can view own orders"
on orders for select
using (auth.uid() = user_id);

create policy "Users can view own transactions"
on wallet_transactions for select
using (auth.uid() = user_id);

create policy "Users can view own deposits"
on deposits for select
using (auth.uid() = user_id);
