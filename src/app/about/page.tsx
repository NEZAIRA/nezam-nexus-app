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
    { name: 'Python' },
    { name: 'React' },
    { name: 'TensorFlow' },
    { name: 'PostgreSQL' },
    { name: 'AWS' },
    { name: 'Docker' }
  ];

  return (
    <div className="about-section">
      <div className="container mx-auto px-4">
        <h2>About Nezaira</h2>
        
        <div className="about-content">
          <div className="about-image">
            <div className="founder-avatar">
              <i className="fas fa-user-md"></i>
            </div>
          </div>
          <div className="about-text">
            <h2>MOHAMMADMAHDI NEZAMOLESLAMI</h2>
            <p>Founder & CEO</p>
            <p>1st Year MBBS Student + Tech Visionary</p>
            <p>
              "Combining medical knowledge with technology to create innovative solutions for healthcare. At Nezaira, we're building the future of medicine with AI-powered tools that assist both medical professionals and patients."
            </p>
            <p>
              With a passion for both medicine and technology, I founded Nezaira to bridge the gap between healthcare and artificial intelligence, creating tools that make medical information more accessible and accurate.
            </p>
          </div>
        </div>
        
        <div className="mission-vision">
          <div>
            <div className="mission-icon">
              <i className="fas fa-bullseye"></i>
            </div>
            <h3>Our Mission</h3>
            <p>
              To innovate healthcare through technology, creating AI-powered tools that enhance medical knowledge accessibility, improve patient outcomes, and support healthcare professionals with evidence-based insights.
            </p>
          </div>
          
          <div>
            <div className="vision-icon">
              <i className="fas fa-eye"></i>
            </div>
            <h3>Our Vision</h3>
            <p>
              To become the leading medical-tech company, revolutionizing healthcare delivery through artificial intelligence, making quality medical information and tools accessible to everyone, everywhere.
            </p>
          </div>
        </div>
        
        <div className="tech-stack">
          <h3>Our Tech Stack</h3>
          <div className="tech-grid">
            {techStack.map((tech, index) => (
              <div key={index}>
                <div className="tech-icon">
                  <i className="fas fa-code"></i>
                </div>
                <h4>{tech.name}</h4>
              </div>
            ))}
          </div>
        </div>
        
        <div className="team-section">
          <h3>Our Team</h3>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id}>
                <div className="team-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <h4>{member.name}</h4>
                <div>{member.role}</div>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;