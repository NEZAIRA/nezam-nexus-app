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
    <div className="min-h-screen bg-white">
      <div className="contact-section py-24 px-4">
        <h2 className="section-title mb-16">Contact Us</h2>
        
        <div className="contact-content max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="contact-info">
            <h3 className="text-3xl font-bold text-[#0a2540] mb-8">Get in Touch</h3>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Have questions about our products or services? Interested in partnerships or collaborations? 
              We'd love to hear from you. Reach out using the form or contact information below.
            </p>
            
            <div className="contact-details space-y-8 mb-12">
              <div className="contact-item flex items-start">
                <div className="contact-icon bg-[#00c6ff]/10 text-[#00c6ff] rounded-lg p-3 mr-4">
                  <i className="fas fa-envelope text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">contact@nezaira.com</p>
                </div>
              </div>
              
              <div className="contact-item flex items-start">
                <div className="contact-icon bg-[#00c6ff]/10 text-[#00c6ff] rounded-lg p-3 mr-4">
                  <i className="fas fa-map-marker-alt text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Location</h4>
                  <p className="text-gray-600">Global Healthcare Innovation Hub</p>
                </div>
              </div>
              
              <div className="contact-item flex items-start">
                <div className="contact-icon bg-[#00c6ff]/10 text-[#00c6ff] rounded-lg p-3 mr-4">
                  <i className="fas fa-clock text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Support Hours</h4>
                  <p className="text-gray-600">Monday - Friday: 9AM - 5PM (GMT)</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="social-icon w-12 h-12 bg-[#0a2540] text-white rounded-full flex items-center justify-center hover:bg-[#00c6ff] transition-colors">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link href="#" className="social-icon w-12 h-12 bg-[#0a2540] text-white rounded-full flex items-center justify-center hover:bg-[#00c6ff] transition-colors">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link href="#" className="social-icon w-12 h-12 bg-[#0a2540] text-white rounded-full flex items-center justify-center hover:bg-[#00c6ff] transition-colors">
                  <i className="fab fa-github"></i>
                </Link>
                <Link href="#" className="social-icon w-12 h-12 bg-[#0a2540] text-white rounded-full flex items-center justify-center hover:bg-[#00c6ff] transition-colors">
                  <i className="fab fa-youtube"></i>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <div className="form-container bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  <i className="fas fa-check-circle mr-2"></i>
                  Your message has been sent successfully! We'll get back to you soon.
                </div>
              )}
              
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c6ff] focus:border-transparent"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c6ff] focus:border-transparent"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c6ff] focus:border-transparent"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#00c6ff] hover:bg-[#00a8e8] shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300'
                  }`}
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
            
            <div className="auth-section mt-12 bg-gradient-to-r from-[#0a2540] to-[#0072ce] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Admin Access</h3>
              <div className="auth-form bg-white/10 p-6 rounded-xl mb-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your admin email"
                    className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00c6ff]"
                    defaultValue="uhansekepler@gmail.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00c6ff]"
                    defaultValue="ya*ali857"
                  />
                </div>
                <div className="flex space-x-4">
                  <button className="flex-1 px-4 py-2 bg-[#00c6ff] text-[#0a2540] font-semibold rounded-lg hover:bg-[#00a8e8] transition-colors">
                    Login
                  </button>
                  <button className="flex-1 px-4 py-2 bg-[#0072ce] text-white font-semibold rounded-lg hover:bg-[#0059a8] transition-colors">
                    Sign Up
                  </button>
                </div>
              </div>
              <p className="text-sm opacity-80">Admin credentials: uhansekepler@gmail.com / ya*ali857</p>
            </div>
            
            <div className="newsletter-section mt-12 bg-gradient-to-r from-[#0a2540] to-[#0072ce] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="mb-6 opacity-90">Subscribe to our newsletter for the latest updates on our products and research.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
                />
                <button className="px-6 py-3 bg-[#00c6ff] text-[#0a2540] font-semibold rounded-lg hover:bg-[#00a8e8] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;