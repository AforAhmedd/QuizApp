import React, { useState, useEffect } from "react";
import QuizList from "./QuizList";
import CreateQuiz from "./CreateQuiz";
import "./Styling/createQuiz.css";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch quizzes from the backend when the component mounts
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:3000/quizzes"); // API endpoint for quizzes
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Add a new quiz to the backend
  const addQuiz = async (newQuiz) => {
    try {
      const response = await fetch("http://localhost:3000/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuiz),
      });

      if (!response.ok) {
        throw new Error("Failed to save quiz");
      }

      const savedQuiz = await response.json();
      setQuizzes((prevQuizzes) => [...prevQuizzes, savedQuiz]);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Failed to save quiz. Please try again.");
    }
  };

  const handleCancelQuiz = () => {
    setShowModal(false);
  };

  const onAddQuizClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading quizzes...</p>
      ) : (
        <QuizList
          quizzes={quizzes}
          title="Quizzes"
          buttonLabel="View Quiz"
        />
      )}
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
