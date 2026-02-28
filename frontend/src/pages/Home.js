import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function Home() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Container className="text-center">
        <h1 className="display-1 mb-3">CodeFolio</h1>
        <p className="lead text-muted mb-5">
          Build Your Developer Portfolio in Minutes
        </p>
        
        <div className="d-flex gap-3 justify-content-center">
          <Link to="/register">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="outline-primary" size="lg">
              Login
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Home;