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
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] to-[#0c1e35]">
      <div className="contact-section py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-4xl font-bold text-center mb-16 gradient-text">Contact Us</h2>
          
          <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="contact-info">
              <h3 className="text-3xl font-bold text-white mb-8">Get in Touch</h3>
              <p className="text-gray-400 mb-10 leading-relaxed">
                Have questions about our products or services? Interested in partnerships or collaborations? 
                We'd love to hear from you. Reach out using the form or contact information below.
              </p>
              
              <div className="contact-details space-y-8 mb-12">
                <div className="contact-item flex items-start">
                  <div className="contact-icon glass-effect p-3 mr-4 rounded-lg">
                    <i className="fas fa-envelope text-xl text-[#00c6ff]"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Email</h4>
                    <p className="text-gray-400">contact@nezaira.com</p>
                  </div>
                </div>
                
                <div className="contact-item flex items-start">
                  <div className="contact-icon glass-effect p-3 mr-4 rounded-lg">
                    <i className="fas fa-map-marker-alt text-xl text-[#00c6ff]"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Location</h4>
                    <p className="text-gray-400">Global Healthcare Innovation Hub</p>
                  </div>
                </div>
                
                <div className="contact-item flex items-start">
                  <div className="contact-icon glass-effect p-3 mr-4 rounded-lg">
                    <i className="fas fa-clock text-xl text-[#00c6ff]"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Support Hours</h4>
                    <p className="text-gray-400">Monday - Friday: 9AM - 5PM (GMT)</p>
                  </div>
                </div>
              </div>
              
              <div className="social-links">
                <h4 className="text-xl font-semibold text-white mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <Link href="#" className="social-icon w-12 h-12 glass-effect flex items-center justify-center text-[#00c6ff] hover:text-white transition-colors">
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link href="#" className="social-icon w-12 h-12 glass-effect flex items-center justify-center text-[#00c6ff] hover:text-white transition-colors">
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                  <Link href="#" className="social-icon w-12 h-12 glass-effect flex items-center justify-center text-[#00c6ff] hover:text-white transition-colors">
                    <i className="fab fa-github"></i>
                  </Link>
                  <Link href="#" className="social-icon w-12 h-12 glass-effect flex items-center justify-center text-[#00c6ff] hover:text-white transition-colors">
                    <i className="fab fa-youtube"></i>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <div className="glass-effect rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
                
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30">
                    <i className="fas fa-check-circle mr-2"></i>
                    Your message has been sent successfully! We'll get back to you soon.
                  </div>
                )}
                
                {submitError && (
                  <div className="mb-6 p-4 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    {submitError}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-300 font-medium mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0a2540]/50 border border-[#00c6ff]/30 rounded-lg focus:outline-none focus:border-[#00c6ff] text-white placeholder-gray-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-300 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0a2540]/50 border border-[#00c6ff]/30 rounded-lg focus:outline-none focus:border-[#00c6ff] text-white placeholder-gray-500"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-300 font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-[#0a2540]/50 border border-[#00c6ff]/30 rounded-lg focus:outline-none focus:border-[#00c6ff] text-white placeholder-gray-500"
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      isSubmitting 
                        ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
                        : 'futuristic-btn bg-[#00c6ff] text-[#0a2540] font-bold hover:bg-[#00a8e8]'
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
            </div>
            
            <div className="auth-section mt-12 glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Admin Access</h3>
              <div className="auth-form bg-[#0a2540]/30 p-6 rounded-xl mb-6">
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your admin email"
                    className="w-full px-4 py-2 bg-[#0a2540]/50 border border-[#00c6ff]/30 rounded-lg focus:outline-none focus:border-[#00c6ff] text-white placeholder-gray-500"
                    defaultValue="uhansekepler@gmail.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 bg-[#0a2540]/50 border border-[#00c6ff]/30 rounded-lg focus:outline-none focus:border-[#00c6ff] text-white placeholder-gray-500"
                    defaultValue="ya*ali857"
                  />
                </div>
                <div className="flex space-x-4">
                  <button className="flex-1 futuristic-btn px-4 py-2 bg-[#00c6ff] text-[#0a2540] font-bold rounded-lg hover:bg-[#00a8e8] transition-all">
                    Login
                  </button>
                  <button className="flex-1 futuristic-btn px-4 py-2 bg-[#0072ce] text-white font-bold rounded-lg hover:bg-[#0059a8] transition-all">
                    Sign Up
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-400">Admin credentials: uhansekepler@gmail.com / ya*ali857</p>
            </div>
            
            <div className="newsletter-section mt-12 glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-6">Subscribe to our newsletter for the latest updates on our products and research.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 bg-[#0a2540]/50 border border-[#00c6ff]/30 rounded-lg focus:outline-none focus:border-[#00c6ff] text-white placeholder-gray-500"
                />
                <button className="px-6 py-3 futuristic-btn bg-[#00c6ff] text-[#0a2540] font-bold rounded-lg hover:bg-[#00a8e8] transition-all">
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