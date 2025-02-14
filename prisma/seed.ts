import postgres from "postgres";
import "dotenv/config";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("Couldn't find db url");
}
const sql = postgres(dbUrl);

async function main() {
  await sql`
     create or replace function public.handle_new_user()
     returns trigger as $$
     begin
         -- Immediately log the new user
         raise notice 'New user created with ID: %, Email: %', new.id, new.email;

         begin
             -- Simple insert with minimal required fields
             insert into public.profiles (
                 id,
                 email,
                 email_confirmed
             )
             values (
                 new.id,
                 new.email,
                 false
             );
             
             raise notice 'Profile created successfully for user: %', new.id;
             return new;
             
         exception when others then
             -- Detailed error logging
             raise notice 'Profile creation failed for user %. Error: %',
                 new.id, SQLERRM;
             return new;
         end;
     end;
     $$ language plpgsql security definer;
     `;

  await sql`
     drop trigger if exists on_auth_user_created on auth.users;
  `;

  await sql`
     create trigger on_auth_user_created
         after insert on auth.users
         for each row execute procedure public.handle_new_user();
   `;

  await sql`
     create or replace function public.handle_user_delete()
     returns trigger as $$
     begin
       delete from auth.users where id = old.id;
       return old;
     end;
     $$ language plpgsql security definer;
   `;

  await sql`
     create or replace trigger on_profile_user_deleted
       after delete on public.profiles
       for each row execute procedure public.handle_user_delete()
   `;

  console.log(
    "Finished adding triggers and functions for profile handling."
  );
  process.exit();
}

await main();