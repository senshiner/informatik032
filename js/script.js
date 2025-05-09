// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
  }

  // Handle theme toggle click
  themeToggleBtn.addEventListener('click', function() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('nav');

  mobileNavToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    this.classList.toggle('active');
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: 'smooth'
      });

      // Close mobile nav if open
      nav.classList.remove('active');
      mobileNavToggle.classList.remove('active');
    });
  });

  // Scroll to top button
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Gallery filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      // Show/hide gallery cards based on filter
      galleryCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  const messagesList = document.getElementById('messages-list');

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (name && message) {
      const newMessage = {
        name: name,
        message: message,
        date: new Date().toLocaleString()
      };

      try {
        // Simpan pesan ke database
        await saveMessageToDB(newMessage);

        // Add message to DOM untuk tampilan cepat
        addMessageToDOM(newMessage);

        // Clear form
        nameInput.value = '';
        messageInput.value = '';

        // Reload messages from DB untuk mendapatkan ID dan timestamp yang tepat
        setTimeout(loadMessagesFromDB, 500);
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Error sending message. Please try again.');
      }
    }
  });

  // Functions for message history
  function addMessageToDOM(messageObj) {
    const messageCard = document.createElement('div');
    messageCard.className = 'message-card';

    messageCard.innerHTML = `
      <div class="message-header">
        <span class="message-name">${messageObj.name}</span>
        <span class="message-date">${messageObj.created_at ? new Date(messageObj.created_at).toLocaleString() : messageObj.date}</span>
      </div>
      <div class="message-text">${messageObj.message}</div>
    `;

    messagesList.prepend(messageCard);
  }

  async function saveMessageToDB(messageObj) {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: messageObj.name,
          message: messageObj.message
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save message');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving message to database:', error);
      // Fallback ke localStorage jika database gagal
      saveMessageToLocalStorage(messageObj);
    }
  }

  function saveMessageToLocalStorage(messageObj) {
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.unshift(messageObj);

    // Limit to 10 messages
    if (messages.length > 10) {
      messages = messages.slice(0, 10);
    }

    localStorage.setItem('contactMessages', JSON.stringify(messages));
  }

  async function loadMessagesFromDB() {
    try {
      // Kosongkan daftar pesan terlebih dahulu
      messagesList.innerHTML = '';

      const response = await fetch('/api/messages');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();

      if (data.messages && Array.isArray(data.messages)) {
        data.messages.forEach(message => {
          addMessageToDOM(message);
        });
      }
    } catch (error) {
      console.error('Error loading messages from database:', error);
      // Fallback ke localStorage jika database gagal
      loadMessagesFromLocalStorage();
    }
  }

  function loadMessagesFromLocalStorage() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.forEach(message => {
      addMessageToDOM(message);
    });
  }

  // Load messages from database
  loadMessagesFromDB();

  // Countdown functionality
  function updateCountdown() {
    // Set the start date
    const startDate = new Date('September 9, 2024 08:00:00 GMT+0700').getTime();
    const currentDate = new Date().getTime();

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

  // Toggle chat box
  chatToggle.addEventListener('click', () => {
    chatBox.classList.toggle('active');
    // Load chat history when opening chat
    if (chatBox.classList.contains('active')) {
      loadChatHistory();
    }
  });

  // Close chat box
  chatClose.addEventListener('click', () => {
    chatBox.classList.remove('active');
  });

  // Send message
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = chatInput.value.trim();
    if (message === '') return;

    // Clear input
    chatInput.value = '';

    // Display user message
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'user-message';
    userMessageElement.innerHTML = `<p>You: ${message}</p>`;
    chatMessages.appendChild(userMessageElement);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Check for predefined response first
    const predefinedResponse = window.AIChat && window.AIChat.checkForPredefinedResponse ? 
      window.AIChat.checkForPredefinedResponse(message) : null;

    if (predefinedResponse) {
      // Display AI response (with typing effect)
      setTimeout(() => {
        const aiMessageElement = document.createElement('div');
        aiMessageElement.className = 'ai-message';
        aiMessageElement.innerHTML = `<p>AI: ${predefinedResponse}</p>`;
        chatMessages.appendChild(aiMessageElement);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Save chat history
        saveChatMessage('user', `You: ${message}`);
        saveChatMessage('ai', `AI: ${predefinedResponse}`);
      }, 500);
    } else {
      // Add typing indicator
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'typing-indicator';
      typingIndicator.innerHTML = '<p>AI is typing...</p>';
      chatMessages.appendChild(typingIndicator);

      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;

      try {
        // Use simple fallback when API is not available
        setTimeout(() => {
          // Remove typing indicator
          chatMessages.removeChild(typingIndicator);

          // Display generic AI response
          const aiResponse = 'AI: Maaf, saya belum dilatih untuk menjawab pertanyaan ini. Silakan tanyakan hal lain atau hubungi admin.';
          const aiMessageElement = document.createElement('div');
          aiMessageElement.className = 'ai-message';
          aiMessageElement.innerHTML = `<p>${aiResponse}</p>`;
          chatMessages.appendChild(aiMessageElement);

          // Scroll to bottom
          chatMessages.scrollTop = chatMessages.scrollHeight;

          // Save chat history
          saveChatMessage('user', `You: ${message}`);
          saveChatMessage('ai', aiResponse);
        }, 1000);

        // Save chat history
        saveChatMessage('user', `You: ${message}`);
        saveChatMessage('ai', aiResponse);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  });

  // Save chat message
  function saveChatMessage(type, message) {
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.push({ type, message });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }

  // Load chat history
  function loadChatHistory() {
    chatMessages.innerHTML = '';
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.forEach(chat => {
      const messageElement = document.createElement('div');
      messageElement.className = chat.type === 'user' ? 'user-message' : 'ai-message';
      messageElement.innerHTML = `<p>${chat.message}</p>`;
      chatMessages.appendChild(messageElement);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});