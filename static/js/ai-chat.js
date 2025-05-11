// Predefined responses for common questions
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
    "selamat tinggal": "Sampai jumpa kembali! Jika ada pertanyaan lain, silahkan kembali kapan saja."
  };
  
  // Function to check if the message matches any predefined response patterns
  function checkForPredefinedResponse(message) {
    // Convert message to lowercase for case-insensitive matching
    const lowerMessage = message.toLowerCase().trim();
    
    // Check exact matches first
    if (predefinedResponses[lowerMessage]) {
      return predefinedResponses[lowerMessage];
    }
    
    // Check for partial matches (if the message contains a key phrase)
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // No predefined response found
    return null;
  }
  
  // Instead of ES module export, make it globally available
  window.AIChat = {
    checkForPredefinedResponse: checkForPredefinedResponse
  };