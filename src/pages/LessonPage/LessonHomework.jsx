import { useLocation, useParams } from "react-router-dom";
import { useGetThemeHomeworkQuery } from "../../redux/themeApi";
import { useGetLessonQuery } from "../../redux/lessonApi";
import { Card } from "react-bootstrap";
import Message from "components/Message";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import Loader from "components/Loader";
import { CardStyled } from "styles/Card.styled";
import SendMessageForm from "components/SendMessageForm";
import { useGetLessonHomeworkQuery } from "../../redux/homeworkApi";

const LessonHomework = () => {
  const { id: lessonId } = useParams();
  const { hash } = useLocation();

  const { data: lesson, isFetching, isLoading } = useGetLessonQuery(lessonId);
  const {
    data: homework,
    isFetching: isHomeworkFetching,
    isLoading: isHomeworkLoading,
    refetch: refetchHomework,
  } = useGetLessonHomeworkQuery(lessonId, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: themeHomework,
    isFetching: isThemeHomeworkFetching,
    isLoading: isThemeHomeworkLoading,
  } = useGetThemeHomeworkQuery(lesson.theme.id, {
    skip: !lesson,
  });

  useEffect(() => {
    if (hash !== "") {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [hash]);

  return (
    <>
      {(isFetching ||
        isLoading ||
        isHomeworkFetching ||
        isHomeworkLoading ||
        isThemeHomeworkFetching ||
        isThemeHomeworkLoading) && <Loader />}

      {homework && (
        <CardStyled className="mt-4 mb-4">
          <Card.Body>
            {themeHomework?.data ? (
              <div dangerouslySetInnerHTML={{ __html: themeHomework?.data }} />
            ) : (
              <Card.Text>No data</Card.Text>
            )}
            {homework?.approved && (
              <p className="status-info mt-4">
                Approved <FaCheck style={{ marginLeft: "3px" }} />
              </p>
            )}
          </Card.Body>
          <hr />
          <Card.Header>
            <Card.Subtitle style={{ textAlign: "center" }}>
              Chat with {lesson.theme.course.teacher.name}
            </Card.Subtitle>
          </Card.Header>
          {homework.messages.length !== 0 && (
            <Card.Body className="card-body-chat">
              {homework.messages.map((message) => (
                <Message
                  key={message.id}
                  text={message.text}
                  date={message.createdAt}
                  incoming={message.response}
                  id={message.id}
                />
              ))}
            </Card.Body>
          )}
          <Card.Footer>
            <SendMessageForm homework={homework} refetch={refetchHomework} />
          </Card.Footer>
        </CardStyled>
      )}
    </>
  );
};

export default LessonHomework;
