import { useGetGroupLessonsQuery } from "../../redux/groupApi";
import { gateDateTimeString } from "utils/dateUtils";
import { useNavigate } from "react-router-dom";
import Loader from "components/Loader";
import { TableStyled } from "styles/Table.styled";

const GroupLessonTableRow = ({ lesson, number }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`../lessons/${lesson.id}/content`);
  };

  return (
    <tr onClick={handleClick} style={{ cursor: "pointer" }}>
      <td>{number}</td>
      <td>{lesson.theme.title}</td>
      <td>{gateDateTimeString(lesson.startsAt)}</td>
    </tr>
  );
};

const GroupLessons = ({ group }) => {
  const {
    data: lessons,
    isFetching,
    isLoading,
  } = useGetGroupLessonsQuery(group.id);

  const isLessonsCreated = Boolean(lessons && lessons.length);

  return (
    <>
      {(isFetching || isLoading) && <Loader />}
      {isLessonsCreated ? (
        <>
          <h3 style={{ textAlign: "center", marginBottom: "12px" }}>Lessons</h3>
          <TableStyled hover>
            <thead>
              <tr>
                <th style={{ width: "60px" }}>#</th>
                <th>Title</th>
                <th style={{ width: "200px" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson, index) => (
                <GroupLessonTableRow
                  key={lesson.id}
                  lesson={lesson}
                  number={index + 1}
                />
              ))}
            </tbody>
          </TableStyled>
        </>
      ) : (
        <h3 style={{ textAlign: "center" }}>No lessons</h3>
      )}
    </>
  );
};

export default GroupLessons;
