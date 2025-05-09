// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Set initial theme
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('nav');

  mobileNavToggle.addEventListener('click', function() {
    nav.classList.toggle('active');

    if (nav.classList.contains('active')) {
      // Light mode: Black X, Dark mode: White X
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const xColor = currentTheme === 'dark' ? '#FFFFFF' : '#000000';
      mobileNavToggle.innerHTML = `<i class="fas fa-times" style="color: ${xColor};"></i>`;
    } else {
      mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // Close mobile nav when clicking on a nav link
  const navLinks = document.querySelectorAll('nav ul li a');

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
      mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Timer functionality
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  // Set the target date: September 9, 2024 08:00:00
  const targetDate = new Date('2024-09-09T08:00:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    daysElement.textContent = days < 10 ? `0${days}` : days;
    hoursElement.textContent = hours < 10 ? `0${hours}` : hours;
    minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;
  }

  // Update timer immediately and then every second
  updateTimer();
  setInterval(updateTimer, 1000);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');

      // Check if targetId is just "#" (hash only)
      if (targetId === "#") {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact Form Functionality
  const contactForm = document.getElementById('contact-form');
  const messagesList = document.getElementById('messages-list');

  // Load messages from localStorage
  function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];

    // Display the 3 most recent messages
    messagesList.innerHTML = '';
    const recentMessages = messages.slice(0, 3);

    recentMessages.forEach(message => {
      const messageCard = document.createElement('div');
      messageCard.classList.add('message-card');

      messageCard.innerHTML = `
        <div class="message-header">
          <span class="message-name">${message.name}</span>
          <span class="message-date">${message.date}</span>
        </div>
        <p class="message-text">${message.text}</p>
      `;

      messagesList.appendChild(messageCard);
    });
  }

  // Load messages on page load
  loadMessages();

  // Submit form handler
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
        text: message,
        date: new Date().toLocaleDateString()
      };

      // Get existing messages
      const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];

      // Add new message to the beginning of the array
      messages.unshift(newMessage);

      // Save back to localStorage
      localStorage.setItem('contactMessages', JSON.stringify(messages));

      // Reload messages
      loadMessages();

      // Clear form
      nameInput.value = '';
      messageInput.value = '';
    }
  });

  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Show/hide scroll to top button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = 'flex';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });

  // Gallery Filter Functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      // Filter gallery cards
      galleryCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Gallery card hover-only functionality
  galleryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.gallery-overlay').style.opacity = '1';
    });

    card.addEventListener('mouseleave', function() {
      this.querySelector('.gallery-overlay').style.opacity = '0';
    });
  });

  // Chat with AI Functionality
  const chatToggle = document.getElementById('chat-toggle');
  const chatBox = document.getElementById('chat-box');
  const chatClose = document.getElementById('chat-close');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  // Toggle chat box
  chatToggle.addEventListener('click', function() {
    chatBox.classList.toggle('active');
  });

  // Close chat box
  chatClose.addEventListener('click', function() {
    chatBox.classList.remove('active');
  });

  // Submit chat message
  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const message = chatInput.value.trim();

    if (message) {
      // Add user message to chat
      addMessage('user', message);

      // Clear input
      chatInput.value = '';

      // Send message to API (or use mock response for now)
      sendMessage(message);
    }
  });

  // Add message to chat
  function addMessage(type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(`${type}-message`);

    let messageContent = text;
    if (type === 'user') {
      messageContent = `You: ${text}`;
    }

    messageDiv.innerHTML = `<p>${messageContent}</p>`;
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Send message to API
  async function sendMessage(message) {
    try {
      // Send message to FastURL API
      const style = "You are a friendly AI assistant for the INFORMATIKA 032 website. Be friendly, informative, and engaging.";
      const sessionId = localStorage.getItem('sessionId') || 'guest-' + Math.random().toString(36).substring(2, 10);

      if (!localStorage.getItem('sessionId')) {
        localStorage.setItem('sessionId', sessionId);
      }

      const apiUrl = `https://fastrestapis.fasturl.cloud/aillm/gpt-4o?ask=${encodeURIComponent(message)}&style=${encodeURIComponent(style)}&sessionId=${encodeURIComponent(sessionId)}`;

      // Show typing indicator
      const typingIndicator = document.createElement('div');
      typingIndicator.classList.add('ai-message', 'typing-indicator');
      typingIndicator.innerHTML = '<p>Sedang mengetik...</p>';
      chatMessages.appendChild(typingIndicator);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      const response = await axios.get(apiUrl);
      const aiResponse = response.data.result || 'Maaf, saya tidak dapat memproses permintaan Anda saat ini.';

      // Remove typing indicator
      chatMessages.removeChild(typingIndicator);

      // Add AI response
      addMessage('ai', `AI: ${aiResponse}`);
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage('ai', 'AI: Maaf, terjadi kesalahan saat menghubungi layanan AI.');
    }
  }

  // Countdown timer - Using fixed values per requirement
  function updateCountdown() {
    // Set fixed values as shown in the design
    document.getElementById('days').textContent = "241";
    document.getElementById('hours').textContent = "06";
    document.getElementById('minutes').textContent = "32";
    document.getElementById('seconds').textContent = "13";
  }

  // Initialize once
  updateCountdown();
});