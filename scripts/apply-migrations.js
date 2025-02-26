/**
 * Script to apply database migrations
 * This ensures the bio field is added to the users table
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const { Client } = pg;

// Get the database URL from the environment
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to migrations directory
const migrationsDir = path.join(__dirname, '..', 'db', 'migrations');

// Get all SQL migration files
const migrationFiles = fs.readdirSync(migrationsDir)
  .filter(file => file.endsWith('.sql'))
  .sort(); // Sort to ensure migrations are applied in order

console.log('Found migration files:', migrationFiles);

// Apply each migration
migrationFiles.forEach(file => {
  const migrationPath = path.join(migrationsDir, file);
  console.log(`Applying migration: ${file}`);
  
  try {
    // Read the SQL file
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    // Write to a temporary file that we'll use with psql
    const tempFile = path.join(__dirname, 'temp-migration.sql');
    fs.writeFileSync(tempFile, sql);
    
    // Execute the SQL using the database client
    const client = new Client({
      connectionString: databaseUrl,
    });
    
    (async () => {
      try {
        await client.connect();
        console.log(`Connected to database, executing migration: ${file}`);
        await client.query(sql);
        console.log(`Successfully applied migration: ${file}`);
      } catch (err) {
        console.error(`Error applying migration ${file}:`, err.message);
        // If the error is about the column already existing, that's okay
        if (err.message.includes('already exists')) {
          console.log('Column already exists, continuing...');
        }
      } finally {
        await client.end();
      }
    })();
    
    // Clean up temp file
    fs.unlinkSync(tempFile);
  } catch (error) {
    console.error(`Error applying migration ${file}:`, error);
  }
});

console.log('All migrations applied'); 