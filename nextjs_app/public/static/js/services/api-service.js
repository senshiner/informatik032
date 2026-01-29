/**
 * Api Service - GET/POST wrapper and AI copilot integration
 * Uses configuration from config.js (single source of truth)
 */
class ApiService {
  constructor(config) {
    this.config = config || window.API_CONFIG || { BASE_URL: "/api", TIMEOUT: 5000 };
  }

  async get(path, params = {}) {
    const url = path.startsWith("http") ? path : `${this.config.BASE_URL}${path}`;
    const query = new URLSearchParams(params).toString();
    const final = query ? `${url}${url.includes("?") ? "&" : "?"}${query}` : url;
    const res = await fetch(final, { method: "GET", headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("Network error: " + res.status);
    return await res.json();
  }

  async post(path, body = {}) {
    const url = path.startsWith("http") ? path : `${this.config.BASE_URL}${path}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Network error: " + res.status);
    return await res.json();
  }

  // Get AI response from external Copilot API (uses AI_API_CONFIG)
  async getAIResponse(message) {
    const cfg = window.AI_API_CONFIG;
    if (!cfg) throw new Error("AI_API_CONFIG not found");

    const url = `${cfg.baseUrl}${cfg.endpoint}`;
    const params = { [cfg.paramKey]: message };
    const query = new URLSearchParams(params).toString();
    const finalUrl = `${url}?${query}`;

    const res = await fetch(finalUrl, {
      method: cfg.method,
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(cfg.timeout),
    });
    if (!res.ok) throw new Error("AI request failed: " + res.status);
    const data = await res.json();
    return data[cfg.responseKey] || "";
  }
}

window.apiService = new ApiService(window.API_CONFIG);
