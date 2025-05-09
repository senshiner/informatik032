/* ==========================================================================
   Main JavaScript File
   Created by: INFORMATIKA 032
   Last updated: 2024
   ========================================================================== */

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('nav');

  themeToggleBtn.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem('theme', document.body.dataset.theme);
  });

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.dataset.theme = savedTheme;
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.dataset.theme = 'dark';
  }

  mobileNavToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    if (nav.classList.contains('active')) {
      const xColor = document.body.dataset.theme === "dark" ? "#FFFFFF" : "#000000";
      mobileNavToggle.innerHTML = `<i class="fas fa-times" style="color: ${xColor};"></i>`;
    } else {
      mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // Smooth scroll for nav links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          // Close mobile nav if open
          if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
          }
        }
      }
    });
  });

  // Scroll to top button
  const scrollTopButton = document.getElementById('scroll-to-top');
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Show/hide scroll to top button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopButton.style.opacity = '1';
    } else {
      scrollTopButton.style.opacity = '0';
    }
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  const messagesList = document.getElementById('messages-list');

  // Load saved messages
  loadMessages();

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (name && message) {
      // Create new message object
      const newMessage = {
        name: name,
        message: message,
        date: new Date().toLocaleString()
      };

      // Add to DOM
      addMessageToDOM(newMessage);

      // Save to localStorage
      saveMessage(newMessage);

      // Clear form
      nameInput.value = '';
      messageInput.value = '';
    }
  });

  // Gallery filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      galleryCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Countdown timer
  function updateCountdown() {
    // Set the start date to September 9, 2024, 08:00 WIB
    const startDate = new Date('2024-09-09T08:00:00+07:00');
    const currentDate = new Date();

    // Calculate the time passed since the start date
    const timeDifference = currentDate - startDate;

    // Calculate days, hours, minutes, seconds
    let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Format with leading zeros
    days = String(days).padStart(1, '0');
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    // Update the DOM
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }

  // Update the timer immediately and every second thereafter
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// AI Chat functionality
document.addEventListener('DOMContentLoaded', function() {
  const chatToggle = document.getElementById('chat-toggle');
  const chatBox = document.getElementById('chat-box');
  const chatClose = document.getElementById('chat-close');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  // Load chat history from localStorage
  loadChatHistory();

  // Toggle chat box visibility
  chatToggle.addEventListener('click', () => {
    chatBox.classList.add('active');
  });

  chatClose.addEventListener('click', () => {
    chatBox.classList.remove('active');
  });

  // Handle chat form submission
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message to chat
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'user-message';
    userMessageElement.innerHTML = `<p>You: ${message}</p>`;
    chatMessages.appendChild(userMessageElement);

    // Clear input
    chatInput.value = '';

    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Check for predefined responses first
    let predefinedResponse = null;
    if (window.AIChat && typeof window.AIChat.checkForPredefinedResponse === 'function') {
      predefinedResponse = window.AIChat.checkForPredefinedResponse(message);
    }

    let aiResponse;

    if (predefinedResponse) {
      // Use the predefined response
      aiResponse = predefinedResponse;

      // Add AI response to chat
      const aiMessageElement = document.createElement('div');
      aiMessageElement.className = 'ai-message';
      aiMessageElement.innerHTML = `<p>${aiResponse}</p>`;
      chatMessages.appendChild(aiMessageElement);

      // Auto scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Save chat history
      saveChatMessage('user', `You: ${message}`);
      saveChatMessage('ai', aiResponse);
    } else {
      // Show typing indicator
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'ai-message typing-indicator';
      typingIndicator.innerHTML = '<p>AI is typing</p>';
      chatMessages.appendChild(typingIndicator);

      // Auto scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;

      try {
        // Send message to API
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message })
        });

        const data = await response.json();
        aiResponse = data.reply;
      } catch (error) {
        aiResponse = 'AI: Sorry, I encountered an error. Please try again later.';
      }

      // Remove typing indicator
      chatMessages.removeChild(typingIndicator);

      // Add AI response to chat
      const aiMessageElement = document.createElement('div');
      aiMessageElement.className = 'ai-message';
      aiMessageElement.innerHTML = `<p>${aiResponse}</p>`;
      chatMessages.appendChild(aiMessageElement);

      // Auto scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Save chat history
      saveChatMessage('user', `You: ${message}`);
      saveChatMessage('ai', aiResponse);
    }
  });

  // Functions for message history
  function addMessageToDOM(messageObj) {
    const messageCard = document.createElement('div');
    messageCard.className = 'message-card';

    messageCard.innerHTML = `
      <div class="message-header">
        <span class="message-name">${messageObj.name}</span>
        <span class="message-date">${messageObj.date}</span>
      </div>
      <div class="message-text">${messageObj.message}</div>
    `;

    messagesList.prepend(messageCard);
  }

  function saveMessage(messageObj) {
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.unshift(messageObj);

    // Limit to 10 messages
    if (messages.length > 10) {
      messages = messages.slice(0, 10);
    }

    localStorage.setItem('contactMessages', JSON.stringify(messages));
  }

  function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];

    messages.forEach(message => {
      addMessageToDOM(message);
    });
  }

  // Note: Functions already defined above - no need to redefine them

  // Functions for chat history
  function saveChatMessage(type, message) {
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.push({ type, message });

    // Limit to 50 messages
    if (chatHistory.length > 50) {
      chatHistory = chatHistory.slice(chatHistory.length - 50);
    }

    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }

  function loadChatHistory() {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    chatHistory.forEach(item => {
      const messageElement = document.createElement('div');
      messageElement.className = item.type === 'user' ? 'user-message' : 'ai-message';
      messageElement.innerHTML = `<p>${item.message}</p>`;
      chatMessages.appendChild(messageElement);
    });

    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});