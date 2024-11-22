import React, { useState, useEffect } from 'react';
import QuizList from './QuizList'; 
import CreateQuiz from './CreateQuiz'; 
import './Quizzes.css';
function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedQuizzes = localStorage.getItem('quizzes');
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
    }
  }, []);

  const addQuiz = (newQuiz) => {
    const updatedQuizzes = [...quizzes, { id: quizzes.length + 1, ...newQuiz }];
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    setShowModal(false);
  };

  const handleCancelQuiz = () => {
    setShowModal(false);
  };
const onAddQuizClick=() => {
  setShowModal(true);
};


  return (
    <div>
      <QuizList
        quizzes={quizzes}
        title="Quizzes"
        buttonLabel="View Quiz"
      />
      <div className="add-quiz-icon-container" onClick={onAddQuizClick}>
        <img 
          src={`${process.env.PUBLIC_URL}/more.png`} 
          alt="Add Quiz" 
          className="add-icon" 
        />
        <span className="tooltip">Add Quiz</span>
      </div>
      {showModal && (
        <CreateQuiz 
          onClose={handleCancelQuiz} 
          onSubmit={addQuiz} 
        />
      )}
    </div>
  );
}




export default Quizzes;
