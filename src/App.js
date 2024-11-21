import React, { useState,useEffect } from 'react';
import QuizList from './components/QuizList';
import CreateQuiz from './components/CreateQuiz';
import SideBar from './components/SideBar';
import Modal from './components/Modal';

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);


  // Load quizzes from local storage on app initialization
  useEffect(() => {
    const storedQuizzes = localStorage.getItem('quizzes');
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
    }
  }, []);

  const addQuiz = (newQuiz) => {
    const updatedQuizzes = [...quizzes, { id: quizzes.length + 1, ...newQuiz }];
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes)); // Save to local storage
    setShowModal(false); // Close the quiz creation modal
  };
  const handleCancelQuiz = () => {
    setShowModal(false); // Close the main modal
    setShowConfirmationModal(true); // Open the confirmation modal
  };

  const handleDiscardQuiz = () => {
    setShowConfirmationModal(false); // Close the confirmation modal
  };

  const handleSaveAsDraft = () => {
    setShowConfirmationModal(false); // Close the confirmation modal
    // Additional logic for saving as draft can go here
    console.log('Quiz saved as draft');
  };

  return (
    <div className="App">
      <SideBar />
      <QuizList 
        quizzes={quizzes} 
        onAddQuizClick={() => setShowModal(true)}
      />

      {/* Create Quiz Modal */}
      {showModal && (
        <CreateQuiz 
          onClose={handleCancelQuiz} 
          onSubmit={addQuiz} 
        />
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <Modal
          title="Are You Sure?"
          isOpen={true}
          onClose={handleDiscardQuiz} // Close confirmation modal
          body={
            <div className="button-container">
              <button className="btn" onClick={handleSaveAsDraft}>
                Save as Draft
              </button>
              <button className="btn" onClick={handleDiscardQuiz}>
                Discard
              </button>
            </div>
          }
        />
      )}
    </div>
  );
}

export default App;
