import { useParams } from "react-router-dom";
import { useGetThemeContentQuery } from "../../redux/themeApi";
import { useGetLessonQuery } from "../../redux/lessonApi";
import { Card } from "react-bootstrap";
import Loader from "components/Loader";
import { CardStyled } from "styles/Card.styled";

const LessonContent = () => {
  const params = useParams();
  const { data: lesson, isFetching, isLoading } = useGetLessonQuery(params.id);
  const {
    data: content,
    isFetching: isContentFetching,
    isLoading: isContentLoading,
  } = useGetThemeContentQuery(lesson.theme.id, {
    skip: !lesson,
  });

  return (
    <>
      {(isFetching || isLoading || isContentFetching || isContentLoading) && (
        <Loader />
      )}
      <CardStyled className="mt-4 mb-4">
        <Card.Body>
          {content?.data ? (
            <div dangerouslySetInnerHTML={{ __html: content?.data }} />
          ) : (
            <Card.Text>No data</Card.Text>
          )}
        </Card.Body>
      </CardStyled>
    </>
  );
};

export default LessonContent;
