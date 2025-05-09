
/**
 * AI Chat predefined responses module
 * Created by: INFORMATIKA 032
 * Last updated: 2024
 */

// Initialize window.AIChat object to avoid reference errors
window.AIChat = {};

// Map of predefined responses for common user inputs
const predefinedResponses = {
  // Greetings
  "halo": "Halo! Ada yang bisa saya bantu?",
  "hi": "Hi there! How can I help you today?",
  "hello": "Hello! How can I assist you?",
  "hey": "Hey there! What can I do for you?",
  "hai": "Hai! Ada yang bisa saya bantu?",
  
  // Basic questions about the website
  "website ini apa": "Ini adalah website kelas Informatika 032 dari Universitas Pamulang. Website ini berisi informasi tentang kelas, kegiatan, dan karya-karya mahasiswa Informatika 032.",
  "tentang website ini": "Website ini dibuat oleh mahasiswa Informatika 032 dari Universitas Pamulang sebagai platform untuk berbagi informasi dan showcase proyek-proyek kelas.",
  "siapa yang membuat website ini": "Website ini dibuat oleh mahasiswa Informatika 032 dari Universitas Pamulang.",
  
  // Thank you responses
  "terima kasih": "Sama-sama! Jika ada pertanyaan lain, silahkan tanyakan kepada saya.",
  "makasih": "Sama-sama! Senang bisa membantu.",
  "thanks": "You're welcome! Let me know if you need anything else.",
  "thank you": "You're welcome! Feel free to ask if you have more questions.",
  
  // Goodbyes
  "bye": "Sampai jumpa kembali! Jika ada pertanyaan lain, silahkan kembali kapan saja.",
  "goodbye": "Sampai jumpa kembali! Jika ada pertanyaan lain, silahkan kembali kapan saja.",
  "dadah": "Sampai jumpa kembali! Jika ada pertanyaan lain, silahkan kembali kapan saja.",
  "selamat tinggal": "Sampai jumpa kembali! Jika ada pertanyaan lain, silahkan kembali kapan saja."
};

/**
 * Check if a user message has a predefined response
 * @param {string} message - The user's message
 * @return {string|null} The predefined response or null if none exists
 */
function checkForPredefinedResponse(message) {
  // Convert to lowercase and trim
  const normalizedMessage = message.toLowerCase().trim();
  
  // Check for exact matches
  if (predefinedResponses[normalizedMessage]) {
    return predefinedResponses[normalizedMessage];
  }
  
  // Check for partial matches (if the predefined key is contained in the message)
  for (const key in predefinedResponses) {
    if (normalizedMessage.includes(key)) {
      return predefinedResponses[key];
    }
  }
  
  // No match found
  return null;
}

// Make function available globally
window.AIChat = {
  checkForPredefinedResponse: checkForPredefinedResponse
};
