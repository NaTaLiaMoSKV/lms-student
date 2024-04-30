import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NameValueRow from "components/NameValueRow";
import { useGetLessonQuery } from "../../redux/lessonApi";
import Loader from "components/Loader";
import handleLessonStatus from "utils/handleLessonStatus";
import { CardStyled } from "styles/Card.styled";

const LessonHeader = () => {
  const params = useParams();
  const {
    data: lesson,
    isFetching,
    isLoading,
  } = useGetLessonQuery(params.id, {
    refetchOnMountOrArgChange: true,
  });
  const { theme, meetingUrl } = lesson;

  return (
    <>
      {(isFetching || isLoading) && <Loader />}
      <CardStyled>
        <Card.Header>Lesson</Card.Header>
        <Card.Body>
          <NameValueRow
            name="Teacher"
            value={
              <div className="d-flex align-items-center gap-2">
                <img
                  src={
                    theme.course.teacher.image
                      ? `${process.env.REACT_APP_BASE_URL}/images/${theme.course.teacher.image}`
                      : "/user.png"
                  }
                  alt="Teacher"
                  variant="top"
                  style={{ height: "32px", width: "32px", borderRadius: "50%" }}
                />
                {theme.course.teacher.name}
              </div>
            }
          />
          <NameValueRow
            name="Url"
            value={
              meetingUrl ? (
                <a target="_blank" rel="noopener noreferrer" href={meetingUrl}>
                  {meetingUrl}
                </a>
              ) : (
                ""
              )
            }
          />
          <p className="status-info">{handleLessonStatus(lesson)}</p>
        </Card.Body>
      </CardStyled>
    </>
  );
};

export default LessonHeader;
