import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
let db;
try {
  db = new Database(':memory:');
  console.log('✅ Database connected successfully');
} catch (error) {
  console.error('❌ Database connection failed:', error.message);
  process.exit(1);
}

// Create users table
try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ Users table created successfully');
} catch (error) {
  console.error('❌ Failed to create users table:', error.message);
}

// Create default admin user
try {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO users (email, password, firstName, lastName, role)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run('admin@diligentpharma.com', hashedPassword, 'Admin', 'User', 'admin');
  
  if (result.changes > 0) {
    console.log('✅ Default admin user created');
  } else {
    console.log('ℹ️ Default admin user already exists');
  }
} catch (error) {
  console.error('❌ Failed to create default admin user:', error.message);
}

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.send({ 
    status: 'OK', 
    message: 'Diligent Pharma Server is running',
    timestamp: new Date().toISOString()
  });
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).send({ 
        error: 'All fields are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).send({ 
        error: 'Password must be at least 6 characters long' 
      });
    }

    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).send({ 
        error: 'User with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const stmt = db.prepare(`
      INSERT INTO users (email, password, firstName, lastName)
      VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(email, hashedPassword, firstName, lastName);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: result.lastInsertRowid, 
        email: email,
        role: 'user'
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).send({
      message: 'User registered successfully',
      token: token,
      user: {
        id: result.lastInsertRowid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: 'user'
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send({ 
      error: 'Internal server error during registration' 
    });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({ 
        error: 'Email and password are required' 
      });
    }

    // Find user
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).send({ 
        error: 'Invalid email or password' 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({ 
        error: 'Invalid email or password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.send({
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ 
      error: 'Internal server error during login' 
    });
  }
});

// Protected route example
app.get('/api/profile', authenticateToken, (req, res) => {
  try {
    const user = db.prepare('SELECT id, email, firstName, lastName, role, createdAt FROM users WHERE id = ?').get(req.user.userId);
    
    if (!user) {
      return res.status(404).send({ 
        error: 'User not found' 
      });
    }

    res.send({
      user: user
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).send({ 
      error: 'Internal server error' 
    });
  }
});

// Forgot password endpoint
app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ 
        error: 'Email is required' 
      });
    }

    // Check if user exists
    const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (!user) {
      // Don't reveal if email exists or not for security
      return res.send({
        message: 'If an account with that email exists, a password reset link has been sent.'
      });
    }

    // In a real application, you would:
    // 1. Generate a secure reset token
    // 2. Store it in the database with expiration
    // 3. Send an email with the reset link
    
    // For demo purposes, we'll just return success
    res.send({
      message: 'If an account with that email exists, a password reset link has been sent.'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).send({ 
      error: 'Internal server error' 
    });
  }
});

// Get all users (admin only)
app.get('/api/users', authenticateToken, (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).send({ 
        error: 'Admin access required' 
      });
    }

    const users = db.prepare('SELECT id, email, firstName, lastName, role, createdAt FROM users').all();
    
    res.send({
      users: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).send({ 
      error: 'Internal server error' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send({ 
    error: 'Something went wrong!' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send({ 
    error: 'Route not found' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Diligent Pharma Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Default admin: admin@diligentpharma.com / admin123`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  if (db) {
    db.close();
    console.log('✅ Database connection closed');
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down server...');
  if (db) {
    db.close();
    console.log('✅ Database connection closed');
  }
  process.exit(0);
});
