import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// FAQItem component: displays each FAQ with a drop-down answer
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={styles.faqItem}>
      <button style={styles.faqButton} onClick={() => setIsOpen(!isOpen)}>
        {question}
        <span style={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div style={styles.faqAnswer}>{answer}</div>}
    </div>
  );
}

export default function FAQPage() {
  const faqs = [
    { question: 'What is diabetic retinopathy?', answer: 'It is an eye disease that results from damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina) due to diabetes.' },
    { question: 'Who is at risk?', answer: 'People with long-term diabetes, especially if blood sugar levels are poorly controlled, are at higher risk.' },
    { question: 'How is it detected?', answer: 'Detection is usually performed through a comprehensive eye exam that may include imaging tests.' },
    { question: 'What are the early signs?', answer: 'Early signs include microaneurysms, bleeding, or swelling in the retina.' },
    { question: 'Can it be treated?', answer: 'Yes, treatment options include laser surgery, injections, and vitrectomy, depending on the severity.' },
    { question: 'Why is early detection important?', answer: 'Early detection can help prevent severe vision loss and improve treatment outcomes.' },
    { question: 'How accurate is the automated detection?', answer: 'Our system uses advanced image processing and machine learning to achieve high accuracy in detecting early signs.' },
    { question: 'Is the test invasive?', answer: 'No, the test is non-invasive and simply requires an image of your eye.' },
    { question: 'How often should I get tested?', answer: 'It is recommended that individuals with diabetes have regular eye exams as advised by their healthcare provider.' },
    { question: 'Where can I learn more?', answer: 'You can contact our support team or visit our website for more information on diabetic retinopathy and available treatments.' },
  ];

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Frequently Asked Questions</h1>
        <Link to="/" style={styles.backButton}>
          Back to Home
        </Link>
      </header>
      <div style={styles.faqContainer}>
        {faqs.map((faq, idx) => (
          <FAQItem key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#EFF7ED', // light, clean background
    padding: '20px',
    fontFamily: 'system-ui, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '32px',
    color: '#33691e',
    margin: 0,
    fontWeight: 'bold',
  },
  backButton: {
    textDecoration: 'none',
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '14px',
  },
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
};
