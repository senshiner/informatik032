import Head from "next/head";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>INFORMATIKA 032</title>
      </Head>

      <main>
        {/* Exact body structure copied from original index.html (JSX with className) */}
        <header>
          <div className="logo">
            <h1>INFORMATIKA 032</h1>
          </div>
          <div className="theme-toggle">
            <button id="theme-toggle-btn">
              <i className="fas fa-sun"></i>
              <i className="fas fa-moon"></i>
            </button>
          </div>
          <nav>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
          <div className="mobile-nav-toggle">
            <i className="fas fa-bars"></i>
          </div>
        </header>

        <section id="home" className="hero jumbotron text-center">
          <div className="container">
            <div className="logo-circle-container">
              <div className="logo-circle">
                <img src="/static/img/hha.jpeg" alt="Informatika Logo" className="hero-logo" />
              </div>
            </div>

            <div className="motto-container">
              <h2 className="motto" title="Melalui teknologi, kami mengatur alam semesta.">
                "Perteknologia Nose Universum Regimus"
              </h2>
            </div>

            <div className="countdown-container">
              <div className="countdown-card">
                <div className="timer-header">Terjebak dalam Kelas</div>
                <div className="timer-body">
                  <div className="timer-grid">
                    <div className="time-block">
                      <span id="days">241</span>
                      <span className="time-label">DAYS</span>
                    </div>
                    <div className="time-block">
                      <span id="hours">06</span>
                      <span className="time-label">HRS</span>
                    </div>
                    <div className="time-block">
                      <span id="minutes">32</span>
                      <span className="time-label">MIN</span>
                    </div>
                    <div className="time-block">
                      <span id="seconds">13</span>
                      <span className="time-label">SEC</span>
                    </div>
                  </div>
                  <div className="countdown-start">Dimulai sejak 9 September 2024</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="container">
            <h2 className="section-title">About</h2>
            <div className="about-card">
              <div className="about-card-content">
                <p className="about-text">Website tehnik informatika 032 Universitas Pamulang. Kami membangun masa depan dengan kode, kreativitas, dan kolaborasi.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="gallery">
          <div className="container">
            <h2 className="section-title">Gallery</h2>
            <div className="gallery-filter">
              <button className="filter-btn active" data-filter="all">
                All
              </button>
              <button className="filter-btn" data-filter="class">
                Class
              </button>
              <button className="filter-btn" data-filter="event">
                Random Event
              </button>
              <button className="filter-btn" data-filter="sports">
                Sports
              </button>
            </div>

            <div className="gallery-grid-container">
              <div className="gallery-card" data-category="class">
                <div className="gallery-image">
                  <img
                    src="/static/img/gallery/class1.webp"
                    alt="Outbound"
                    onError={(e) => {
                      e.target.src = "/static/img/placeholder.png";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-title">Outbound</div>
                  </div>
                </div>
                <div className="gallery-info">
                  <h3>Outbound</h3>
                </div>
              </div>

              <div className="gallery-card" data-category="class">
                <div className="gallery-image">
                  <img
                    src="/static/img/gallery/class2.webp"
                    alt="Class 2"
                    onError={(e) => {
                      e.target.src = "/static/img/placeholder.png";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-title">Classroom</div>
                  </div>
                </div>
                <div className="gallery-info">
                  <h3>Classroom</h3>
                </div>
              </div>

              <div className="gallery-card" data-category="class">
                <div className="gallery-image">
                  <img
                    src="/static/img/gallery/class3.webp"
                    alt="Class 3"
                    onError={(e) => {
                      e.target.src = "/static/img/placeholder.png";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-title">Workshop</div>
                  </div>
                </div>
                <div className="gallery-info">
                  <h3>Workshop</h3>
                </div>
              </div>

              <div className="gallery-card" data-category="event">
                <div className="gallery-image">
                  <img
                    src="/static/img/gallery/event1.webp"
                    alt="Event 1"
                    onError={(e) => {
                      e.target.src = "/static/img/placeholder.png";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-title">Seminar</div>
                  </div>
                </div>
                <div className="gallery-info">
                  <h3>Seminar</h3>
                </div>
              </div>

              <div className="gallery-card" data-category="event">
                <div className="gallery-image">
                  <img
                    src="/static/img/gallery/event2.webp"
                    alt="Event 2"
                    onError={(e) => {
                      e.target.src = "/static/img/placeholder.png";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-title">Hackathon</div>
                  </div>
                </div>
                <div className="gallery-info">
                  <h3>Hackathon</h3>
                </div>
              </div>

              <div className="gallery-card" data-category="event">
                <div className="gallery-image">
                  <img
                    src="/static/img/gallery/event3.webp"
                    alt="Event 3"
                    onError={(e) => {
                      e.target.src = "/static/img/placeholder.png";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-title">Conference</div>
                  </div>
                </div>
                <div className="gallery-info">
                  <h3>Conference</h3>
                </div>
              </div>

              <div className="gallery-card" data-category="sports">
                <div className="gallery-image">
                  <img
                    src="/static/img/gallery/sports1.webp"
                    alt="Sports 1"
                    onError={(e) => {
                      e.target.src = "/static/img/placeholder.png";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-title">Football</div>
                  </div>
                </div>
                <div className="gallery-info">
                  <h3>Football</h3>
                </div>
              </div>

              <div className="gallery-card" data-category="sports">
                <div className="gallery-image">
                  <img
                    src="/static/img/gallery/sports2.webp"
                    alt="Sports 2"
                    onError={(e) => {
                      e.target.src = "/static/img/placeholder.png";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-title">Basketball</div>
                  </div>
                </div>
                <div className="gallery-info">
                  <h3>Basketball</h3>
                </div>
              </div>

              <div className="gallery-card" data-category="sports">
                <div className="gallery-image">
                  <img
                    src="/static/img/gallery/sports3.webp"
                    alt="Sports 3"
                    onError={(e) => {
                      e.target.src = "/static/img/placeholder.png";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-title">Volleyball</div>
                  </div>
                </div>
                <div className="gallery-info">
                  <h3>Volleyball</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="apps" className="apps">
          <div className="container">
            <h2 className="section-title">Apps</h2>
            <div className="apps-grid">
              <div className="app-card">
                <div className="app-icon">
                  <i className="fas fa-file-pdf"></i>
                </div>
                <h3>Image to PDF</h3>
                <p>Konversi gambar Anda ke format PDF dengan mudah dan cepat.</p>
                <a href="https://my-pdf-iota.vercel.app" className="app-button">
                  Visit
                </a>
              </div>
              <div className="app-card">
                <div className="app-icon">
                  <i className="fas fa-sticky-note"></i>
                </div>
                <h3>Todo List</h3>
                <p>Simpan dan atur tujuan Anda dengan sistem yang terorganisir.</p>
                <a href="https://todolistneo.netlify.app" className="app-button">
                  Visit
                </a>
              </div>
              <div className="app-card">
                <div className="app-icon">
                  <i className="fas fa-comment-alt"></i>
                </div>
                <h3>Menfess</h3>
                <p>Bagikan pesan anonim Anda ke instagram kelas.</p>
                <a href="#" className="app-button">
                  Visit
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container">
            <h2 className="section-title">Connect with Us</h2>
            <div className="social-icons">
              <a href="https://www.instagram.com/informatics032" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-discord"></i>
              </a>
            </div>

            <div className="contact-form-container">
              <form id="contact-form" className="contact-form">
                <div className="form-group">
                  <input type="text" id="name" placeholder="Nama Anda" required />
                </div>
                <div className="form-group">
                  <textarea id="message" placeholder="Pesan Anda" required></textarea>
                </div>
                <button type="submit" className="submit-button">
                  Send
                </button>
              </form>

              <div className="messages-container">
                <h3>Recent Messages</h3>
                <div id="messages-list" className="messages-list"></div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <p>© 2025| Created by Senshiner</p>
          </div>
        </footer>

        <div className="chat-container">
          <button id="chat-toggle" className="chat-toggle">
            <i className="fas fa-comment-dots"></i>
          </button>
          <div id="chat-box" className="chat-box">
            <div className="chat-header">
              <h3>Chat with AI</h3>
              <button id="chat-close" className="chat-close">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div id="chat-messages" className="chat-messages">
              <div className="ai-message">
                <p>AI: Halo, ada yang akan di tanyakan seputar web ini? atau hal lain yang ingin di bantu?</p>
              </div>
            </div>
            <form id="chat-form" className="chat-form">
              <input type="text" id="chat-input" placeholder="Ketik pesan Anda..." />
              <button type="submit">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Load external scripts and original service/UI scripts in same order */}
      <Script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/static/js/services/config.js" strategy="afterInteractive" />
      <Script src="/static/js/services/api-service.js" strategy="afterInteractive" />
      <Script src="/static/js/services/chat-service.js" strategy="afterInteractive" />
      <Script src="/static/js/services/contact-service.js" strategy="afterInteractive" />
      <Script src="/static/js/script.js" strategy="afterInteractive" />
    </>
  );
}
