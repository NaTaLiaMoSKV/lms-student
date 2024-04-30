import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./redux/authSlice";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import HomePage from "pages/HomePage";
import NotFoundPage from "pages/NotFoundPage";
import Layout from "pages/Layout";
import ProtectedRoute from "components/ProtectedRoute";
import LessonPage from "pages/LessonPage";
import LessonsPage from "pages/LessonsPage";
import LessonQuestions from "pages/LessonPage/LessonQuestions";
import LessonHomework from "pages/LessonPage/LessonHomework";
import LessonContent from "pages/LessonPage/LessonContent";
import NotificationsPage from "pages/NotificationsPage";
import SettingsPage from "pages/SettingsPage";
import RegistrationPage from "pages/RegistrationPage";
import GroupsPage from "pages/GroupsPage";
import GroupPage from "pages/GroupPage";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchUser());
    navigate(location);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration/:token" element={<RegistrationPage />} />
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="groups"
            element={
              <ProtectedRoute>
                <GroupsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="groups/:id"
            element={
              <ProtectedRoute>
                <GroupPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="lessons"
            element={
              <ProtectedRoute>
                <LessonsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="lessons/:id"
            element={
              <ProtectedRoute>
                <LessonPage />
              </ProtectedRoute>
            }
          >
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <LessonContent />
                </ProtectedRoute>
              }
            />
            <Route
              path="content"
              element={
                <ProtectedRoute>
                  <LessonContent />
                </ProtectedRoute>
              }
            />
            <Route
              path="homework"
              element={
                <ProtectedRoute>
                  <LessonHomework />
                </ProtectedRoute>
              }
            />
            <Route
              path="questions"
              element={
                <ProtectedRoute>
                  <LessonQuestions />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
