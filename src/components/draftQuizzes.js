import React, { useState, useEffect } from 'react';
import QuizList from './QuizList'; 
import './Quizzes.css';

function DraftQuizzes() {
  const [draftQuizzes, setDraftQuizzes] = useState([]);

  useEffect(() => {
    const storedDraftQuizzes = localStorage.getItem('draftQuizzes');
    if (storedDraftQuizzes) {
      setDraftQuizzes(JSON.parse(storedDraftQuizzes));
    }
  }, []);

  return (
    <div>
      <QuizList
        quizzes={draftQuizzes}
        title="Draft Quizzes"
        buttonLabel="Edit Quiz"
        onButtonClick={(quiz) => console.log("Edit Draft Quiz clicked for:", quiz)}
      />
    </div>
  );
}

export default DraftQuizzes;
