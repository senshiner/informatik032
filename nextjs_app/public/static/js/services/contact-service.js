/**
 * Contact Service - Contact form submissions and storage
 * BACKEND_READY_POINT: When backend is ready, uncomment submitMessage() API call
 */

class ContactService {
  constructor(apiService) {
    this.apiService = apiService;
    this.storageKey = "contactMessages";
  }

  // Submit contact message and save to localStorage
  // BACKEND_READY_POINT: Uncomment API call when backend is ready
  async submitMessage(name, message) {
    if (!name || !message) {
      throw new Error("Nama dan pesan tidak boleh kosong");
    }

    try {
      // Create message object
      const newMessage = {
        name: name.trim(),
        text: message.trim(),
        date: new Date().toLocaleDateString("id-ID"),
        timestamp: new Date().toISOString(),
      };

      // Save to localStorage (local persistence)
      this._saveToLocalStorage(newMessage);

      // BACKEND_READY_POINT: Uncomment when backend is ready to receive contact submissions
      // try {
      //   await this.apiService.post('/api/contact', newMessage);
      //   console.log('Message sent to backend');
      // } catch (error) {
      //   console.warn('Failed to send to backend, using local storage only:', error);
      // }

      return {
        success: true,
        message: "Pesan berhasil disimpan",
        data: newMessage,
      };
    } catch (error) {
      console.error("Error submitting message:", error);
      throw error;
    }
  }

  _saveToLocalStorage(message) {
    const messages = this.getMessages();
    messages.unshift(message);
    localStorage.setItem(this.storageKey, JSON.stringify(messages));
  }

  getMessages(limit = null) {
    try {
      const messages = JSON.parse(localStorage.getItem(this.storageKey)) || [];
      return limit ? messages.slice(0, limit) : messages;
    } catch (error) {
      console.error("Error retrieving messages:", error);
      return [];
    }
  }

  getRecentMessages(count = 3) {
    return this.getMessages(count);
  }
}

// Export as global for use in script.js
window.ContactService = ContactService;
