
/**
 * Main JavaScript for INFORMATIKA 032 Website
 * Created by: INFORMATIKA 032
 * Last updated: 2024
 */

document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const days = document.getElementById('days');
  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  const seconds = document.getElementById('seconds');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('nav');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const contactForm = document.getElementById('contact-form');
  const messagesList = document.getElementById('messages-list');
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const chatToggleBtn = document.getElementById('chat-toggle');
  const chatBox = document.getElementById('chat-box');
  const chatClose = document.getElementById('chat-close');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  // Update countdown timer
  function updateCountdown() {
    // Start date: September 9, 2024, 08:00 WIB
    const startDate = new Date('2024-09-09T08:00:00+07:00').getTime();
    const currentDate = new Date().getTime();
    const elapsedTime = currentDate - startDate;

    // Only calculate if the start date is in the past
    if (elapsedTime > 0) {
      // Convert to days, hours, minutes, seconds
      const daysValue = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
      const hoursValue = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesValue = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
      const secondsValue = Math.floor((elapsedTime % (1000 * 60)) / 1000);

      // Update DOM
      days.textContent = daysValue.toString().padStart(2, '0');
      hours.textContent = hoursValue.toString().padStart(2, '0');
      minutes.textContent = minutesValue.toString().padStart(2, '0');
      seconds.textContent = secondsValue.toString().padStart(2, '0');
    } else {
      // If the start date is in the future, show zeros
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
    }
  }

  // Theme toggler
  themeToggleBtn.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === "dark" ? "light" : "dark";
    // Save theme preference to localStorage
    localStorage.setItem('theme', document.body.dataset.theme);
  });

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.dataset.theme = savedTheme;
  }

  // Mobile nav toggle
  mobileNavToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    if (nav.classList.contains('active')) {
      // Light mode: Black X, Dark mode: White X
      const xColor = document.body.dataset.theme === "dark" ? "#FFFFFF" : "#000000";
      mobileNavToggle.innerHTML = `<i class="fas fa-times" style="color: ${xColor};"></i>`;
    } else {
      mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // Gallery filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      galleryCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.add('show');
        } else {
          card.classList.remove('show');
        }
      });
    });
  });

  // Trigger the "All" filter by default
  document.querySelector('.filter-btn[data-filter="all"]').click();

  // Contact Form Functionality
  function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    
    // Display the 3 most recent messages
    messagesList.innerHTML = '';
    const recentMessages = messages.slice(0, 3);
    
    recentMessages.forEach(message => {
      const messageCard = document.createElement('div');
      messageCard.classList.add('message-card');
      
      messageCard.innerHTML = `
        <div class="message-name">${message.name}</div>
        <div class="message-content">${message.message}</div>
        <div class="message-date">${new Date(message.date).toLocaleDateString()}</div>
      `;
      
      messagesList.appendChild(messageCard);
    });
  }
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    
    // Create new message object
    const newMessage = {
      name: name,
      message: message,
      date: new Date().toISOString()
    };
    
    // Get existing messages or initialize empty array
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    
    // Add new message to the beginning of the array
    messages.unshift(newMessage);
    
    // Save updated messages to localStorage
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Reset form
    contactForm.reset();
    
    // Reload messages display
    loadMessages();
  });
  
  // Load messages when page loads
  loadMessages();

  // Scroll to top button
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // AI Chat functionality
  chatToggleBtn.addEventListener('click', () => {
    chatBox.classList.toggle('active');
  });

  chatClose.addEventListener('click', () => {
    chatBox.classList.remove('active');
  });

  // Send message to API or use predefined response
  async function sendMessage(message) {
    // Add user message to chat
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.innerHTML = `<p>You: ${message}</p>`;
    chatMessages.appendChild(userDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Check for predefined responses first
    let predefinedResponse = null;
    if (window.AIChat && typeof window.AIChat.checkForPredefinedResponse === 'function') {
      predefinedResponse = window.AIChat.checkForPredefinedResponse(message);
    }
    
    let aiResponse;
    
    if (predefinedResponse) {
      // Use predefined response if available
      aiResponse = predefinedResponse;
    } else {
      // Add typing indicator
      const typingDiv = document.createElement('div');
      typingDiv.className = 'ai-message typing-indicator';
      typingDiv.innerHTML = '<p>AI is typing</p>';
      chatMessages.appendChild(typingDiv);
      
      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      try {
        // Send to API
        const response = await axios.post('/api/chat', {
          message: message
        });
        
        aiResponse = response.data.reply;
      } catch (error) {
        console.error('Error calling API:', error);
        aiResponse = 'Maaf, terjadi kesalahan saat menghubungi API.';
      }
      
      // Remove typing indicator
      chatMessages.removeChild(typingDiv);
    }
    
    // Add AI response
    const aiDiv = document.createElement('div');
    aiDiv.className = 'ai-message';
    aiDiv.innerHTML = `<p>${aiResponse}</p>`;
    chatMessages.appendChild(aiDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Save chat history to localStorage
    saveChatHistory(message, aiResponse);
  }

  // Save chat history to localStorage
  function saveChatHistory(userMessage, aiResponse) {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    
    // Add new messages
    chatHistory.push({
      type: 'user',
      message: userMessage,
      timestamp: new Date().toISOString()
    });
    
    chatHistory.push({
      type: 'ai',
      message: aiResponse,
      timestamp: new Date().toISOString()
    });
    
    // Keep only the last 20 messages
    const trimmedHistory = chatHistory.slice(-20);
    
    // Save to localStorage
    localStorage.setItem('chatHistory', JSON.stringify(trimmedHistory));
  }

  // Load chat history from localStorage
  function loadChatHistory() {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    
    // Clear existing messages except the first welcome message
    while (chatMessages.children.length > 1) {
      chatMessages.removeChild(chatMessages.lastChild);
    }
    
    // Add messages from history
    chatHistory.forEach(item => {
      const messageDiv = document.createElement('div');
      messageDiv.className = item.type === 'user' ? 'user-message' : 'ai-message';
      
      const prefix = item.type === 'user' ? 'You: ' : '';
      messageDiv.innerHTML = `<p>${prefix}${item.message}</p>`;
      
      chatMessages.appendChild(messageDiv);
    });
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Load chat history on page load
  loadChatHistory();

  // Handle chat form submission
  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const message = chatInput.value.trim();
    
    if (message) {
      sendMessage(message);
      chatInput.value = '';
    }
  });

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

  // Initialize and update every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
