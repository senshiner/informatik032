// Theme toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const savedTheme = localStorage.getItem('theme') || 'light';
  
    // Set theme
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
  
    // Close mobile nav
    const navLinks = document.querySelectorAll('nav ul li a');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  
    // Timer
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
  
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
  
    // Update timer
    updateTimer();
    setInterval(updateTimer, 1000);
  
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
  
        const targetId = this.getAttribute('href');
  
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
  
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const messagesList = document.getElementById('messages-list');
  
    // Load messages from localStorage
    function loadMessages() {
      const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
  
      // Display recent messages
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
  
    // Load messages
    loadMessages();
  
    // Submit form handler
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
  
      const nameInput = document.getElementById('name');
      const messageInput = document.getElementById('message');
  
      const name = nameInput.value.trim();
      const message = messageInput.value.trim();
  
      if (name && message) {
        // Create new message
        const newMessage = {
          name: name,
          text: message,
          date: new Date().toLocaleDateString()
        };
  
        const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
  
        messages.unshift(newMessage);
  
        localStorage.setItem('contactMessages', JSON.stringify(messages));
  
        // Reload messages
        loadMessages();
  
        // Clear form
        nameInput.value = '';
        messageInput.value = '';
      }
    });
  
    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');
  
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
  
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
    
    // Gallery card hover
    galleryCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.querySelector('.gallery-overlay').style.opacity = '1';
      });
      
      card.addEventListener('mouseleave', function() {
        this.querySelector('.gallery-overlay').style.opacity = '0';
      });
    });
  
    // Chat with AI
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
  
        // Send message to API
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
  
      // Send message to API or use predefined response
    async function sendMessage(message) {
      try {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('ai-message', 'typing-indicator');
        typingIndicator.innerHTML = '<p>AI sedang mengetik...</p>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        const predefinedResponse = window.AIChat.checkForPredefinedResponse(message);

        let aiResponse;

        if (predefinedResponse) {
          await new Promise(resolve => setTimeout(resolve, 500));
          aiResponse = predefinedResponse;
        } else {
          const logic = `Anda adalah asisten AI ramah dan profesional untuk website INFORMATIKA 032. 
          Bersikaplah sopan, informatif, dan menarik. Jawab dengan bahasa Indonesia yang mudah dipahami. 
          Jika ditanya soal dosen atau kalender akademik, arahkan ke website resmi Universitas Pamulang.`;

          const sessionId = localStorage.getItem('sessionId') || 'guest-' + Math.random().toString(36).substring(2, 10);
          if (!localStorage.getItem('sessionId')) {
            localStorage.setItem('sessionId', sessionId);
          }

          const apiUrl = '/api/chat';
          const response = await axios.post(apiUrl, {
            text: message,
            logic: logic,
            sessionId: sessionId
          });

          aiResponse = response.data.reply || 'Maaf, saya tidak dapat memproses permintaan Anda.';
        }

        chatMessages.removeChild(typingIndicator);
        addMessage('ai', `AI: ${aiResponse}`);
      } catch (error) {
        console.error('Error sending message:', error);
        addMessage('ai', 'AI: Maaf, terjadi kesalahan saat menghubungi layanan AI.');
      }
    }
  
    // Countdown timer
    function updateCountdown() {
      const startDate = new Date('2024-09-09T08:00:00').getTime();
      const now = new Date().getTime();
      
      const elapsedTime = now - startDate;
      
      if (elapsedTime < 0) {
        document.getElementById('days').textContent = "000";
        document.getElementById('hours').textContent = "00";
        document.getElementById('minutes').textContent = "00";
        document.getElementById('seconds').textContent = "00";
        return;
      }
      
      // Calculate days, hours, minutes, seconds
      const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
      
      // Display
      document.getElementById('days').textContent = days < 100 ? 
        (days < 10 ? `00${days}` : `0${days}`) : days;
      document.getElementById('hours').textContent = hours < 10 ? `0${hours}` : hours;
      document.getElementById('minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
      document.getElementById('seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
    }
  
    updateCountdown();
    setInterval(updateCountdown, 1000);
  });