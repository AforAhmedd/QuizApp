import React, { useEffect } from 'react';
import './Styling/ViewQuizModal.css';  // Import your CSS styles here

const ViewQuizModal = ({ quizData, onClose }) => {
  // Add the useEffect hook here
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        onClose(); // Close modal when Escape is pressed
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress); // Clean up on unmount
    };
  }, [onClose]); // Dependency array ensures it works with the correct onClose function

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="quiz-title">{quizData.title}</h2>
        <p className="quiz-description">{quizData.description}</p>

        <div className="questions">
          {quizData.questions.map((question, index) => (
            <div key={index} className="question">
              <p className="question-text"><strong>Question {index + 1}:</strong> {question.text}</p>

              {quizData.quizType === 'MCQs' && (
                <ul className="options-list">
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex} className="option">
                      <strong>{String.fromCharCode(65 + optionIndex)}. </strong>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <button className="close-buttonn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ViewQuizModal;
