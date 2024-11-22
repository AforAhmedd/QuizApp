import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onMenuSelect }) => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul className="sidebar-options">
        <li 
          className="sidebar-option" 
          onClick={() => onMenuSelect('quizzes')}
        >
          <strong>Quizzes</strong>
        </li>
        <li 
          className="sidebar-option" 
          onClick={() => onMenuSelect('draft-quizzes')}
        >
          <strong>Draft Quizzes</strong>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
