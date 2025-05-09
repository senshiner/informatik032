
/**
 * Simple AI chat response API
 */

module.exports = async (req, res) => {
    try {
        console.log("API Chat Request:", req.body);
        
        // Validasi input
        if (!req.body || !req.body.message) {
            return res.status(400).json({ 
                reply: 'AI: Maaf, saya tidak mendapatkan pesan yang valid. Mohon kirim pesan dalam format yang benar.' 
            });
        }
        
        // Predefined responses for simple AI chat
        const predefinedResponses = {
            "halo": "Halo! Ada yang bisa saya bantu?",
            "hi": "Hi there! How can I help you today?",
            "hello": "Hello! How can I assist you?",
            "informatika": "Informatika adalah program studi yang mempelajari tentang pemrosesan informasi dengan bantuan komputer.",
            "pamulang": "Universitas Pamulang adalah salah satu perguruan tinggi swasta yang terletak di Tangerang Selatan, Banten.",
            "website": "Website ini dibuat oleh mahasiswa Informatika 032 dari Universitas Pamulang sebagai platform untuk berbagi informasi.",
            "kuliah": "Kuliah di Teknik Informatika mempelajari berbagai aspek teknologi seperti pemrograman, basis data, jaringan, dan kecerdasan buatan.",
            "program": "Kami memiliki berbagai program studi seperti Informatika, Sistem Informasi, dan Teknologi Informasi."
        };
        
        const message = req.body.message.toLowerCase();
        let reply = 'AI: Maaf, saya belum dilatih untuk menjawab pertanyaan ini. Silakan tanyakan hal lain atau hubungi admin.';
        
        // Check if any predefined response matches
        for (const key in predefinedResponses) {
            if (message.includes(key)) {
                reply = 'AI: ' + predefinedResponses[key];
                break;
            }
        }
        
        // Add some randomness for more natural responses
        const greetings = [
            "Hai! Ada yang bisa saya bantu?",
            "Hello! How can I assist you today?",
            "Halo! Apa kabar? Ada yang bisa saya bantu?",
            "Hi there! What can I do for you?"
        ];
        
        if (message.match(/^(hi|hello|halo|hai|hey|salam).*/i)) {
            const randomIndex = Math.floor(Math.random() * greetings.length);
            reply = 'AI: ' + greetings[randomIndex];
        }
        
        res.status(200).json({ reply });
    } catch (error) {
        console.error('AI Chat Error:', error.message);
        res.status(500).json({ 
            reply: 'AI: Maaf, terjadi kesalahan. Silakan coba lagi nanti.' 
        });
    }
};
