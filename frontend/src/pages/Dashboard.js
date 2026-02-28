import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Nav, Image, Badge, Alert } from 'react-bootstrap';
import { getProfile, updateProfile, uploadProfilePicture, upgradeToPro, updateCustomDomain } from '../services/api';
import { useDarkMode } from '../DarkModeContext';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    github: '',
    linkedin: '',
    twitter: ''
  });
  
  const [skills, setSkills] = useState({
    frontend: '',
    backend: '',
    devops: '',
    tools: ''
  });
  
  const [project, setProject] = useState({
    title: '',
    description: '',
    techStack: '',
    repoLink: '',
    liveLink: ''
  });

  const [testimonial, setTestimonial] = useState({
    name: '',
    role: '',
    company: '',
    message: '',
    rating: 5
  });

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
      
      if (response.data.profile) {
        setProfileData({
          name: response.data.profile.name || '',
          bio: response.data.profile.bio || '',
          github: response.data.profile.socials?.github || '',
          linkedin: response.data.profile.socials?.linkedin || '',
          twitter: response.data.profile.socials?.twitter || ''
        });
      }
      
      if (response.data.skills) {
        setSkills({
          frontend: response.data.skills.frontend?.join(', ') || '',
          backend: response.data.skills.backend?.join(', ') || '',
          devops: response.data.skills.devops?.join(', ') || '',
          tools: response.data.skills.tools?.join(', ') || ''
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        profile: {
          name: profileData.name,
          bio: profileData.bio,
          socials: {
            github: profileData.github,
            linkedin: profileData.linkedin,
            twitter: profileData.twitter
          }
        }
      });
      alert('Profile updated successfully!');
      fetchProfile();
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  const handleSkillsSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        skills: {
          frontend: skills.frontend.split(',').map(s => s.trim()).filter(s => s),
          backend: skills.backend.split(',').map(s => s.trim()).filter(s => s),
          devops: skills.devops.split(',').map(s => s.trim()).filter(s => s),
          tools: skills.tools.split(',').map(s => s.trim()).filter(s => s)
        }
      });
      alert('Skills updated successfully!');
      fetchProfile();
    } catch (error) {
      alert('Failed to update skills');
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProject = {
        title: project.title,
        description: project.description,
        techStack: project.techStack.split(',').map(s => s.trim()).filter(s => s),
        repoLink: project.repoLink,
        liveLink: project.liveLink
      };
      
      const updatedProjects = [...(user.projects || []), newProject];
      
      await updateProfile({ projects: updatedProjects });
      alert('Project added successfully!');
      setProject({ title: '', description: '', techStack: '', repoLink: '', liveLink: '' });
      fetchProfile();
    } catch (error) {
      alert('Failed to add project');
    }
  };

  const handleTemplateChange = async (templateId) => {
    try {
      await updateProfile({ templateId });
      alert('Template updated successfully!');
      fetchProfile();
    } catch (error) {
      alert('Failed to update template');
    }
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      await uploadProfilePicture(formData);
      alert('Profile picture uploaded successfully!');
      fetchProfile();
    } catch (error) {
      alert('Failed to upload image');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <div className={`min-vh-100 ${darkMode ? 'dashboard-dark-mode' : 'bg-light'}`}>
      {/* Header */}
      <div className="bg-white shadow-sm mb-4">
        <Container className="py-3">
          <Row className="align-items-center">
            <Col>
              <h1 className="h3 mb-0">Dashboard</h1>
            </Col>
            <Col xs="auto">
              <a 
                href={`/${user.username}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline-primary me-2"
              >
                View Portfolio
              </a>
              <Button 
                variant={darkMode ? 'light' : 'dark'} 
                onClick={toggleDarkMode}
                className="me-2"
              >
                {darkMode ? '☀️' : '🌙'}
              </Button>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        {/* Tabs */}
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'projects'} onClick={() => setActiveTab('projects')}>
              Projects
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'skills'} onClick={() => setActiveTab('skills')}>
              Skills
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'template'} onClick={() => setActiveTab('template')}>
              Template
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')}>
              Analytics
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'testimonials'} onClick={() => setActiveTab('testimonials')}>
              Testimonials
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'pro'} onClick={() => setActiveTab('pro')}>
              Pro Settings {user.isPro && <Badge bg="warning" className="ms-1">PRO</Badge>}
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card>
            <Card.Body>
              <h2 className="h4 mb-4">Edit Profile</h2>
              
              <Form onSubmit={handleProfileSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Profile Picture</Form.Label>
                  {user.profile?.avatar && (
                    <div className="mb-3">
                      <Image 
                        src={user.profile.avatar} 
                        roundedCircle 
                        width={150} 
                        height={150}
                        className="border border-3"
                      />
                    </div>
                  )}
                  <Form.Control 
                    type="file" 
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Tell us about yourself..."
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  />
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>GitHub URL</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="https://github.com/username"
                        value={profileData.github}
                        onChange={(e) => setProfileData({...profileData, github: e.target.value})}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>LinkedIn URL</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Twitter URL</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="https://twitter.com/username"
                        value={profileData.twitter}
                        onChange={(e) => setProfileData({...profileData, twitter: e.target.value})}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit">
                  Save Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <>
            <Card className="mb-4">
              <Card.Body>
                <h2 className="h4 mb-4">Add New Project</h2>
                
                <Form onSubmit={handleProjectSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Project Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="My Awesome Project"
                      value={project.title}
                      onChange={(e) => setProject({...project, title: e.target.value})}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Describe your project..."
                      value={project.description}
                      onChange={(e) => setProject({...project, description: e.target.value})}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Tech Stack</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="React, Node.js, MongoDB (comma separated)"
                      value={project.techStack}
                      onChange={(e) => setProject({...project, techStack: e.target.value})}
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>GitHub Repository</Form.Label>
                        <Form.Control
                          type="url"
                          placeholder="https://github.com/username/repo"
                          value={project.repoLink}
                          onChange={(e) => setProject({...project, repoLink: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Live Demo URL</Form.Label>
                        <Form.Control
                          type="url"
                          placeholder="https://myproject.com"
                          value={project.liveLink}
                          onChange={(e) => setProject({...project, liveLink: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="success" type="submit">
                    Add Project
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <h3 className="h5 mb-4">Your Projects</h3>
                {user.projects && user.projects.length > 0 ? (
                  <Row>
                    {user.projects.map((proj, index) => (
                      <Col md={6} key={index} className="mb-3">
                        <Card className="h-100">
                          <Card.Body>
                            <Card.Title>{proj.title}</Card.Title>
                            <Card.Text>{proj.description}</Card.Text>
                            {proj.techStack && (
                              <div className="mb-3">
                                {proj.techStack.map((tech, i) => (
                                  <Badge key={i} bg="primary" className="me-1">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            <div className="d-flex gap-2">
                              {proj.repoLink && (
                                <a href={proj.repoLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                                  GitHub
                                </a>
                              )}
                              {proj.liveLink && (
                                <a href={proj.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-success">
                                  Live Demo
                                </a>
                              )}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p className="text-muted">No projects added yet.</p>
                )}
              </Card.Body>
            </Card>
          </>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <Card>
            <Card.Body>
              <h2 className="h4 mb-4">Edit Skills</h2>
              
              <Form onSubmit={handleSkillsSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Frontend Skills</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="React, JavaScript, HTML, CSS (comma separated)"
                    value={skills.frontend}
                    onChange={(e) => setSkills({...skills, frontend: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Backend Skills</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Node.js, Express, MongoDB (comma separated)"
                    value={skills.backend}
                    onChange={(e) => setSkills({...skills, backend: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>DevOps Skills</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Docker, AWS, CI/CD (comma separated)"
                    value={skills.devops}
                    onChange={(e) => setSkills({...skills, devops: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tools</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Git, VS Code, Postman (comma separated)"
                    value={skills.tools}
                    onChange={(e) => setSkills({...skills, tools: e.target.value})}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Save Skills
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* Template Tab */}
        {activeTab === 'template' && (
          <Card>
            <Card.Body>
              <h2 className="h4 mb-2">Choose Template</h2>
              <p className="text-muted mb-4">
                Current Template: <Badge bg="info">{user.templateId || 'minimalist'}</Badge>
              </p>
              
              <Row>
                <Col md={4} className="mb-3">
                  <Card 
                    className={`text-center cursor-pointer ${user.templateId === 'minimalist' ? 'border-primary border-3' : ''}`}
                    onClick={() => handleTemplateChange('minimalist')}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Body>
                      <h3 className="h5">Minimalist</h3>
                      <p className="text-muted small">Clean & Simple</p>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={4} className="mb-3">
                  <Card 
                    className={`text-center cursor-pointer bg-dark text-light ${user.templateId === 'cyberpunk' ? 'border-primary border-3' : ''}`}
                    onClick={() => handleTemplateChange('cyberpunk')}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Body>
                      <h3 className="h5 text-success">Cyberpunk</h3>
                      <p className="text-warning small">Dark & Neon</p>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={4} className="mb-3">
                  <Card 
                    className={`text-center cursor-pointer bg-secondary text-white ${user.templateId === 'corporate' ? 'border-primary border-3' : ''}`}
                    onClick={() => handleTemplateChange('corporate')}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Body>
                      <h3 className="h5">Corporate</h3>
                      <p className="small">Professional</p>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={4} className="mb-3">
                  <Card 
                    className={`text-center cursor-pointer text-white ${user.templateId === 'professional' ? 'border-primary border-3' : ''}`}
                    onClick={() => handleTemplateChange('professional')}
                    style={{ 
                      cursor: 'pointer',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  >
                    <Card.Body>
                      <h3 className="h5">Professional</h3>
                      <p className="small">Gradient & Modern</p>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={4} className="mb-3">
                  <Card 
                    className={`text-center cursor-pointer ${user.templateId === 'dark' ? 'border-primary border-3' : ''}`}
                    onClick={() => handleTemplateChange('dark')}
                    style={{ 
                      cursor: 'pointer', 
                      background: '#0f0f0f', 
                      color: '#0f0',
                      border: '1px solid #333'
                    }}
                  >
                    <Card.Body>
                      <h3 className="h5 text-success">Dark</h3>
                      <p className="small text-info">Terminal Style</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <Card>
            <Card.Body>
              <h2 className="h4 mb-4">Portfolio Analytics</h2>
              
              <Row>
                <Col md={4}>
                  <Card className="bg-primary text-white mb-3">
                    <Card.Body className="text-center">
                      <h3 className="display-4">{user.analytics?.totalViews || 0}</h3>
                      <p className="mb-0">Total Views</p>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={4}>
                  <Card className="bg-success text-white mb-3">
                    <Card.Body className="text-center">
                      <h3 className="display-4">{user.projects?.length || 0}</h3>
                      <p className="mb-0">Projects</p>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={4}>
                  <Card className="bg-info text-white mb-3">
                    <Card.Body className="text-center">
                      <h3 className="display-4">
                        {(user.skills?.frontend?.length || 0) + 
                         (user.skills?.backend?.length || 0) + 
                         (user.skills?.tools?.length || 0)}
                      </h3>
                      <p className="mb-0">Total Skills</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card className="mt-4">
                <Card.Body>
                  <h5>Recent Views (Last 7 Days)</h5>
                  {user.analytics?.viewHistory && user.analytics.viewHistory.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Views</th>
                          </tr>
                        </thead>
                        <tbody>
                          {user.analytics.viewHistory.slice(-7).reverse().map((view, index) => (
                            <tr key={index}>
                              <td>{new Date(view.date).toLocaleDateString()}</td>
                              <td><Badge bg="primary">{view.count}</Badge></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-muted">No views yet. Share your portfolio!</p>
                  )}
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <>
            <Card className="mb-4">
              <Card.Body>
                <h2 className="h4 mb-4">Add Testimonial</h2>
                
                <Form onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const updatedTestimonials = [...(user.testimonials || []), testimonial];
                    await updateProfile({ testimonials: updatedTestimonials });
                    alert('Testimonial added successfully!');
                    setTestimonial({ name: '', role: '', company: '', message: '', rating: 5 });
                    fetchProfile();
                  } catch (error) {
                    alert('Failed to add testimonial');
                  }
                }}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="John Doe"
                          value={testimonial.name}
                          onChange={(e) => setTestimonial({...testimonial, name: e.target.value})}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="CEO"
                          value={testimonial.role}
                          onChange={(e) => setTestimonial({...testimonial, role: e.target.value})}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Company Name"
                      value={testimonial.company}
                      onChange={(e) => setTestimonial({...testimonial, company: e.target.value})}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Testimonial message..."
                      value={testimonial.message}
                      onChange={(e) => setTestimonial({...testimonial, message: e.target.value})}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                      value={testimonial.rating}
                      onChange={(e) => setTestimonial({...testimonial, rating: parseInt(e.target.value)})}
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
                      <option value="4">⭐⭐⭐⭐ (4 stars)</option>
                      <option value="3">⭐⭐⭐ (3 stars)</option>
                      <option value="2">⭐⭐ (2 stars)</option>
                      <option value="1">⭐ (1 star)</option>
                    </Form.Select>
                  </Form.Group>

                  <Button variant="success" type="submit">
                    Add Testimonial
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <h3 className="h5 mb-4">Your Testimonials</h3>
                {user.testimonials && user.testimonials.length > 0 ? (
                  user.testimonials.map((test, index) => (
                    <Card key={index} className="mb-3">
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <div>
                            <h5>{test.name}</h5>
                            <p className="text-muted small mb-2">
                              {test.role} {test.company && `at ${test.company}`}
                            </p>
                            <p className="mb-2">{test.message}</p>
                            <div>
                              {'⭐'.repeat(test.rating)}
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted">No testimonials yet.</p>
                )}
              </Card.Body>
            </Card>
          </>
        )}

        {/* Pro Settings Tab */}
        {activeTab === 'pro' && (
          <Card>
            <Card.Body>
              <h2 className="h4 mb-4">
                Pro Settings 
                {user.isPro && <Badge bg="warning" className="ms-2">PRO USER</Badge>}
              </h2>
              
              {!user.isPro ? (
                <div className="text-center py-5">
                  <h3 className="h5 mb-3">Upgrade to Pro</h3>
                  <p className="text-muted mb-4">
                    Unlock premium features including custom domains, advanced analytics, and more!
                  </p>
                  
                  <Card className="mb-4 mx-auto" style={{ maxWidth: '500px' }}>
                    <Card.Body>
                      <h4 className="h6 mb-3">Pro Features:</h4>
                      <ul className="text-start">
                        <li>✅ Custom Domain (yourname.com)</li>
                        <li>✅ Advanced Analytics</li>
                        <li>✅ Priority Support</li>
                        <li>✅ Remove "Built with CodeFolio" branding</li>
                        <li>✅ Unlimited Projects</li>
                        <li>✅ Premium Templates</li>
                      </ul>
                    </Card.Body>
                  </Card>
                  
                  <Button 
                    variant="warning" 
                    size="lg"
                    onClick={async () => {
                      try {
                        await upgradeToPro();
                        alert('Successfully upgraded to Pro! 🎉');
                        fetchProfile();
                      } catch (error) {
                        alert('Upgrade failed');
                      }
                    }}
                  >
                    Upgrade to Pro - $9.99/month
                  </Button>
                  <p className="text-muted mt-2 small">
                    (Demo: Click to activate Pro features for free)
                  </p>
                </div>
              ) : (
                <div>
                  <Alert variant="success">
                    🎉 You are a Pro user! Enjoy all premium features.
                  </Alert>
                  
                  <h5 className="mb-3">Custom Domain</h5>
                  <p className="text-muted mb-3">
                    Connect your own domain to your portfolio (e.g., yourname.com)
                  </p>
                  
                  <Form onSubmit={async (e) => {
                    e.preventDefault();
                    const domain = e.target.customDomain.value;
                    try {
                      await updateCustomDomain(domain);
                      alert('Custom domain updated successfully!');
                      fetchProfile();
                    } catch (error) {
                      alert(error.response?.data?.error || 'Failed to update domain');
                    }
                  }}>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Custom Domain</Form.Label>
                      <Form.Control
                        type="text"
                        name="customDomain"
                        placeholder="yourname.com"
                        defaultValue={user.customDomain || ''}
                      />
                      <Form.Text className="text-muted">
                        Enter your domain without http:// or https://
                      </Form.Text>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                      Save Custom Domain
                    </Button>
                    
                    {user.customDomain && (
                      <Button 
                        variant="outline-danger" 
                        className="ms-2"
                        onClick={async () => {
                          try {
                            await updateCustomDomain(null);
                            alert('Custom domain removed');
                            fetchProfile();
                          } catch (error) {
                            alert('Failed to remove domain');
                          }
                        }}
                      >
                        Remove Domain
                      </Button>
                    )}
                  </Form>
                  
                  {user.customDomain && (
                    <Alert variant="info" className="mt-3">
                      <strong>DNS Configuration:</strong><br/>
                      Add a CNAME record pointing to: <code>codefolio.app</code>
                    </Alert>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default Dashboard;