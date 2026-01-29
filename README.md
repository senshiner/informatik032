# INFORMATIKA 032 — AI-Powered Class Website

Situs resmi kelas INFORMATIKA 032 Universitas Pamulang dengan AI Assistant terintegrasi.

## 📁 Struktur Proyek

```
informatik032/
├── nextjs_app/              # Next.js production app (main)
│   ├── pages/               # Pages and routes
│   ├── public/static/       # CSS, JS, images (centralized assets)
│   ├── styles/              # Global styles
│   └── package.json
├── api/                     # Legacy backend (deprecated, kept for reference)
│   └── chat.js
├── .gitignore              # Git configuration
└── README.md               # This file
```

## 🚀 Quick Start

### Development

```bash
cd nextjs_app
npm install
npm run dev
```

Buka http://localhost:3000

### Production

```bash
cd nextjs_app
npm install
npm run build
npm start
```

## 🤖 AI Assistant Configuration

Semua konfigurasi AI ada di **satu file**:

📄 `nextjs_app/public/static/js/services/config.js`

### Ganti API Endpoint

```javascript
const AI_API_CONFIG = {
  baseUrl: "https://api.deline.web.id",  // ← Ubah di sini
  endpoint: "/ai/copilot",
  method: "GET",
  paramKey: "text",
  responseKey: "result",
  timeout: 10000,
};
```

### Ganti Sifat/Perilaku AI

```javascript
const AI_BEHAVIOR_PROMPT = `
Anda adalah asisten AI ramah, profesional...
- Sopan dan informatif
- Jawab dengan bahasa Indonesia yang jelas
...
`;  // ← Edit di sini untuk ubah perilaku AI
```

### Fitur Markdown di Chat

AI response otomatis render:
- **Bold:** `**text**` → `<strong>text</strong>`
- Bullet points: `- item` → bullet list
- Line breaks: `\n` → line breaks

Styling ada di `nextjs_app/public/static/css/ai-chat.css`

## 📝 Service Layer

Semua logic terpisah dalam service files:

- **ApiService** — HTTP GET/POST wrapper + Copilot integration
- **ChatService** — Predefined responses + external AI API
- **ContactService** — Contact form + localStorage
- **Config** — Centralized API & AI settings

## 🔧 Backend Integration

Saat backend siap:

1. Ubah `AI_API_CONFIG.baseUrl` di `config.js`
2. Backend harus return JSON dengan format:
   ```json
   { "result": "jawaban AI" }
   ```

## 📜 Catatan

- ✅ Semua aset sudah terpusat di `nextjs_app/public/static/`
- ✅ AI behavior terpisah dari API service (mudah diubah)
- ✅ Chat UI mendukung markdown rendering
- ✅ Next.js app sudah production-ready
- ❌ Root `static/` dan `index.html` sudah dihapus (tidak dibutuhkan)
