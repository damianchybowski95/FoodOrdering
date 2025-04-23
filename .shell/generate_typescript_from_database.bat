npm i supabase@">=1.8.1" --save-dev
npx supabase login
npx supabase init
npx supabase gen types typescript --project-id jplpdluceykajalvmjki --schema public > src\database.types.ts

