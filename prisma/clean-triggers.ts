import postgres from "postgres";
import "dotenv/config";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("Couldn't find db url");
}
const sql = postgres(dbUrl);

async function main() {
  // Drop triggers first
  await sql`
    drop trigger if exists on_auth_user_created on auth.users;
  `;

  await sql`
    drop trigger if exists on_profile_user_deleted on public.profiles;
  `;

  // Then drop the functions
  await sql`
    drop function if exists public.handle_new_user();
  `;

  await sql`
    drop function if exists public.handle_user_delete();
  `;

  console.log("Successfully removed all triggers and functions.");
  process.exit();
}

await main(); 