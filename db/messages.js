
const db = require('./config');

// Membuat tabel pesan jika belum ada
const createMessagesTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await db.query(createTableQuery);
    console.log('Messages table created or already exists');
  } catch (error) {
    console.error('Error creating messages table:', error);
  }
};

// Menyimpan pesan baru
const saveMessage = async (name, message) => {
  const query = 'INSERT INTO contact_messages (name, message) VALUES ($1, $2) RETURNING *';
  try {
    const result = await db.query(query, [name, message]);
    return result.rows[0];
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};

// Mendapatkan 10 pesan terakhir
const getRecentMessages = async () => {
  const query = 'SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 10';
  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
};

// Inisialisasi tabel
createMessagesTable();

module.exports = {
  saveMessage,
  getRecentMessages
};
