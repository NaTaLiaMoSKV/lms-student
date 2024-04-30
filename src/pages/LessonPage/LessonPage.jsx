import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import PageContainer from "components/PageContainer";
import { useGetLessonQuery } from "../../redux/lessonApi";
import { Nav } from "react-bootstrap";
import LessonHeader from "./LessonHeader";
import Loader from "components/Loader";
import { TbLock } from "react-icons/tb";
import "./LessonPage.css";

const LessonPage = () => {
  const params = useParams();
  const { data: lesson, isFetching, isLoading } = useGetLessonQuery(params.id);

  return (
    <PageContainer
      title={lesson?.theme.title ?? "Lesson"}
      breadcrumbs={[
        { title: "Lessons", to: "/lessons" },
        { title: lesson?.theme.title ?? "Lesson" },
      ]}
    >
      {(isFetching || isLoading) && <Loader />}
      {lesson && (
        <>
          <div className="mt-4">
            <LessonHeader lesson={lesson} />
          </div>
          <div
            className="mt-4"
            style={{ display: lesson.startedAt ? "block" : "none" }}
          >
            <Nav
              className="border-0"
              justify
              variant="tabs"
              defaultActiveKey=""
            >
              <NavLink as={Link} to="content" className="nav-link-custom">
                Content
              </NavLink>
              {lesson.finishedAt && (
                <NavLink as={Link} to="homework" className="nav-link-custom">
                  Homework
                </NavLink>
              )}
              {!lesson.finishedAt && (
                <NavLink
                  as={Link}
                  to="homework"
                  className="nav-link-custom disabled-link"
                >
                  <TbLock />
                  <p>Homework</p>
                </NavLink>
              )}
              <NavLink as={Link} to="questions" className="nav-link-custom">
                Questions
              </NavLink>
            </Nav>
            <Outlet />
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default LessonPage;
