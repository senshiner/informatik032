module.exports = async (req, res) => {
    try {
        const response = await fetch('https://fastrestapis.fasturl.cloud/aillm/gpt-4o', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.status(200).json({ reply: data.reply || 'AI: Halo, apa kabar?' });
    } catch (error) {
        res.status(500).json({ reply: 'AI: Error connecting' });
    }
};