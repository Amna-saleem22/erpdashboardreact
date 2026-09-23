import { theme } from '../../theme/token';

export const Table = ({ children, className = '' }) => (
  <div className={theme.elements.table.wrapper}>
    <table className={`${theme.elements.table.main} ${className}`}>
      {children}
    </table>
  </div>
);

export const Th = ({ children, className = '', align = 'left' }) => (
  <th className={`${theme.elements.table.th} ${align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'} ${className}`}>{children}</th>
);

export const Td = ({ children, isMono = true, className = '', align = 'left', colSpan }) => (
  <td colSpan={colSpan} className={`${isMono ? theme.elements.table.td : theme.elements.table.tdText} ${align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
    {children}
  </td>
);

export const Tr = ({ children, className = '' }) => (
  <tr className={`${theme.elements.table.trHover} ${className}`}>{children}</tr>
);