import MinimalistTemplate from './MinimalistTemplate';
import CyberpunkTemplate from './CyberpunkTemplate';
import CorporateTemplate from './CorporateTemplate';

export const templates = {
  minimalist: MinimalistTemplate,
  cyberpunk: CyberpunkTemplate,
  corporate: CorporateTemplate
};

export const getTemplate = (templateId) => {
  return templates[templateId] || MinimalistTemplate;
};