import React, { useState, useEffect } from "react";
import QuizList from "./QuizList";
import EditDraftQuiz from "./EditDraftQuiz";
import "./Styling/Quizzes.css";

function DraftQuizzes() {
  const [draftQuizzes, setDraftQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedDraftQuizzes = localStorage.getItem("draftQuizzes");
    if (storedDraftQuizzes) {
      setDraftQuizzes(JSON.parse(storedDraftQuizzes));
    }
  }, []);

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setIsEditing(true);
  };

  const handleSaveQuiz = (quiz) => {
    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    localStorage.setItem("quizzes", JSON.stringify([...storedQuizzes, quiz]));

    const updatedDraftQuizzes = draftQuizzes.filter((q) => q.id !== quiz.id);
    setDraftQuizzes(updatedDraftQuizzes);
    localStorage.setItem("draftQuizzes", JSON.stringify(updatedDraftQuizzes));

    setIsEditing(false);
    setSelectedQuiz(null);
  };

  const handleSaveAsDraft = (quiz) => {
    const updatedDraftQuizzes = draftQuizzes.map((q) =>
      q.id === quiz.id ? quiz : q
    );
    setDraftQuizzes(updatedDraftQuizzes);
    localStorage.setItem("draftQuizzes", JSON.stringify(updatedDraftQuizzes));

    setIsEditing(false);
    setSelectedQuiz(null);
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
