// Responses Ai
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
    
    // Schedule
    "jadwal": "-Ketikan jadwal- 'jadwal senin', 'jadwal selasa', 'jadwal rabu', 'jadwal jumat'",
    "jadwal senin": "Komputer Grafik = 13:00, PAK = 14:40",
    "jadwal selasa": "Komunikasi Data = 08:50",
    "jadwal rabu": "Komputer Masyarakat = 07:10, Kalkulus = 08:50",
    "jadwal jumat": "Bingg = 07:10, Sistem Operasi = 08:50, PKN = 10:30, Bindo = 14:00",
    
    // Basic questions
    "siapa kamu": "Saya adalah AI Assistant untuk kelas INFORMATIKA 032. Saya di sini untuk membantu menjawab pertanyaan Anda.",
    "namamu siapa": "Saya adalah AI Assistant untuk kelas INFORMATIKA 032.",
    "kamu siapa": "Saya adalah AI Assistant untuk kelas INFORMATIKA 032.",
    
    // Website related
    "website ini": "Website ini adalah platform resmi kelas INFORMATIKA 032 yang menampilkan informasi, gallery, dan berbagai aplikasi yang dibuat oleh mahasiswa kelas kami.",
    "tujuan website": "Website ini bertujuan sebagai media informasi dan showcase project dari kelas INFORMATIKA 032.",
    
    // Farewells
    "bye": "Sampai jumpa kembali! Jika ada pertanyaan lain, silahkan kembali kapan saja.",
    "selamat tinggal": "Sampai jumpa kembali! Jika ada pertanyaan lain, silahkan kembali kapan saja."
  };
  
  // Function response patterns
  function checkForPredefinedResponse(message) {
    const lowerMessage = message.toLowerCase().trim();
    
    if (predefinedResponses[lowerMessage]) {
      return predefinedResponses[lowerMessage];
    }
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return null;
  }
  
  window.AIChat = {
    checkForPredefinedResponse: checkForPredefinedResponse
  };