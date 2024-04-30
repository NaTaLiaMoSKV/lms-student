import PageContainer from "components/PageContainer";
import { useLocation, useNavigate } from "react-router-dom";

import { equalsDates } from "utils/dateUtils";
import { useGetLessonsQuery } from "../../redux/lessonApi";
import { useMemo, useState } from "react";
import Loader from "components/Loader";
import handleLessonStatus from "utils/handleLessonStatus";
import { TableStyled } from "styles/Table.styled";
import PaginationBlock from "components/PaginationBlock";

const LessonTableRow = ({ lesson }) => {
  const { theme, group } = lesson;
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`${lesson.id}`, { state: { from: location } });
  };

  return (
    <tr onClick={handleClick} style={{ cursor: "pointer" }}>
      <td>{theme.title}</td>
      <td>{group.name}</td>
      <td>{theme.course.title}</td>
      <td>{handleLessonStatus(lesson)}</td>
      <td style={{ fontSize: "12px" }}>{lesson.type}</td>
    </tr>
  );
};

const selectType = ({ startedAt, finishedAt, startsAt }) => {
  const now = new Date();
  if (
    equalsDates(startsAt, now) ||
    equalsDates(startedAt, now) ||
    equalsDates(finishedAt, now)
  )
    return "Today";
  else if (startedAt && !finishedAt) return "Active";
  else if (finishedAt) return "Finished";
  else if (!startedAt && !finishedAt) return "New";
  else return "";
};

const LessonsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: lessons,
    isFetching,
    isLoading,
  } = useGetLessonsQuery({
    refetchOnMountOrArgChange: true,
  });

  const lessonsPerPage = 5;
  const totalPages = Math.ceil(lessons?.length / lessonsPerPage);

  const filteredLessons = useMemo(() => {
    return lessons?.map((lesson) => {
      return {
        ...lesson,
        type: selectType(lesson),
      };
    });
  }, [lessons]);

  const getCurrentPageLessons = () => {
    if (!lessons) return [];

    const startIndex = (currentPage - 1) * lessonsPerPage;
    const endIndex = startIndex + lessonsPerPage;
    return filteredLessons.slice(startIndex, endIndex);
  };

  return (
    <>
      {(isFetching || isLoading) && <Loader />}
      <div className="m-4 mt-0 mb-2">
        <PaginationBlock
          page={currentPage}
          setPage={setCurrentPage}
          pages={totalPages}
        />
      </div>
      <div className="m-4 mt-0">
        {filteredLessons?.length > 0 && (
          <TableStyled hover>
            <thead>
              <tr>
                <th>Lesson</th>
                <th>Group</th>
                <th>Course</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lessons &&
                getCurrentPageLessons().map((lesson) => (
                  <LessonTableRow key={lesson.id} lesson={lesson} />
                ))}
            </tbody>
          </TableStyled>
        )}
        {filteredLessons?.length === 0 && (
          <h5 style={{ textAlign: "center", marginTop: "15px" }}>No lessons</h5>
        )}
      </div>
    </>
  );
};

const LessonsPage = () => (
  <PageContainer title="Lessons">
    <div className="mt-4">
      <LessonsTable />
    </div>
  </PageContainer>
);

export default LessonsPage;
