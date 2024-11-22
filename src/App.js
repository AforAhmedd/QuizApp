import React, { useState } from 'react';
import Sidebar from './components/SideBar';
import Quizzes from './components/Quizzes';
import DraftQuizzes from './components/draftQuizzes';

function App() {
  const [selectedMenu, setSelectedMenu] = useState(''); // Tracks which menu is selected

  return (
    <div className="App">
      <Sidebar onMenuSelect={setSelectedMenu} />
      
      {/* Render components based on selected menu */}
      {selectedMenu === 'quizzes' && <Quizzes />}
      {selectedMenu === 'draft-quizzes' && <DraftQuizzes/>}
    </div>
  );
}

export default App;
