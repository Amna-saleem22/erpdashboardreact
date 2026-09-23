import { theme } from '../../theme/token';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`${theme.elements.div.card} ${className}`}>
      {children}
    </div>
  );
};

export default Card;