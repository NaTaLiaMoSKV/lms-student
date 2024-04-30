import PageContainer from "components/PageContainer";
import Schedule from "./Schedule/Schedule";
import { useAuth } from "hooks/useAuth";
import StudentGroups from "./StudentGroups";
import Reviews from "./Reviews/Reviews";
import Benefits from "./Benefits";
import Courses from "./Courses/Courses";

const HomePage = () => {
  const { user } = useAuth();
  if (user) {
    document.title = "LMS - Home";
  } else {
    document.title = "LMS";
  }

  return (
    <>
      {user && (
        <PageContainer title={"Home"}>
          <Schedule />
          <StudentGroups />
        </PageContainer>
      )}
      {!user && (
        <>
          <Courses />
          <Benefits />
          <Reviews />
        </>
      )}
    </>
  );
};

export default HomePage;
