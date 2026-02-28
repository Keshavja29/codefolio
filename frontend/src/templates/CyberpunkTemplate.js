import React from 'react';

function CyberpunkTemplate({ user }) {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      minHeight: '100vh',
      color: '#00ff9f',
      fontFamily: '"Orbitron", "Courier New", monospace',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ 
          textAlign: 'center', 
          marginBottom: '60px',
          borderBottom: '2px solid #00ff9f',
          paddingBottom: '30px'
        }}>
          <h1 style={{ 
            fontSize: '64px', 
            marginBottom: '10px',
            textShadow: '0 0 20px #00ff9f, 0 0 40px #00ff9f',
            letterSpacing: '4px'
          }}>
            {user.profile?.name || user.username}
          </h1>
          <p style={{ 
            fontSize: '24px', 
            color: '#ff00ff',
            textShadow: '0 0 10px #ff00ff'
          }}>
            {user.profile?.bio || 'CYBER DEVELOPER'}
          </p>
          
          {/* Social Links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px' }}>
            {user.profile?.socials?.github && (
              <a href={user.profile.socials.github} target="_blank" rel="noopener noreferrer"
                 style={{ 
                   color: '#00ff9f', 
                   textDecoration: 'none',
                   border: '2px solid #00ff9f',
                   padding: '10px 20px',
                   textTransform: 'uppercase',
                   letterSpacing: '2px',
                   transition: 'all 0.3s'
                 }}>
                [GITHUB]
              </a>
            )}
            {user.profile?.socials?.linkedin && (
              <a href={user.profile.socials.linkedin} target="_blank" rel="noopener noreferrer"
                 style={{ 
                   color: '#00ff9f', 
                   textDecoration: 'none',
                   border: '2px solid #00ff9f',
                   padding: '10px 20px',
                   textTransform: 'uppercase',
                   letterSpacing: '2px'
                 }}>
                [LINKEDIN]
              </a>
            )}
          </div>
        </header>

        {/* Projects */}
        {user.projects && user.projects.length > 0 && (
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{ 
              fontSize: '36px', 
              marginBottom: '30px',
              color: '#ff00ff',
              textShadow: '0 0 10px #ff00ff',
              letterSpacing: '3px'
            }}>
              &gt;&gt; PROJECTS
            </h2>
            <div style={{ display: 'grid', gap: '30px' }}>
              {user.projects.map((project, index) => (
                <div key={index} style={{ 
                  background: 'rgba(0, 255, 159, 0.05)',
                  border: '2px solid #00ff9f',
                  padding: '30px',
                  boxShadow: '0 0 20px rgba(0, 255, 159, 0.3)'
                }}>
                  <h3 style={{ 
                    fontSize: '28px', 
                    marginBottom: '15px',
                    color: '#00ff9f'
                  }}>
                    [{project.title}]
                  </h3>
                  <p style={{ 
                    color: '#ccc', 
                    marginBottom: '15px',
                    lineHeight: '1.8'
                  }}>
                    {project.description}
                  </p>
                  {project.techStack && (
                    <div style={{ marginBottom: '15px' }}>
                      {project.techStack.map((tech, i) => (
                        <span key={i} style={{ 
                          display: 'inline-block',
                          background: 'rgba(255, 0, 255, 0.2)',
                          border: '1px solid #ff00ff',
                          color: '#ff00ff',
                          padding: '5px 15px',
                          margin: '5px 5px 5px 0',
                          fontSize: '14px',
                          textTransform: 'uppercase'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '20px' }}>
                    {project.repoLink && (
                      <a href={project.repoLink} target="_blank" rel="noopener noreferrer"
                         style={{ 
                           color: '#00ff9f',
                           textDecoration: 'none',
                           border: '1px solid #00ff9f',
                           padding: '8px 16px',
                           textTransform: 'uppercase',
                           fontSize: '14px'
                         }}>
                        &lt;CODE/&gt;
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                         style={{ 
                           color: '#ff00ff',
                           textDecoration: 'none',
                           border: '1px solid #ff00ff',
                           padding: '8px 16px',
                           textTransform: 'uppercase',
                           fontSize: '14px'
                         }}>
                        &lt;DEMO/&gt;
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {user.skills && (
          <section>
            <h2 style={{ 
              fontSize: '36px', 
              marginBottom: '30px',
              color: '#ff00ff',
              textShadow: '0 0 10px #ff00ff',
              letterSpacing: '3px'
            }}>
              &gt;&gt; SKILLS
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {user.skills.frontend && user.skills.frontend.length > 0 && (
                <div style={{ 
                  background: 'rgba(0, 255, 159, 0.05)',
                  border: '2px solid #00ff9f',
                  padding: '20px'
                }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#00ff9f' }}>
                    [FRONTEND]
                  </h3>
                  {user.skills.frontend.map((skill, i) => (
                    <div key={i} style={{ color: '#ccc', padding: '5px 0' }}>
                      &gt; {skill}
                    </div>
                  ))}
                </div>
              )}
              {user.skills.backend && user.skills.backend.length > 0 && (
                <div style={{ 
                  background: 'rgba(255, 0, 255, 0.05)',
                  border: '2px solid #ff00ff',
                  padding: '20px'
                }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#ff00ff' }}>
                    [BACKEND]
                  </h3>
                  {user.skills.backend.map((skill, i) => (
                    <div key={i} style={{ color: '#ccc', padding: '5px 0' }}>
                      &gt; {skill}
                    </div>
                  ))}
                </div>
              )}
              {user.skills.tools && user.skills.tools.length > 0 && (
                <div style={{ 
                  background: 'rgba(0, 255, 159, 0.05)',
                  border: '2px solid #00ff9f',
                  padding: '20px'
                }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#00ff9f' }}>
                    [TOOLS]
                  </h3>
                  {user.skills.tools.map((skill, i) => (
                    <div key={i} style={{ color: '#ccc', padding: '5px 0' }}>
                      &gt; {skill}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default CyberpunkTemplate;