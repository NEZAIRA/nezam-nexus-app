'use client';

import Link from 'next/link';

const BlogSection = () => {
  // Function to calculate reading time based on word count
  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = text.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Healthcare",
      excerpt: "Exploring how artificial intelligence is revolutionizing diagnostics, treatment planning, and patient care.",
      content: "Artificial intelligence is transforming healthcare in unprecedented ways. From diagnostic algorithms that can detect diseases earlier than human doctors to predictive models that anticipate patient deterioration, AI is revolutionizing how we approach medicine. These technologies are not meant to replace healthcare professionals but to augment their capabilities, allowing them to focus on what they do best - providing compassionate care to patients. The integration of AI in healthcare systems is creating more efficient workflows, reducing medical errors, and ultimately improving patient outcomes.",
      date: "December 27, 2025",
      category: "Technology",
      readTime: calculateReadingTime("Exploring how artificial intelligence is revolutionizing diagnostics, treatment planning, and patient care. Artificial intelligence is transforming healthcare in unprecedented ways. From diagnostic algorithms that can detect diseases earlier than human doctors to predictive models that anticipate patient deterioration, AI is revolutionizing how we approach medicine. These technologies are not meant to replace healthcare professionals but to augment their capabilities, allowing them to focus on what they do best - providing compassionate care to patients. The integration of AI in healthcare systems is creating more efficient workflows, reducing medical errors, and ultimately improving patient outcomes.")
    },
    {
      id: 2,
      title: "Medical Education in the Digital Age",
      excerpt: "How modern approaches are leveraging technology to enhance learning and practice.",
      content: "Medical education has undergone significant changes with the integration of digital technologies. Virtual reality simulations allow students to practice procedures in risk-free environments, while AI-powered learning platforms adapt to individual student needs. Online resources provide access to vast medical knowledge, and telemedicine experiences offer new perspectives on patient care. These innovations are preparing the next generation of physicians with skills that blend traditional medical knowledge with cutting-edge technological capabilities, creating more versatile and effective healthcare providers.",
      date: "December 28, 2025",
      category: "Medicine",
      readTime: calculateReadingTime("How modern approaches are leveraging technology to enhance learning and practice. Medical education has undergone significant changes with the integration of digital technologies. Virtual reality simulations allow students to practice procedures in risk-free environments, while AI-powered learning platforms adapt to individual student needs. Online resources provide access to vast medical knowledge, and telemedicine experiences offer new perspectives on patient care. These innovations are preparing the next generation of physicians with skills that blend traditional medical knowledge with cutting-edge technological capabilities, creating more versatile and effective healthcare providers.")
    },
    {
      id: 3,
      title: "Innovative Approaches to Health Data Security",
      excerpt: "Protecting sensitive patient information while enabling advanced analytics and AI applications.",
      content: "Healthcare data security is a critical concern as medical institutions increasingly rely on digital systems. With the rise of AI applications in healthcare, protecting sensitive patient information while enabling advanced analytics presents unique challenges. Modern encryption techniques, blockchain technology, and federated learning approaches are creating new paradigms for secure health data management. These solutions ensure that patient privacy is maintained while still allowing researchers and clinicians to access the data they need to improve care and develop new treatments.",
      date: "December 27, 2025",
      category: "Future",
      readTime: calculateReadingTime("Protecting sensitive patient information while enabling advanced analytics and AI applications. Healthcare data security is a critical concern as medical institutions increasingly rely on digital systems. With the rise of AI applications in healthcare, protecting sensitive patient information while enabling advanced analytics presents unique challenges. Modern encryption techniques, blockchain technology, and federated learning approaches are creating new paradigms for secure health data management. These solutions ensure that patient privacy is maintained while still allowing researchers and clinicians to access the data they need to improve care and develop new treatments.")
    }
  ];

  return (
    <section id="blog" className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Blog & Research</h2>
        <p className="text-gray-600">Essays, research, and stories about medicine, technology, and the future of health.</p>
      </div>
      
      <div className="space-y-6">
        {blogPosts.map((post) => (
          <div 
            key={post.id} 
            className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                {post.category}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{post.readTime}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-900 transition-colors mb-2">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-3">
              {post.excerpt}
            </p>
            <button className="text-blue-900 font-medium group-hover:text-blue-700 transition-colors">
              Read full article →
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          href="#" 
          className="inline-block px-6 py-3 bg-white text-blue-900 font-medium rounded-lg border border-blue-900 hover:bg-blue-50 transition-colors"
        >
          View All Articles
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;