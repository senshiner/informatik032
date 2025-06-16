const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method not allowed' });
  }

  const { text, logic, sessionId } = req.body;

  if (!text) {
    return res.status(400).json({ reply: 'Teks tidak boleh kosong.' });
  }

  try {
    const apiUrl = `https://archive.lick.eu.org/api/ai/gpt-4-logic?ask=${encodeURIComponent(text)}&style=${encodeURIComponent(logic)}&sessionId=${encodeURIComponent(sessionId || 'guest')}`;

    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY || ''}`
      }
    });

    const reply = response.data.result || 'Maaf, AI tidak dapat memberikan balasan saat ini.';
    res.status(200).json({ reply });
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({ reply: 'AI: Terjadi kesalahan dalam memproses permintaan.' });
  }
};
