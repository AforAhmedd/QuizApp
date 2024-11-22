import React, { useState } from "react";
import "./Styling/QuizList.css";
import ViewQuizModal from "./ViewQuizModal";

const QuizList = ({ 
  quizzes = [], 
  title = "Quizzes", 
  buttonLabel = "View", 
  onButtonClick 
}) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleButtonClick = (quiz) => {
    if (onButtonClick) {
      onButtonClick(quiz);
    } else {
      setSelectedQuiz(quiz); // Fallback: show modal if no onButtonClick provided
    }
  };

  const handleCloseModal = () => {
    setSelectedQuiz(null);
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-header">{title}</h2>
      <div className="quiz-list">
        {quizzes.length === 0 ? (
          <p className="no-quizzes-message">No  {title} Here </p>
        ) : (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card">
              <div className="quiz-left">
                <h3>{quiz.title}</h3>
                <p>{quiz.description}</p>
              </div>
              <div className="quiz-right">
                <p><strong>Type:</strong> {quiz.quizType}</p>
                <p><strong>Time:</strong> {quiz.time} mins</p>
                <button 
                  className="view-button" 
                  onClick={() => handleButtonClick(quiz)}
                >
                  {buttonLabel}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal displayed only if no custom onButtonClick is provided */}
      {selectedQuiz && (
        <ViewQuizModal
          quizData={selectedQuiz}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default QuizList;
