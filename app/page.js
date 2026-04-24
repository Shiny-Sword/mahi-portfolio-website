import Script from "next/script";

const emailConfig = {
  serviceId: process.env.VITE_EMAILJS_SERVICE_ID || "",
  templateId: process.env.VITE_EMAILJS_TEMPLATE_ID || "",
  publicKey: process.env.VITE_EMAILJS_PUBLIC_KEY || "",
};

const pageMarkup = `
<header class="header">
    <a href="#" class="logo">Portfolio</a>
    <i class="fa-solid fa-bars" id="menu-icon"></i>
    <nav class="navbar">
        <a href="#home" class="active">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
    </nav>
</header>

<section class="home" id="home">
    <div class="home-content">
        <h3>Hi, Myself</h3>
        <h1>Mahendra Mahajan</h1>
        <h3>And I'm a <span class="multiple-text"></span></h3>
        <p>Web Developer with extensive in react js</p>
        <div class="social-media">
            <a href="https://www.instagram.com/mr.mahi_mahajan_"><i class="fa-brands fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-facebook"></i></a>
            <a href="https://www.linkedin.com/in/mahendra-mahajan-b4b2a1296"><i class="fa-brands fa-linkedin"></i></a>
            <a href="mailto:mahendramahajn3492@gmail.com"><i class="fa-solid fa-envelope"></i></a>
        </div>
        <a href="/resume/resume.pdf" class="btn" download="Mahendra-Mahajan-Resume.pdf">Download CV</a>
    </div>
    <div class="home-img">
        <img src="/images/HM438.png" alt="Mahendra Mahajan">
    </div>
</section>

<section class="about" id="about">
    <div class="about-details">
        <h2 class="heading">Personal <span>Details</span></h2><br>
        <h3>Education</h3>
        <p>Bachelor of Computer Application <br><br>Manipal University Jaipur, Rajasthan</p>
        <p>2022 &mdash; 2024</p>
    </div>
    <div class="about-content">
        <h2 class="heading">About <span>Me</span></h2>
        <h3>I am a passionate web developer...</h3>
        <p>Hello! I am Mahendra Mahajan, a passionate and dedicated Full Stack Web Developer. I recently completed my comprehensive training at Naresh Technologies Institute in Hyderabad, where I honed my skills in both front-end and back-end development. Practically every day, I spend my time experimenting with HTML, CSS, JavaScript, and React. I enjoy building everything from small business sites to rich interactive web apps using React.js. If you're looking for a developer to add to your team, I'd love to hear from you!</p>
        <a href="#" class="btn">Read more</a>
    </div>
</section>

<section class="services" id="skills">
    <h2 class="heading">Technical <span>Skills</span></h2>
    <div class="container">
        <div class="progress-card"><div class="progress-circle"><div class="progress-content"><h5 class="progText" data-count="80">0</h5></div><div class="progress"></div></div><h2>HTML</h2></div>
        <div class="progress-card"><div class="progress-circle"><div class="progress-content"><h5 class="progText" data-count="75">0</h5></div><div class="progress"></div></div><h2>CSS</h2></div>
        <div class="progress-card"><div class="progress-circle"><div class="progress-content"><h5 class="progText" data-count="60">0</h5></div><div class="progress"></div></div><h2>JavaScript</h2></div>
        <div class="progress-card"><div class="progress-circle"><div class="progress-content"><h5 class="progText" data-count="75">0</h5></div><div class="progress"></div></div><h2>Bootstrap</h2></div>
        <div class="progress-card"><div class="progress-circle"><div class="progress-content"><h5 class="progText" data-count="55">0</h5></div><div class="progress"></div></div><h2>Mongo DB</h2></div>
        <div class="progress-card"><div class="progress-circle"><div class="progress-content"><h5 class="progText" data-count="70">0</h5></div><div class="progress"></div></div><h2>React</h2></div>
        <div class="progress-card"><div class="progress-circle"><div class="progress-content"><h5 class="progText" data-count="66">0</h5></div><div class="progress"></div></div><h2>Redux</h2></div>
        <div class="progress-card"><div class="progress-circle"><div class="progress-content"><h5 class="progText" data-count="40">0</h5></div><div class="progress"></div></div><h2>Jquery</h2></div>
        <div class="progress-card"><div class="progress-circle"><div class="progress-content"><h5 class="progText" data-count="90">0</h5></div><div class="progress"></div></div><h2>Node-JS</h2></div>
        <div class="progress-card"><div class="progress-circle"><div class="progress-content"><h5 class="progText" data-count="55">0</h5></div><div class="progress"></div></div><h2>GitHub</h2></div>
    </div>
</section>

<section class="portfolio" id="portfolio">
    <h2 class="heading">Latest <span>Project</span></h2>
    <div class="portfolio-container">
        <div class="portfolio-box"><img src="/images/Screenshot 2024-08-03 010107.png" alt=""><div class="portfolio-layer"><h4>DO TO LIST</h4><p><a href="#" class="btn">Read more</a></p><i class="fa-solid fa-angles-right"></i></div></div>
        <div class="portfolio-box"><img src="/images/Daily Activity Project.png" alt=""><div class="portfolio-layer"><h4>Daily Activity Tracker</h4><p><a href="#" class="btn">Read more</a></p><i class="fa-solid fa-angles-right"></i></div></div>
        <div class="portfolio-box"><img src="/images/1.png" alt="Project 1"><div class="portfolio-layer"><h4>Project 1</h4><p><a href="#" class="btn">Read more</a></p><i class="fa-solid fa-angles-right"></i></div></div>
        <div class="portfolio-box"><img src="/images/2.png" alt="Project 2"><div class="portfolio-layer"><h4>Project 2</h4><p><a href="#" class="btn">Read more</a></p><i class="fa-solid fa-angles-right"></i></div></div>
    </div>
</section>

<section class="contact" id="contact">
    <h2 class="heading">Contact <span>Me</span></h2>
    <div class="contact-container">
        <div class="contact-info">
            <h3>Get In Touch</h3>
            <p>I'm always open to discussing new opportunities, creative projects, or just having a chat about technology!</p>
            <div class="contact-details">
                <div class="contact-item"><i class="fa-solid fa-envelope"></i><div><h4>Email</h4><p>mahendramahajn3492@gmail.com</p></div></div>
                <div class="contact-item"><i class="fa-solid fa-phone"></i><div><h4>Phone</h4><p>+91 9876543210</p></div></div>
                <div class="contact-item"><i class="fa-solid fa-location-dot"></i><div><h4>Location</h4><p>Hyderabad, India</p></div></div>
            </div>
            <div class="contact-social">
                <h4>Connect With Me</h4>
                <div class="social-links">
                    <a href="https://www.linkedin.com/in/mahendra-mahajan-b4b2a1296" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="https://www.instagram.com/mr.mahi_mahajan_" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://wa.me/919876543210" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
                    <a href="mailto:mahendramahajn3492@gmail.com"><i class="fa-solid fa-envelope"></i></a>
                </div>
            </div>
        </div>
        <form id="contact-form" class="contact-form">
            <div class="input-box">
                <input type="text" id="name" name="name" placeholder="Full Name" required>
                <input type="email" id="email" name="email" placeholder="Email Address" required>
            </div>
            <div class="input-box">
                <input type="tel" id="phone" name="phone" placeholder="Mobile Number">
                <input type="text" id="subject" name="subject" placeholder="Email Subject" required>
            </div>
            <textarea id="message" name="message" cols="30" rows="10" placeholder="Your Message" required></textarea>
            <div class="form-status" id="form-status"></div>
            <button type="submit" class="btn" id="submit-btn"><span class="btn-text">Send Message</span><span class="btn-loading"><i class="fa-solid fa-spinner fa-spin"></i> Sending...</span></button>
        </form>
    </div>
</section>

<footer class="footer">
    <div class="footer-text"><p>Copyright &copy; 2024 by Mahendra | All Rights Reserved.</p></div>
    <div class="footer-iconTop"><a href="#home"><i class="fa-solid fa-angle-up"></i></a></div>
</footer>
`;

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: pageMarkup }} />
      <Script
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        strategy="afterInteractive"
      />
      <Script id="emailjs-runtime-config" strategy="afterInteractive">
        {`window.__EMAILJS_CONFIG__ = ${JSON.stringify(emailConfig)};`}
      </Script>
      <Script src="https://unpkg.com/scrollreveal" strategy="afterInteractive" />
      <Script
        src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"
        strategy="afterInteractive"
      />
      <Script src="/main.js" strategy="afterInteractive" />
    </>
  );
}
