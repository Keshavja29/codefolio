import React, { useEffect, useRef } from 'react';
import './LoadingScreen.css';

function LoadingScreen() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'CODEFOLIO0123456789@#$%^&*()';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen-matrix">
      <canvas ref={canvasRef} className="matrix-canvas"></canvas>
      <div className="matrix-content">
        <div className="matrix-logo">
          <div className="matrix-logo-inner">CF</div>
        </div>
        <h1 className="matrix-title">CodeFolio</h1>
        <div className="matrix-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="matrix-text">DECRYPTING YOUR DATA...</p>
        <div className="matrix-progress">
          <div className="matrix-progress-bar"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;