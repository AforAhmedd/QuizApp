import React, { useState, useEffect } from "react";
import QuizList from "./QuizList";
import EditDraftQuiz from "./EditDraftQuiz";
import "./Styling/Quizzes.css";

function DraftQuizzes() {
  const [draftQuizzes, setDraftQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch draft quizzes from the backend
  useEffect(() => {
    const fetchDraftQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:3000/draft-quizzes");
        if (!response.ok) {
          throw new Error("Failed to fetch draft quizzes");
        }
        const data = await response.json();
        setDraftQuizzes(data);
      } catch (error) {
        console.error("Error fetching draft quizzes:", error);
        alert("Failed to load draft quizzes. Please try again.");
      }
    };

    fetchDraftQuizzes();
  }, []);

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setIsEditing(true);
  };

  // Publish a draft quiz
  const handleSaveQuiz = async (quiz) => {
    try {
      const response = await fetch(
        `http://localhost:3000/draft-quizzes/${quiz._id}/publish`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to publish quiz");
      }

      setDraftQuizzes((prevQuizzes) =>
        prevQuizzes.filter((q) => q._id !== quiz._id)
      );
      alert("Quiz published successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error publishing quiz:", error);
      alert("Failed to publish quiz. Please try again.");
    }
  };

  // Save changes to a draft quiz
  const handleSaveAsDraft = async (quiz) => {
    try {
      const response = await fetch(
        `http://localhost:3000/draft-quizzes/${quiz._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quiz),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update draft quiz");
      }

      const updatedQuiz = await response.json();
      setDraftQuizzes((prevQuizzes) =>
        prevQuizzes.map((q) => (q._id === updatedQuiz._id ? updatedQuiz : q))
      );
      alert("Draft quiz updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating draft quiz:", error);
      alert("Failed to update draft quiz. Please try again.");
    }
  };

  return (
    <div>
      <QuizList
        quizzes={draftQuizzes}
        title="Draft Quizzes"
        buttonLabel="Edit Quiz"
        onButtonClick={handleEditQuiz}
      />

      {isEditing && (
        <EditDraftQuiz
          draftQuiz={selectedQuiz}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveQuiz}
          onSaveAsDraft={handleSaveAsDraft}
        />
      )}
    </div>
  );
}

export default DraftQuizzes;
