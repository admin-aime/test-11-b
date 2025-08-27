import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    
    // Test query
    const result = await client.query('SELECT NOW()');
    console.log('📅 Database time:', result.rows[0].now);
    
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Initialize database tables
export const initializeDatabase = async () => {
  try {
    const client = await pool.connect();
    
    // Create AppUser table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS AppUser (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        is_active BOOLEAN DEFAULT TRUE
      );
      
      CREATE INDEX IF NOT EXISTS idx_appuser_email ON AppUser(email);
    `;
    
    await client.query(createTableQuery);
    console.log('✅ AppUser table initialized successfully');
    
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    return false;
  }
};

// User database operations
export const userOperations = {
  // Create new user
  async createUser(email, passwordHash, name) {
    try {
      const client = await pool.connect();
      const query = `
        INSERT INTO AppUser (email, password_hash, name)
        VALUES ($1, $2, $3)
        RETURNING id, email, name, created_at, is_active
      `;
      
      const result = await client.query(query, [email, passwordHash, name]);
      client.release();
      
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        throw new Error('Email already exists');
      }
      throw error;
    }
  },

  // Find user by email
  async findUserByEmail(email) {
    try {
      const client = await pool.connect();
      const query = `
        SELECT id, email, password_hash, name, created_at, is_active
        FROM AppUser
        WHERE email = $1 AND is_active = TRUE
      `;
      
      const result = await client.query(query, [email]);
      client.release();
      
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Check if email exists
  async emailExists(email) {
    try {
      const client = await pool.connect();
      const query = `
        SELECT COUNT(*) as count
        FROM AppUser
        WHERE email = $1
      `;
      
      const result = await client.query(query, [email]);
      client.release();
      
      return parseInt(result.rows[0].count) > 0;
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  async getUserById(id) {
    try {
      const client = await pool.connect();
      const query = `
        SELECT id, email, name, created_at, is_active
        FROM AppUser
        WHERE id = $1 AND is_active = TRUE
      `;
      
      const result = await client.query(query, [id]);
      client.release();
      
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }
};

export default pool;
