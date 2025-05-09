
module.exports = async (req, res) => {
    try {
        console.log("API Chat Request:", req.body);
        
        // Validasi input
        if (!req.body || !req.body.message) {
            return res.status(400).json({ 
                reply: 'AI: Maaf, saya tidak mendapatkan pesan yang valid. Mohon kirim pesan dalam format yang benar.' 
            });
        }
        
        const response = await fetch('https://fastrestapis.fasturl.cloud/aillm/gpt-4o', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify(req.body)
        });
        
        if (!response.ok) {
            console.error('API Error:', response.status, response.statusText);
            throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API Response:", data);
        
        res.status(200).json({ 
            reply: data.reply || 'AI: Halo, apa kabar?' 
        });
    } catch (error) {
        console.error('AI Chat Error:', error.message);
        res.status(500).json({ 
            reply: 'AI: Maaf, terjadi kesalahan saat menghubungi layanan AI. Silakan coba lagi nanti.' 
        });
    }
};
