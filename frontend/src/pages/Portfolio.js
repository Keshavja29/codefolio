import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPortfolio } from '../services/api';
import { getTemplate } from '../templates';

function Portfolio() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

    useEffect(() => {
    fetchPortfolio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const fetchPortfolio = async () => {
    try {
      const response = await getPortfolio(username);
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError('Portfolio not found');
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ padding: '50px', textAlign: 'center' }}>{error}</div>;

  const TemplateComponent = getTemplate(user.templateId);

  return <TemplateComponent user={user} />;
}

export default Portfolio;