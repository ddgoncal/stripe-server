import pg from 'pg';
import config from './config.js';

const { Pool } = pg;
const pool = new Pool(config);

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
