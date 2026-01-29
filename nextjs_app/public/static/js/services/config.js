/**
 * Configuration - API endpoints and AI behavior (single source of truth)
 */

// External AI API configuration
const AI_API_CONFIG = {
  baseUrl: "https://api.deline.web.id",
  endpoint: "/ai/copilot",
  method: "GET",
  paramKey: "text",
  responseKey: "result",
  timeout: 10000,
};

// AI behavior/personality prompt template
const AI_BEHAVIOR_PROMPT = `Anda adalah asisten AI ramah, profesional, dan membantu untuk website INFORMATIKA 032 Universitas Pamulang.
Bersikaplah:
- Sopan dan informatif
- Jawab dengan bahasa Indonesia yang jelas dan mudah dipahami
- Gunakan format yang rapi (bold untuk penting, bullet points untuk daftar)
- Jika ditanya soal dosen atau kalender akademik, arahkan ke website resmi Universitas Pamulang
- Singkat namun informatif (2-3 kalimat untuk jawaban normal)`;

// Backend API configuration
const API_CONFIG = {
  BASE_URL: "/api",
  TIMEOUT: 5000,
  USE_MOCK: true,
};

// Make globally available
window.AI_API_CONFIG = AI_API_CONFIG;
window.AI_BEHAVIOR_PROMPT = AI_BEHAVIOR_PROMPT;
window.API_CONFIG = API_CONFIG;
