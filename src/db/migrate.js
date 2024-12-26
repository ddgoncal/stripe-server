import fs from 'fs';
import path from 'path';
import pool from './connection.js';

const migrationsDir = path.join(__dirname, 'migrations');

const runMigrations = async () => {
  try {
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      await pool.query(sql);
      console.log(`Applied migration: ${file}`);
    }
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    pool.end();
  }
};

runMigrations();