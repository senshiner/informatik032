/**
 * Chat Service - Chat logic with predefined responses and API integration
 * BACKEND_READY_POINT: Update /api/chat when backend is ready
 */

class ChatService {
  constructor(apiService) {
    this.apiService = apiService;
    this.sessionId = this._getOrCreateSessionId();
    this.predefinedResponses = this._initPredefinedResponses();
  }

  // Get or create session ID
  _getOrCreateSessionId() {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = "guest-" + Math.random().toString(36).substring(2, 10);
      localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  }

  // Initialize predefined responses
  _initPredefinedResponses() {
    return {
      halo: "Halo! Ada yang bisa saya bantu?",
      hai: "Hai! Ada yang bisa saya bantu?",
      hi: "Hi! Ada yang bisa saya bantu?",
      hello: "Hello! Ada yang bisa saya bantu?",
      "terima kasih": "Sama-sama! Senang bisa membantu.",
      makasih: "Sama-sama! Senang bisa membantu.",
      thanks: "Sama-sama! Senang bisa membantu.",
      jadwal: "-Ketikan jadwal- 'jadwal senin', 'jadwal selasa', 'jadwal rabu', 'jadwal jumat'",
      "jadwal senin": "Komputer Grafik = 13:00, PAK = 14:40",
      "jadwal selasa": "Komunikasi Data = 08:50",
      "jadwal rabu": "Komputer Masyarakat = 07:10, Kalkulus = 08:50",
      "jadwal jumat": "Bingg = 07:10, Sistem Operasi = 08:50, PKN = 10:30, Bindo = 14:00",
      "siapa kamu": "Saya adalah AI Assistant untuk kelas INFORMATIKA 032. Saya di sini untuk membantu menjawab pertanyaan Anda.",
      "namamu siapa": "Saya adalah AI Assistant untuk kelas INFORMATIKA 032.",
      "kamu siapa": "Saya adalah AI Assistant untuk kelas INFORMATIKA 032.",
      "website ini": "Website ini adalah platform resmi kelas INFORMATIKA 032 yang menampilkan informasi, gallery, dan berbagai aplikasi yang dibuat oleh mahasiswa kelas kami.",
      "tujuan website": "Website ini bertujuan sebagai media informasi dan showcase project dari kelas INFORMATIKA 032.",
      bye: "Sampai jumpa kembali! Jika ada pertanyaan lain, silahkan kembali kapan saja.",
      "selamat tinggal": "Sampai jumpa kembali! Jika ada pertanyaan lain, silahkan kembali kapan saja.",
    };
  }

  // Check predefined response first (no API call)
  checkPredefinedResponse(message) {
    const lowerMessage = message.toLowerCase().trim();

    // Exact match
    if (this.predefinedResponses[lowerMessage]) {
      return this.predefinedResponses[lowerMessage];
    }

    // Partial match
    for (const [key, response] of Object.entries(this.predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return null;
  }

  // Send message to API (checks predefined first, then calls external AI API)
  async sendMessage(message, logic = null) {
    // Check predefined response first (no API call)
    const predefinedResponse = this.checkPredefinedResponse(message);
    if (predefinedResponse) {
      return {
        reply: predefinedResponse,
        source: "predefined",
        mockMode: false,
      };
    }

    try {
      // Build message with AI behavior prompt (from config.js)
      const behaviorPrompt = window.AI_BEHAVIOR_PROMPT || "Anda adalah asisten AI ramah dan profesional.";
      const finalMessage = `${behaviorPrompt}\n\nPertanyaan pengguna:\n${message}`.trim();

      // Call external AI API via ApiService
      if (this.apiService && typeof this.apiService.getAIResponse === "function") {
        const result = await this.apiService.getAIResponse(finalMessage);
        return {
          reply: result || "Maaf, saya tidak dapat memproses permintaan Anda.",
          source: "ai",
          mockMode: false,
        };
      }

      // Fallback to backend /api/chat if getAIResponse not available
      // BACKEND_READY_POINT: Update /api/chat endpoint when backend is ready
      const response = await this.apiService.post("/api/chat", {
        text: message,
        logic: logic || behaviorPrompt,
        sessionId: this.sessionId,
      });

      return {
        reply: response.reply || "Maaf, saya tidak dapat memproses permintaan Anda.",
        source: response.mockMode ? "mock" : "ai",
        mockMode: response.mockMode || false,
      };
    } catch (error) {
      console.error("Chat service error:", error);
      throw new Error("Gagal mengirim pesan ke AI service: " + error.message);
    }
  }

  // Clear session
  clearSession() {
    this.sessionId = this._getOrCreateSessionId();
  }

  // Get current session ID
  getSessionId() {
    return this.sessionId;
  }
}

// Export as global for use in script.js
// This is initialized after api-service loads
window.ChatService = ChatService;
