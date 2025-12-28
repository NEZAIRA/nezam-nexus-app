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
    <div className="min-h-screen bg-[#ffffff]">
      <div className="contact-section py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#201f1e]">Contact Us</h2>
          
          <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="contact-info">
              <h3 className="text-3xl font-bold text-[#201f1e] mb-8">Get in Touch</h3>
              <p className="text-[#323130] mb-10 leading-relaxed">
                Have questions about our products or services? Interested in partnerships or collaborations? 
                We'd love to hear from you. Reach out using the form or contact information below.
              </p>
              
              <div className="contact-details space-y-8 mb-12">
                <div className="contact-item flex items-start">
                  <div className="contact-icon w-12 h-12 rounded-full bg-[#f3f2f1] flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-[#0078d4]"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#201f1e]">Email</h4>
                    <p className="text-[#605e5c]">contact@nezaira.com</p>
                  </div>
                </div>
                
                <div className="contact-item flex items-start">
                  <div className="contact-icon w-12 h-12 rounded-full bg-[#f3f2f1] flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt text-[#0078d4]"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#201f1e]">Location</h4>
                    <p className="text-[#605e5c]">Global Healthcare Innovation Hub</p>
                  </div>
                </div>
                
                <div className="contact-item flex items-start">
                  <div className="contact-icon w-12 h-12 rounded-full bg-[#f3f2f1] flex items-center justify-center mr-4">
                    <i className="fas fa-clock text-[#0078d4]"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#201f1e]">Support Hours</h4>
                    <p className="text-[#605e5c]">Monday - Friday: 9AM - 5PM (GMT)</p>
                  </div>
                </div>
              </div>
              
              <div className="social-links">
                <h4 className="text-xl font-semibold text-[#201f1e] mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <Link href="#" className="social-icon w-10 h-10 rounded-full bg-[#f3f2f1] flex items-center justify-center text-[#0078d4] hover:bg-[#edebe9] transition-colors">
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link href="#" className="social-icon w-10 h-10 rounded-full bg-[#f3f2f1] flex items-center justify-center text-[#0078d4] hover:bg-[#edebe9] transition-colors">
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                  <Link href="#" className="social-icon w-10 h-10 rounded-full bg-[#f3f2f1] flex items-center justify-center text-[#0078d4] hover:bg-[#edebe9] transition-colors">
                    <i className="fab fa-github"></i>
                  </Link>
                  <Link href="#" className="social-icon w-10 h-10 rounded-full bg-[#f3f2f1] flex items-center justify-center text-[#0078d4] hover:bg-[#edebe9] transition-colors">
                    <i className="fab fa-youtube"></i>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <div className="bg-white rounded-lg border border-[#e1dfdd] p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-[#201f1e] mb-6">Send us a message</h3>
                
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 text-green-700 rounded border border-green-200">
                    <i className="fas fa-check-circle mr-2"></i>
                    Your message has been sent successfully! We'll get back to you soon.
                  </div>
                )}
                
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 rounded border border-red-200">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    {submitError}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-[#323130] font-medium mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border border-[#d2d0ce] rounded-md focus:outline-none focus:border-[#0078d4] text-[#201f1e]"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-[#323130] font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border border-[#d2d0ce] rounded-md focus:outline-none focus:border-[#0078d4] text-[#201f1e]"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-[#323130] font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-3 py-2 bg-white border border-[#d2d0ce] rounded-md focus:outline-none focus:border-[#0078d4] text-[#201f1e]"
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded-md font-semibold transition-colors ${
                      isSubmitting 
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                        : 'bg-[#0078d4] text-white hover:bg-[#106ebe]'
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
            
            <div className="auth-section mt-12 bg-white rounded-lg border border-[#e1dfdd] p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-6 text-[#201f1e]">Admin Access</h3>
              <div className="auth-form bg-[#f3f2f1] p-6 rounded border border-[#e1dfdd] mb-6">
                <div className="mb-4">
                  <label className="block text-[#323130] mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your admin email"
                    className="w-full px-3 py-2 bg-white border border-[#d2d0ce] rounded-md focus:outline-none focus:border-[#0078d4] text-[#201f1e]"
                    defaultValue="uhansekepler@gmail.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#323130] mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 bg-white border border-[#d2d0ce] rounded-md focus:outline-none focus:border-[#0078d4] text-[#201f1e]"
                    defaultValue="ya*ali857"
                  />
                </div>
                <div className="flex space-x-4">
                  <button className="flex-1 px-4 py-2 bg-[#0078d4] text-white font-semibold rounded-md hover:bg-[#106ebe] transition-colors">
                    Login
                  </button>
                  <button className="flex-1 px-4 py-2 bg-[#f3f2f1] text-[#323130] font-semibold rounded-md hover:bg-[#edebe9] transition-colors">
                    Sign Up
                  </button>
                </div>
              </div>
              <p className="text-sm text-[#605e5c]">Admin credentials: uhansekepler@gmail.com / ya*ali857</p>
            </div>
            
            <div className="newsletter-section mt-12 bg-white rounded-lg border border-[#e1dfdd] p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-[#201f1e] mb-4">Stay Updated</h3>
              <p className="text-[#323130] mb-6">Subscribe to our newsletter for the latest updates on our products and research.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-3 py-2 bg-white border border-[#d2d0ce] rounded-md focus:outline-none focus:border-[#0078d4] text-[#201f1e]"
                />
                <button className="px-6 py-2 bg-[#0078d4] text-white font-semibold rounded-md hover:bg-[#106ebe] transition-colors">
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