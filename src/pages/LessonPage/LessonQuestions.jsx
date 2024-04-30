import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useGetLessonQuestionsQuery } from "../../redux/questionsApi";
import Question from "components/Question";
import Loader from "components/Loader";
import { useGetLessonQuery } from "../../redux/lessonApi";
import { CardStyled } from "styles/Card.styled";
import SendQuestionForm from "components/SendQuestionForm";

const LessonQuestions = () => {
  const { id: lessonId } = useParams();
  const {
    data: lesson,
    isLessonFetching,
    isLessonLoading,
  } = useGetLessonQuery(lessonId);
  const {
    data: questions,
    isFetching,
    isLoading,
  } = useGetLessonQuestionsQuery(lessonId, {
    refetchOnMountOrArgChange: true,
  });

  const hasQuestions = questions && questions.length > 0;
  const isLoaded =
    isFetching || isLoading || isLessonFetching || isLessonLoading;

  return (
    <>
      {isLoaded && <Loader />}
      {hasQuestions || !lesson.finishedAt ? (
        <CardStyled className="mt-4 mb-4">
          <Card.Body className="card-body-questions">
            {hasQuestions &&
              questions.map((question) => (
                <Question key={question.id} question={question} />
              ))}
          </Card.Body>
          {!lesson?.finishedAt && (
            <Card.Footer>
              <SendQuestionForm lesson={lesson} />
            </Card.Footer>
          )}
        </CardStyled>
      ) : (
        <h3 className="text-center mt-2">No questions</h3>
      )}
    </>
  );
};

export default LessonQuestions;
