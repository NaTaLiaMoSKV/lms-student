import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { QuestionButton, QuestionStyled } from "styles/Question.styled";

const Question = ({ question }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <QuestionStyled>
      <div className="question-wrapper">
        {question.text}
        {question.answer && (
          <QuestionButton type="button" onClick={toggleAnswer}>
            <FaArrowDown
              style={{
                color: "rgb(136 136 136)",
                transform: `rotate(${showAnswer ? "180deg" : "0deg"})`,
              }}
            />
          </QuestionButton>
        )}
      </div>
      {showAnswer && (
        <>
          <hr />
          <p className="answer">{question.answer}</p>
        </>
      )}
    </QuestionStyled>
  );
};

export default Question;
