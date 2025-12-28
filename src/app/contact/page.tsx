'use client';

import Link from 'next/link';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would send the form data to your backend here
      console.log('Form submitted:', formData);
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-section">
      <div className="container mx-auto px-4">
        <h2>Contact Us</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>
              Have questions about our products or services? Interested in partnerships or collaborations? 
              We'd love to hear from you. Reach out using the form or contact information below.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>contact@nezaira.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Global Healthcare Innovation Hub</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h4>Support Hours</h4>
                  <p>Monday - Friday: 9AM - 5PM (GMT)</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              <h4>Connect With Us</h4>
              <div>
                <Link href="#">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link href="#">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link href="#">
                  <i className="fab fa-github"></i>
                </Link>
                <Link href="#">
                  <i className="fab fa-youtube"></i>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Send us a message</h3>
            
            {submitSuccess && (
              <div>
                <i className="fas fa-check-circle"></i>
                Your message has been sent successfully! We'll get back to you soon.
              </div>
            )}
            
            {submitError && (
              <div>
                <i className="fas fa-exclamation-circle"></i>
                {submitError}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;