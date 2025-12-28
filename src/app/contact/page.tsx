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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-white">Contact Us</h2>
        
        <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="contact-info">
            <h3 className="text-3xl font-bold text-white mb-6">Get in Touch</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Have questions about our products or services? Interested in partnerships or collaborations? 
              We'd love to hear from you. Reach out using the form or contact information below.
            </p>
            
            <div className="contact-details space-y-6 mb-8">
              <div className="contact-item flex items-start p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                <div className="contact-icon text-cyan-400 text-2xl mr-4">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                  <p className="text-gray-300">contact@nezaira.com</p>
                </div>
              </div>
              
              <div className="contact-item flex items-start p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                <div className="contact-icon text-cyan-400 text-2xl mr-4">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Location</h4>
                  <p className="text-gray-300">Global Healthcare Innovation Hub</p>
                </div>
              </div>
              
              <div className="contact-item flex items-start p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                <div className="contact-icon text-cyan-400 text-2xl mr-4">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Support Hours</h4>
                  <p className="text-gray-300">Monday - Friday: 9AM - 5PM (GMT)</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              <h4 className="text-xl font-semibold text-white mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link href="#" className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link href="#" className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                  <i className="fab fa-github"></i>
                </Link>
                <Link href="#" className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                  <i className="fab fa-youtube"></i>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h3 className="text-3xl font-bold text-white mb-6">Send us a message</h3>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30 flex items-center">
                <i className="fas fa-check-circle mr-3"></i>
                Your message has been sent successfully! We'll get back to you soon.
              </div>
            )}
            
            {submitError && (
              <div className="mb-6 p-4 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30 flex items-center">
                <i className="fas fa-exclamation-circle mr-3"></i>
                {submitError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-gray-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-gray-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Your message here..."
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-gray-500"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Sending...
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