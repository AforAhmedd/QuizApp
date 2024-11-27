import React, { useState } from "react";
import Modal from "./Modal";
import TextField from "./Fields/TextField";
import OptionsField from "./Fields/OptionsField";
import "./Styling/createQuiz.css";

const CreateQuiz = ({ onClose, onSubmit }) => {
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    time: 15,
    quizType: "MCQs",
    questions: [{ id: 1, text: "", options: ["", "", "", ""] }],
  });
  
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [IsSaving,setIsSaving]=useState(false);
  const predefinedTimes = [15, 30, 60].map((t) => `${t} mins`);
  const quizTypes = ["MCQs", "Short Q/A", "Filling the Blanks"];

  const updateField = (e) => {
    const { id, value } = e.target;
    setQuizData((prev) => ({
      ...prev,
      [id]: id === "time" ? Number(value) : value,
    }));
  };

  const updateQuestion = (index, key, value) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? { ...q, [key]: value } : q
      ),
    }));
  };

  const addQuestion = () => {
    setQuizData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { id: prev.questions.length + 1, text: "", options: ["", "", "", ""] },
      ],
    }));
  };

  const updateOption = (qIndex, optIndex, value) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((opt, oi) =>
                oi === optIndex ? value : opt
              ),
            }
          : q
      ),
    }));
  };

  const handleSubmit = () => {
    const { title, description, questions } = quizData;

    if (!title.trim()) {
      alert("Quiz title is required.");
      return;
    }
    if (!description.trim()) {
      alert("Quiz description is required.");
      return;
    }
    if (questions.some((q) => !q.text.trim())) {
      alert("All question fields must be filled.");
      return;
    }

    onSubmit(quizData);
  };

  const handleCancelQuiz = () => {
    setShowConfirmationModal(true);
  };

  const handleSaveAsDraft = async () => {
    setIsSaving(true); // Indicate that the saving process has started
  
    try {
      const response = await fetch("http://localhost:3000/draft-quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData), // Send the quiz data to the backend
      });
  
      if (!response.ok) {
        throw new Error("Failed to save draft quiz");
      }
  
      const savedDraftQuiz = await response.json();
      console.log("Quiz saved as draft:", savedDraftQuiz);
  
      setShowConfirmationModal(false);
      onClose(); 
  
      alert("Quiz saved as draft successfully!");
    } catch (error) {
      console.error("Error saving draft quiz:", error);
      alert("Failed to save draft quiz. Please try again.");
    } finally {
      setIsSaving(false); 
    }
  };
  
  const handleDiscardQuiz = () => {
    setShowConfirmationModal(false);
    onClose();
  };

  const body = (
    <>
      <TextField
        id="title"
        label="Quiz Title"
        value={quizData.title}
        updateField={updateField}
        placeholder="Enter Quiz Title"
      />
      <TextField
        id="description"
        label="Quiz Description"
        value={quizData.description}
        updateField={updateField}
      />
      <OptionsField
        id="time"
        label="Quiz Time (minutes)"
        options={predefinedTimes}
        value={quizData.time}
        updateField={updateField}
      />
      <OptionsField
        id="quizType"
        label="Quiz Type"
        options={quizTypes}
        value={quizData.quizType}
        updateField={updateField}
      />

      <div className="scrollable-section">
        <h3>Questions</h3>
        {quizData.questions.map((question, qIndex) => (
          <div className="question-container" key={question.id}>
            <label>Question {qIndex + 1}</label>
            <textarea
              className="form-control question-field"
              value={question.text}
              onChange={(e) => updateQuestion(qIndex, "text", e.target.value)}
              placeholder="Enter question"
              required
            />
            {quizData.quizType === "MCQs" && (
              <div className="options-container">
                {question.options.map((option, oIndex) => (
                  <textarea
                    className="form-control option-field"
                    key={oIndex}
                    value={option}
                    onChange={(e) =>
                      updateOption(qIndex, oIndex, e.target.value)
                    }
                    placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                    required
                  />
                ))}
              </div>
            )}
          </div>
        ))}
        <button className="add-question-button" onClick={addQuestion}>
          Add Question
        </button>
      </div>

      <div className="button-container">
        <button className="btn" onClick={handleSubmit}>
          Save Quiz
        </button>
        <button className="btn" onClick={handleCancelQuiz}>
          Cancel
        </button>
      </div>
    </>
  );

  return (
    <>
      <Modal
        title="Create New Quiz"
        isOpen={true}
        onClose={() => {
          setShowConfirmationModal(true);
        }}
        body={body}
      />
      {showConfirmationModal && (
        <Modal
          title="Do you want to save the quiz as a draft?"
          isOpen={true}
          onClose={() => setShowConfirmationModal(false)}
          body={
            <div className="button-container">
              <button className="btn" onClick={handleSaveAsDraft}>
                Save as Draft
              </button>
              <button className="btn" onClick={handleDiscardQuiz}>
                No
              </button>
            </div>
          }
        />
      )}
    </>
  );
};

export default CreateQuiz;
