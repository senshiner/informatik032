/**
 * UI Script - DOM interactions and event handlers
 * Business logic in /services/
 * BACKEND_READY_POINT markers show integration points
 */

let chatService, contactService;

// Markdown-to-HTML converter for chat messages
function parseMarkdown(text) {
  let html = text;
  // Bold: **text** -> <strong>text</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Bullet points: - item -> <li>item</li> and wrap with <ul>
  const lines = html.split("\n");
  let inList = false;
  const result = [];
  for (const line of lines) {
    if (line.trim().startsWith("- ")) {
      if (!inList) {
        result.push("<ul>");
        inList = true;
      }
      result.push(`<li>${line.replace(/^-\s*/, "")}</li>`);
    } else {
      if (inList) {
        result.push("</ul>");
        inList = false;
      }
      if (line.trim()) result.push(line);
    }
  }
  if (inList) result.push("</ul>");
  html = result.join("\n");
  // Line breaks
  html = html.replace(/\n/g, "<br>");
  return html;
}

// Initialize theme immediately (before DOMContentLoaded) for Next.js
(function initThemeImmediate() {
  const theme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", theme);
})();

function initializeServices() {
  chatService = new ChatService(window.apiService);
  contactService = new ContactService(window.apiService);
}

function initThemeToggle() {
  const btn = document.getElementById("theme-toggle-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

function setupUIHandlers() {
  const toggle = document.querySelector(".mobile-nav-toggle");
  const nav = document.querySelector("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      const theme = document.documentElement.getAttribute("data-theme");
      const color = theme === "dark" ? "#FFF" : "#000";
      toggle.innerHTML = nav.classList.contains("active") ? `<i class="fas fa-times" style="color: ${color};"></i>` : '<i class="fas fa-bars"></i>';
    });
    document.querySelectorAll("nav ul li a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  const d = document.getElementById("days");
  const h = document.getElementById("hours");
  const m = document.getElementById("minutes");
  const s = document.getElementById("seconds");
  if (d && h && m && s) {
    const target = new Date("2024-09-09T08:00:00").getTime();
    function updateTimer() {
      const now = Date.now();
      const diff = now - target; // elapsed time since 9 Sep 2024
      if (diff <= 0) {
        [d, h, m, s].forEach((el) => (el.textContent = "00"));
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      d.textContent = days < 10 ? `0${days}` : days;
      h.textContent = hrs < 10 ? `0${hrs}` : hrs;
      m.textContent = mins < 10 ? `0${mins}` : mins;
      s.textContent = secs < 10 ? `0${secs}` : secs;
    }
    updateTimer();
    setInterval(updateTimer, 1000);
  }

  const headerEl = document.querySelector("header");
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const id = a.getAttribute("href");
      if (id === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.querySelector(id);
      if (el && headerEl) {
        const headerHeight = headerEl.offsetHeight;
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  const contactForm = document.getElementById("contact-form");
  const msgList = document.getElementById("messages-list");
  if (contactForm && msgList && contactService) {
    function displayMessages() {
      msgList.innerHTML = "";
      contactService.getRecentMessages(3).forEach((m) => {
        const c = document.createElement("div");
        c.classList.add("message-card");
        c.innerHTML = `<div class="message-header"><span class="message-name">${m.name}</span><span class="message-date">${m.date}</span></div><p class="message-text">${m.text}</p>`;
        msgList.appendChild(c);
      });
    }
    displayMessages();
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const n = document.getElementById("name");
      const msg = document.getElementById("message");
      try {
        await contactService.submitMessage(n.value.trim(), msg.value.trim());
        displayMessages();
        n.value = "";
        msg.value = "";
      } catch (err) {
        console.error("Error:", err);
        alert("Terjadi kesalahan: " + err.message);
      }
    });
  }

  const btns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".gallery-card");
  if (btns.length > 0 && cards.length > 0) {
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.getAttribute("data-filter");
        cards.forEach((c) => (c.style.display = f === "all" || c.getAttribute("data-category") === f ? "block" : "none"));
      });
    });
    cards.forEach((c) => {
      const overlay = c.querySelector(".gallery-overlay");
      if (overlay) {
        c.addEventListener("mouseenter", () => (overlay.style.opacity = "1"));
        c.addEventListener("mouseleave", () => (overlay.style.opacity = "0"));
      }
    });
  }

  const chatToggle = document.getElementById("chat-toggle");
  const chatBox = document.getElementById("chat-box");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");
  const chatClose = document.getElementById("chat-close");
  if (chatToggle && chatBox && chatForm && chatInput && chatMessages && chatClose) {
    chatToggle.addEventListener("click", () => chatBox.classList.toggle("active"));
    chatClose.addEventListener("click", () => chatBox.classList.remove("active"));
    function addMessageToChat(type, text) {
      const div = document.createElement("div");
      div.classList.add(`${type}-message`);
      const htmlContent = type === "user" ? `You: ${text}` : `AI: ${parseMarkdown(text)}`;
      div.innerHTML = `<p>${htmlContent}</p>`;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    async function sendChatMessage(message) {
      try {
        const typing = document.createElement("div");
        typing.classList.add("ai-message", "typing-indicator");
        typing.innerHTML = "<p>AI sedang mengetik...</p>";
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        const res = await chatService.sendMessage(message);
        chatMessages.removeChild(typing);
        addMessageToChat("ai", res.reply);
        console.log(`Source: ${res.source}${res.mockMode ? " (mock)" : ""}`);
      } catch (err) {
        console.error("Chat error:", err);
        addMessageToChat("ai", "Maaf, terjadi kesalahan.");
      }
    }
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (text) {
        addMessageToChat("user", text);
        chatInput.value = "";
        sendChatMessage(text);
      }
    });
  }
}

// Handle both DOMContentLoaded and Next.js hydration
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof ChatService !== "undefined") {
      initializeServices();
      initThemeToggle();
      setupUIHandlers();
    }
  });
} else {
  // Already loaded (Next.js hydration)
  if (typeof ChatService !== "undefined") {
    initializeServices();
    initThemeToggle();
    setupUIHandlers();
  }
}
