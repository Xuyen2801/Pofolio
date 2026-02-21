import React, { useState } from 'react';
import portfolioData from './data.json';
import './App.css';

function App() {
  const { hero, about, skills, projects, experience, certifications, contact, footer } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('ALL'); // State cho bộ lọc Project

  const filteredProjects = activeFilter === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="portfolio-container">
      {/* 1. Hero Section */}
      <section id="hero" className="section hero">
        <div className="hero-content">
          <h1>{hero.name}</h1>
          <h3>{hero.role}</h3>
          <p className="tagline">{hero.tagline}</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn primary">View Projects</a>
            <a href={hero.resumeLink} className="btn secondary">Download CV</a>
            <a href="#contact" className="btn outline">Contact</a>
          </div>
        </div>
        <div className="hero-image">
          <img src={hero.avatar} alt="Profile" />
        </div>
      </section>

      {/* 2. About Me */}
      <section id="about" className="section bg-light">
        <h2>About Me</h2>
        <div className="about-grid">
          <div><strong>Ngành học:</strong> {about.major}</div>
          <div><strong>Năm học:</strong> {about.year}</div>
          <div><strong>Mục tiêu:</strong> {about.careerGoal}</div>
          <div>
            <strong>Điểm mạnh:</strong>
            <ul>{about.strengths.map((str, i) => <li key={i}>{str}</li>)}</ul>
          </div>
          <div>
            <strong>Công nghệ yêu thích:</strong>
            <div className="tags">{about.techInterests.map((tech, i) => <span key={i} className="tag">{tech}</span>)}</div>
          </div>
        </div>
      </section>

      {/* 3. Skills */}
      <section id="skills" className="section">
        <h2>Skills & Tech Stack</h2>
        <div className="skills-container">
          <div className="tech-skills">
            <h3>💻 Technical Skills</h3>
            {skills.technical.map((skill, i) => (
              <div key={i} className="skill-item">
                <span className="skill-name">{skill.name}</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: skill.level }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="soft-skills">
            <h3>🤝 Soft Skills</h3>
            <div className="tags">
              {skills.soft.map((skill, i) => <span key={i} className="tag soft-tag">{skill}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Projects (Quan trọng nhất) */}
      <section id="projects" className="section bg-light">
        <h2>Featured Projects 🔥</h2>
        <div className="project-filters">
          {['ALL', 'WEB', 'APP', 'UIUX'].map(cat => (
            <button 
              key={cat} 
              className={activeFilter === cat ? 'active' : ''}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.title} />
              <div className="project-info">
                <h3>{project.title} <span className="cat-badge">{project.category}</span></h3>
                <p>{project.description}</p>
                <p><strong>Vai trò:</strong> {project.role}</p>
                <div className="tech-stack-mini">
                  {project.techStack.map((tech, i) => <span key={i}>{tech}</span>)}
                </div>
                <div className="project-links">
                  <a href={project.demoLink} target="_blank" rel="noreferrer">Live Demo</a>
                  <a href={project.githubLink} target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 & 6. Experience & Certifications (Gộp layout cho gọn) */}
      <section className="section experience-certs">
        <div className="half">
          <h2>Experience / Activities</h2>
          <div className="timeline">
            {experience.map((exp, i) => (
              <div key={i} className="timeline-item">
                <h4>{exp.title}</h4>
                <span className="time">{exp.time}</span>
                <p>{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="half">
          <h2>Certifications</h2>
          <ul className="cert-list">
            {certifications.map((cert, i) => <li key={i}>🏆 {cert}</li>)}
          </ul>
        </div>
      </section>

      {/* 7. Contact */}
      <section id="contact" className="section bg-light">
        <h2>Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <p>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
            <p>GitHub: <a href={contact.github} target="_blank" rel="noreferrer">Profile</a></p>
            <p>LinkedIn: <a href={contact.linkedin} target="_blank" rel="noreferrer">Profile</a></p>
          </div>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit" className="btn primary">Send Message</button>
          </form>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="footer">
        <p>{footer.copyright}</p>
      </footer>
    </div>
  );
}

export default App;