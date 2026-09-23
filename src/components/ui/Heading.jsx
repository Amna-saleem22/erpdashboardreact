import { theme } from '../../theme/token';

const Heading = ({ level = 'h1', children, className = '' }) => {
  const Tag = level; // h1, h2, h3, h4
  
  // Design Tokens se heading preset pick kar raha hai
  const styleClass = theme.elements.h[level] || theme.elements.h.h1;

  return <Tag className={`${styleClass} ${className}`}>{children}</Tag>;
};

export default Heading;