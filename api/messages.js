
const { saveMessage, getRecentMessages } = require('../db/messages');

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      // Mendapatkan pesan terbaru
      const messages = await getRecentMessages();
      return res.status(200).json({ messages });
    } else if (req.method === 'POST') {
      // Menyimpan pesan baru
      const { name, message } = req.body;
      
      if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
      }
      
      const savedMessage = await saveMessage(name, message);
      return res.status(201).json({ message: savedMessage });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in messages API:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
