import React from 'react';
import { theme } from '../../theme/token';

export const Table = ({ children, className = '' }) => (
  <div className={theme.elements.table.wrapper}>
    <table className={`${theme.elements.table.main} ${className}`}>
      {children}
    </table>
  </div>
);

export const Th = ({ children, className = '' }) => (
  <th className={`${theme.elements.table.th} ${className}`}>{children}</th>
);

export const Td = ({ children, isMono = true, className = '' }) => (
  <td className={`${isMono ? theme.elements.table.td : theme.elements.table.tdText} ${className}`}>
    {children}
  </td>
);

export const Tr = ({ children, className = '' }) => (
  <tr className={`${theme.elements.table.trHover} ${className}`}>{children}</tr>
);