alter table public.profiles
  add column if not exists avatar_url text,
  add column if not exists avatar_path text,
  add column if not exists phone text,
  add column if not exists updated_at timestamptz default now();

update public.profiles set updated_at = coalesce(updated_at, created_at, now()) where updated_at is null;
alter table public.profiles alter column updated_at set default now();
alter table public.profiles alter column updated_at set not null;

create or replace function public.set_profile_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles
for each row execute procedure public.set_profile_updated_at();

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Users can upload their own avatars" on storage.objects;
create policy "Users can upload their own avatars" on storage.objects
for insert to authenticated
with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid()::text));

drop policy if exists "Users can update their own avatars" on storage.objects;
create policy "Users can update their own avatars" on storage.objects
for update to authenticated
using (bucket_id = 'avatars' and owner_id = (select auth.uid()))
with check (bucket_id = 'avatars' and owner_id = (select auth.uid()));

drop policy if exists "Users can delete their own avatars" on storage.objects;
create policy "Users can delete their own avatars" on storage.objects
for delete to authenticated
using (bucket_id = 'avatars' and owner_id = (select auth.uid()));
