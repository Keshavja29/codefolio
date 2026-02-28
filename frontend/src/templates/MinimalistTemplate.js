import React from 'react';
import ContactForm from '../components/ContactForm';

function MinimalistTemplate({ user }) {
  return (
    <div className="minimalist-template">
      {/* Your template code */}
      
      {/* Contact Section */}
      <section id="contact">
        <ContactForm />
      </section>
    </div>
  );
}

export default MinimalistTemplate;