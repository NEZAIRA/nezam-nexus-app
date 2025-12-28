'use client';

import Link from 'next/link';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
};

const AboutPage = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'MOHAMMADMAHDI NEZAMOLESLAMI',
      role: 'CEO',
      bio: 'Founder of Nezaira, passionate about combining medical knowledge with technology to create innovative healthcare solutions.'
    }
  ];

  const techStack = [
    { name: 'Python', icon: 'fa-python' },
    { name: 'React', icon: 'fa-react' },
    { name: 'TensorFlow', icon: 'fa-brain' },
    { name: 'PostgreSQL', icon: 'fa-database' },
    { name: 'AWS', icon: 'fa-cloud' },
    { name: 'Docker', icon: 'fa-docker' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] to-[#0c1e35]">
      <div className="about-section py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-4xl font-bold text-center mb-16 gradient-text">About Nezaira</h2>
          
          <div className="about-content grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="about-image text-center">
              <div className="founder-avatar w-64 h-64 mx-auto bg-gradient-to-br from-[#0a2540] to-[#0072ce] rounded-full flex items-center justify-center text-white text-7xl pulse">
                <i className="fas fa-user-md"></i>
              </div>
            </div>
            <div className="about-text">
              <h2 className="text-4xl font-bold text-white mb-6">MOHAMMADMAHDI NEZAMOLESLAMI</h2>
              <p className="text-xl text-[#00c6ff] mb-4">Founder & CEO</p>
              <p className="text-xl text-gray-300 mb-4">1st Year MBBS Student + Tech Visionary</p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "Combining medical knowledge with technology to create innovative solutions for healthcare. At Nezaira, we're building the future of medicine with AI-powered tools that assist both medical professionals and patients."
              </p>
              <p className="text-gray-400 leading-relaxed">
                With a passion for both medicine and technology, I founded Nezaira to bridge the gap between healthcare and artificial intelligence, creating tools that make medical information more accessible and accurate.
              </p>
            </div>
          </div>
          
          <div className="mission-vision grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="glass-effect rounded-2xl p-10 text-center transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#00c6ff]/20">
              <div className="mission-icon text-[#00c6ff] text-6xl mb-6">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300">
                To innovate healthcare through technology, creating AI-powered tools that enhance medical knowledge accessibility, improve patient outcomes, and support healthcare professionals with evidence-based insights.
              </p>
            </div>
            
            <div className="glass-effect rounded-2xl p-10 text-center transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#00c6ff]/20">
              <div className="vision-icon text-[#00c6ff] text-6xl mb-6">
                <i className="fas fa-eye"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300">
                To become the leading medical-tech company, revolutionizing healthcare delivery through artificial intelligence, making quality medical information and tools accessible to everyone, everywhere.
              </p>
            </div>
          </div>
          
          <div className="tech-stack mb-20">
            <h3 className="section-title text-3xl font-bold text-center mb-12 gradient-text">Our Tech Stack</h3>
            <div className="tech-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {techStack.map((tech, index) => (
                <div key={index} className="glass-effect rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-[1.05]">
                  <div className="tech-icon text-[#00c6ff] text-5xl mb-4">
                    <i className={`fas ${tech.icon}`}></i>
                  </div>
                  <h4 className="text-lg font-bold text-white">{tech.name}</h4>
                </div>
              ))}
            </div>
          </div>
          
          <div className="team-section">
            <h3 className="section-title text-3xl font-bold text-center mb-12 gradient-text">Our Team</h3>
            <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map(member => (
                <div key={member.id} className="glass-effect rounded-2xl p-8 text-center transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#00c6ff]/20">
                  <div className="team-avatar w-24 h-24 mx-auto bg-gradient-to-br from-[#0a2540] to-[#0072ce] rounded-full flex items-center justify-center text-white text-3xl mb-6">
                    <i className="fas fa-user"></i>
                  </div>
                  <h4 className="team-name text-xl font-bold text-white mb-2">{member.name}</h4>
                  <div className="team-role text-[#00c6ff] font-semibold mb-4">{member.role}</div>
                  <p className="team-bio text-gray-300">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;