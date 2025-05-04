import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Navbar Component
function Navbar({ onAboutUsClick }) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const navItems = [
    { label: 'Home', link: '/' },
    { label: 'About Us', link: null }, // onAboutUsClick triggers modal
  ];

  return (
    <nav style={styles.navbar}>
      <div style={styles.navBrand}>Diabetic Retinopathy Detection</div>
      <div style={styles.navLinks}>
        {navItems.map((item, index) => {
          const isHovered = hoverIndex === index;
          const linkStyle = isHovered
            ? { ...styles.navLink, ...styles.navLinkHover }
            : styles.navLink;
          if (item.label === 'About Us') {
            return (
              <button
                key={item.label}
                onClick={onAboutUsClick}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                style={linkStyle}
              >
                {item.label}
              </button>
            );
          }
          return (
            <Link
              key={item.label}
              to={item.link}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              style={linkStyle}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// About Us Modal Component
function AboutUsModal({ onClose }) {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.modalHeading}>About Us</h2>
        <p style={styles.modalText}>
          Learn more about our team and our work. Download our PDFs below:
        </p>
        <ul style={styles.pdfList}>
          <li>
            <a
              href="/debasis_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.pdfLink}
            >
              DEBASIS MAJI
            </a>
          </li>
          <li>
            <a
              href="/Gautam.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.pdfLink}
            >
              Dr. Gautam Sarkar
            </a>
          </li>
        </ul>
        <button onClick={onClose} style={styles.modalCloseButton}>
          Close
        </button>
      </div>
    </div>
  );
}

// FAQ Modal Component
function FAQModal({ onClose }) {
  const faqs = [
    {
      question: 'What is diabetic retinopathy?',
      answer:
        'It is an eye disease caused by damage to the retina’s blood vessels due to diabetes.',
    },
    {
      question: 'Who is at risk?',
      answer:
        'Individuals with long-term diabetes, especially with poor blood sugar control, are at higher risk.',
    },
    {
      question: 'How is it detected?',
      answer:
        'Detection is performed through comprehensive eye exams, including retinal imaging.',
    },
    {
      question: 'What are the early signs?',
      answer:
        'Early signs include microaneurysms, retinal hemorrhages, and exudates.',
    },
    {
      question: 'Can it be treated?',
      answer:
        'Yes. Treatment options include laser therapy, injections, and surgery depending on the stage.',
    },
    {
      question: 'Why is early detection important?',
      answer:
        'Early detection allows timely treatment, helping to prevent or slow vision loss.',
    },
    {
      question: 'How accurate is the automated detection?',
      answer:
        'Our system uses advanced algorithms to achieve high accuracy in detecting early signs.',
    },
    {
      question: 'Is the test invasive?',
      answer:
        'No, the test is non-invasive and simply requires capturing an image of your eye.',
    },
    {
      question: 'How often should I get tested?',
      answer:
        'It is recommended that individuals with diabetes have regular eye exams as advised by their doctor.',
    },
    {
      question: 'Where can I learn more?',
      answer:
        'You can contact our support team or visit our website for additional information.',
    },
  ];

  // FAQItem Component inside FAQModal
  function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={styles.faqItem}>
        <button
          style={styles.faqButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          {question}
          <span style={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
        </button>
        {isOpen && <div style={styles.faqAnswer}>{answer}</div>}
      </div>
    );
  }

  return (
    <div style={styles.faqModalOverlay}>
      <div style={styles.faqModalContent}>
        <h2 style={styles.modalHeading}>Frequently Asked Questions</h2>
        <div style={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
        <button onClick={onClose} style={styles.modalCloseButton}>
          Close
        </button>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);

  return (
    <div style={styles.pageContainer}>
      {/* Navbar */}
      <Navbar onAboutUsClick={() => setShowAboutUs(true)} />

      {/* Main Content (Hero Section) */}
      <main style={styles.heroSection}>
        <div style={styles.leftContent}>
          <h2 style={styles.mainHeading}>
            Stop blindness before it's too late
          </h2>
          <Link to="/test" style={styles.heroButton}>
            Take Your Eye Test
          </Link>
        </div>
        <div style={styles.rightImageContainer}>
          <img src="/eye_project.jpg" alt="Eye" style={styles.heroImage} />
        </div>
      </main>

      {/* Our Work Section */}
      {/* <style>margin:1400px auto;</style> */}
      <section style={styles.ourWorkSection}>
        <h2 style={styles.ourWorkHeading}>
          <u>Our Work</u>
        </h2>
        <p style={styles.ourWorkText}>
          We are dedicated to research and innovation in diabetic retinopathy detection.
          Our work includes advanced image analysis, clinical studies, and collaboration with healthcare
          professionals to develop early detection and prevention solutions.
        </p>
        <div style={styles.ourWorkContent}>
          <div style={styles.ourWorkItem}>
            <img src="/w1.jpg" alt="Work 1" style={styles.workImage} />
            <p style={styles.workCaption}>Clinical Testing</p>
          </div>
          <div style={styles.ourWorkItem}>
            <img src="/w2.jpg" alt="Work 2" style={styles.workImage} />
            <p style={styles.workCaption}></p>
          </div>
          <div style={styles.ourWorkItem}>
            <a
              href="/w3.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.pdfLink}
            >
              <img src="/w4.png" alt="PDF" style={styles.pdfIcon} />
              <p style={styles.workCaption}>
                Download Earlier detection model results
              </p>
            </a>
            <a
              href="/research.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.pdfLink}
            >
              <img src="/pdf_logo.png" alt="PDF" style={styles.pdfIcon} />
              <p style={styles.workCaption}>
                Our Research
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Know More Button Section (triggers FAQ modal) */}
      <section style={styles.knowMoreSection}>
        <button
          onClick={() => setShowFAQModal(true)}
          style={styles.knowMoreButton}
        >
          Know More?
        </button>
      </section>

      {/* Footer Section (Contact Us Only) */}
      <footer style={styles.footer}>
        <div style={styles.footerColumn}>
          <h3 style={styles.footerHeading}>
            <u>Contact Us</u>
          </h3>
          <p style={styles.footerText}>Email: info@example.com</p>
          <p style={styles.footerText}>Phone: +1234567890</p>
        </div>
      </footer>

      {/* Conditionally render modals */}
      {showAboutUs && <AboutUsModal onClose={() => setShowAboutUs(false)} />}
      {showFAQModal && <FAQModal onClose={() => setShowFAQModal(false)} />}
    </div>
  );
}

const styles = {
  pageContainer: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: 'rgb(201 237 180)', // bright green color
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'system-ui, sans-serif',
    margin: 0,
    padding: 0,
  },
  /* Navbar */
  navbar: {
    width:'92.6vw',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgb(27 33 4 / 100%)',
    padding: '10px 40px',
    marginBottom: '20px',
    border: '2px solid #444',
   
  },
  navBrand: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
  },
  navLinkHover: {
    backgroundColor: '#555',
  },
  /* Hero Section */
  heroSection: {
    flex: 1,
    padding: '58px 40px', // using 58px as requested
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: '0 0 50%',
    minWidth: '280px',
  },
  mainHeading: {
    fontSize: '32px',
    color: '#333',
    margin: '0 0 20px 0',
    maxWidth: '400px',
    fontWeight: 'bold',
    lineHeight: 1.3,
  },
  heroButton: {
    display: 'inline-block',
    textDecoration: 'none',
    backgroundColor: '#333',
    color: '#fff',
    padding: '14px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
  },
  rightImageContainer: {
    flex: '0 0 40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '280px',
    marginTop: '20px',
  },
  heroImage: {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  // Our Work Section
  ourWorkSection: {
    padding: '60px 40px',
    background: 'linear-gradient(135deg, #EFF7ED, #D4EAD7)',
    minHeight: '400px',
  },
  ourWorkHeading: {
    fontSize: '28px',
    color: '#33691e',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  ourWorkText: {
    fontSize: '16px',
    color: '#424242',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto 40px',
    lineHeight: 1.6,
  },
  ourWorkContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  ourWorkItem: {
    flex: '1 1 250px',
    maxWidth: '300px',
    textAlign: 'center',
  },
  workImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  workCaption: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#33691e',
  },
  pdfLink: {
    textDecoration: 'none',
    color: '#33691e',
  },
  pdfIcon: {
    width: '100px',
    height: 'auto',
    margin: '0 auto',
    display: 'block',
  },
  // Know More Section
  knowMoreSection: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  knowMoreButton: {
    textDecoration: 'none',
    backgroundColor: '#333',
    color: '#fff',
    padding: '14px 28px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
    border: 'none',
    cursor: 'pointer',
  },
  // Footer Section (Contact Us Only)
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 40px',
  },
  footerColumn: {
    maxWidth: '300px',
    textAlign: 'center',
  },
  footerHeading: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  footerText: {
    fontSize: '14px',
    lineHeight: 1.6,
  },
  // About Us Modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '90%',
    textAlign: 'center',
  },
  modalHeading: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
  },
  modalText: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#424242',
  },
  pdfList: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '20px',
  },
  // FAQ Modal Styles
  faqContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  faqItem: {
    marginBottom: '16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  faqButton: {
    width: '100%',
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: '16px',
    fontWeight: '600',
    background: '#f9f9f9',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    marginLeft: '8px',
    fontSize: '18px',
  },
  faqAnswer: {
    padding: '16px',
    fontSize: '14px',
    background: '#fff',
    color: '#666',
    lineHeight: 1.6,
  },
  faqModalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  faqModalContent: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '90%',
    textAlign: 'center',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
};
