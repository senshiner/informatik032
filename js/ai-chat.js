
// AI Chat predefined responses module
// Created by: INFORMATIKA 032
// Last updated: 2024

/**
 * Map of predefined responses for common user inputs
 * Each key is a lowercase user input, and the value is the AI's response
 */
const predefinedResponses = {
  // Greetings
  "halo": "Halo! Ada yang bisa saya bantu?",
  "hai": "Hai! Ada yang bisa saya bantu?",
  "hi": "Hi! Ada yang bisa saya bantu?",
  "hello": "Hello! Ada yang bisa saya bantu?",
  
  // Thanks
  "terima kasih": "Sama-sama! Senang bisa membantu.",
  "makasih": "Sama-sama! Senang bisa membantu.",
  "thanks": "Sama-sama! Senang bisa membantu.",
  "thank you": "Sama-sama! Senang bisa membantu.",
  
  // Basic questions
  "siapa kamu": "Saya adalah AI Assistant untuk kelas INFORMATIKA 032. Saya di sini untuk membantu menjawab pertanyaan Anda.",
  "namamu siapa": "Saya adalah AI Assistant untuk kelas INFORMATIKA 032.",
  "kamu siapa": "Saya adalah AI Assistant untuk kelas INFORMATIKA 032.",
  
  // About the class
  "informatika 032": "INFORMATIKA 032 adalah kelas Teknik Informatika di Universitas Pamulang. Kelas kami fokus pada pengembangan teknologi dan inovasi.",
  "tentang informatika": "Program Studi Informatika fokus pada pengembangan software, algoritma, dan sistem informasi untuk memecahkan berbagai masalah teknologi.",
  
  // Website related
  "website ini": "Website ini adalah platform resmi kelas INFORMATIKA 032 yang menampilkan informasi, gallery, dan berbagai aplikasi yang dibuat oleh mahasiswa kelas kami.",
  "tujuan website": "Website ini bertujuan sebagai media informasi dan showcase project dari kelas INFORMATIKA 032.",
  
  // Farewells
  "bye": "Sampai jumpa kembali! Jika ada pertanyaan lain, silahkan kembali kapan saja.",
  "goodbye": "Sampai jumpa kembali! Jika ada pertanyaan lain, silahkan kembali kapan saja.",
  "dadah": "Sampai jumpa kembali! Jika ada pertanyaan lain, silahkan kembali kapan saja.",
  "selamat tinggal": "Sampai jumpa kembali! Jika ada pertanyaan lain, silahkan kembali kapan saja.",
};

/**
 * Checks if a user message has a predefined response
 * @param {string} message - The user's message
 * @returns {string|null} - The predefined response or null if none found
 */
function checkForPredefinedResponse(message) {
  // Convert message to lowercase for case-insensitive matching
  const normalizedMessage = message.toLowerCase().trim();
  
  // Direct match
  if (predefinedResponses[normalizedMessage]) {
    return predefinedResponses[normalizedMessage];
  }
  
  // Partial match (if message contains a key)
  for (const key in predefinedResponses) {
    if (normalizedMessage.includes(key)) {
      return predefinedResponses[key];
    }
  }
  
  // No match found
  return null;
}

// Instead of ES module export, make it globally available
window.AIChat = {
  checkForPredefinedResponse: checkForPredefinedResponse
};
