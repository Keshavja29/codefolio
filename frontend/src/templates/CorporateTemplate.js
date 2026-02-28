import React from 'react';

function CorporateTemplate({ user }) {
  return (
    <div style={{ 
      background: '#f8f9fa',
      minHeight: '100vh',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      {/* Header Bar */}
      <div style={{ 
        background: '#2c3e50',
        color: 'white',
        padding: '20px 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '32px', margin: 0 }}>
            {user.profile?.name || user.username}
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Bio Section */}
        <section style={{ 
          background: 'white',
          padding: '40px',
          marginBottom: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <p style={{ 
            fontSize: '20px', 
            color: '#555',
            lineHeight: '1.8',
            marginBottom: '20px'
          }}>
            {user.profile?.bio || 'Professional Developer'}
          </p>
          
          {/* Social Links */}
          <div style={{ display: 'flex', gap: '15px' }}>
            {user.profile?.socials?.github && (
              <a href={user.profile.socials.github} target="_blank" rel="noopener noreferrer"
                 style={{ 
                   background: '#2c3e50',
                   color: 'white',
                   padding: '10px 20px',
                   textDecoration: 'none',
                   borderRadius: '4px',
                   fontSize: '14px',
                   fontWeight: '600'
                 }}>
                GitHub
              </a>
            )}
            {user.profile?.socials?.linkedin && (
              <a href={user.profile.socials.linkedin} target="_blank" rel="noopener noreferrer"
                 style={{ 
                   background: '#0077b5',
                   color: 'white',
                   padding: '10px 20px',
                   textDecoration: 'none',
                   borderRadius: '4px',
                   fontSize: '14px',
                   fontWeight: '600'
                 }}>
                LinkedIn
              </a>
            )}
          </div>
        </section>

        {/* Projects Section */}
        {user.projects && user.projects.length > 0 && (
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              color: '#2c3e50',
              marginBottom: '20px',
              fontWeight: '600'
            }}>
              Professional Projects
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              {user.projects.map((project, index) => (
                <div key={index} style={{ 
                  background: 'white',
                  padding: '30px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderLeft: '4px solid #3498db'
                }}>
                  <h3 style={{ 
                    fontSize: '22px', 
                    marginBottom: '15px',
                    color: '#2c3e50'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{ 
                    color: '#666', 
                    marginBottom: '15px',
                    lineHeight: '1.6'
                  }}>
                    {project.description}
                  </p>
                  {project.techStack && (
                    <div style={{ marginBottom: '15px' }}>
                      {project.techStack.map((tech, i) => (
                        <span key={i} style={{ 
                          display: 'inline-block',
                          background: '#ecf0f1',
                          color: '#2c3e50',
                          padding: '5px 12px',
                          margin: '5px 5px 5px 0',
                          borderRadius: '4px',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {project.repoLink && (
                      <a href={project.repoLink} target="_blank" rel="noopener noreferrer"
                         style={{ 
                           color: '#3498db',
                           textDecoration: 'none',
                           fontWeight: '600',
                           fontSize: '14px'
                         }}>
                        View Code →
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                         style={{ 
                           color: '#27ae60',
                           textDecoration: 'none',
                           fontWeight: '600',
                           fontSize: '14px'
                         }}>
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {user.skills && (
          <section style={{ 
            background: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '28px', 
              color: '#2c3e50',
              marginBottom: '30px',
              fontWeight: '600'
            }}>
              Technical Skills
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
              {user.skills.frontend && user.skills.frontend.length > 0 && (
                <div>
                  <h3 style={{ 
                    fontSize: '18px', 
                    marginBottom: '15px',
                    color: '#3498db',
                    fontWeight: '600'
                  }}>
                    Frontend Development
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {user.skills.frontend.map((skill, i) => (
                      <li key={i} style={{ 
                        padding: '8px 0',
                        color: '#555',
                        borderBottom: '1px solid #ecf0f1'
                      }}>
                        • {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {user.skills.backend && user.skills.backend.length > 0 && (
                <div>
                  <h3 style={{ 
                    fontSize: '18px', 
                    marginBottom: '15px',
                    color: '#27ae60',
                    fontWeight: '600'
                  }}>
                    Backend Development
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {user.skills.backend.map((skill, i) => (
                      <li key={i} style={{ 
                        padding: '8px 0',
                        color: '#555',
                        borderBottom: '1px solid #ecf0f1'
                      }}>
                        • {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {user.skills.tools && user.skills.tools.length > 0 && (
                <div>
                  <h3 style={{ 
                    fontSize: '18px', 
                    marginBottom: '15px',
                    color: '#e74c3c',
                    fontWeight: '600'
                  }}>
                    Tools & Technologies
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {user.skills.tools.map((skill, i) => (
                      <li key={i} style={{ 
                        padding: '8px 0',
                        color: '#555',
                        borderBottom: '1px solid #ecf0f1'
                      }}>
                        • {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default CorporateTemplate;