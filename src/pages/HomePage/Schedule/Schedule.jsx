import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { gateDateString, gateTimeString } from "utils/dateUtils";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLessonsQuery } from "../../../redux/lessonApi";
import Loader from "components/Loader";
import "./schedule.css";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const currentDate = new Date();

  const handleCardClick = (lessonId) => {
    navigate(`/lessons/${lessonId}/content`);
  };

  const handleDateClick = (date) => {
    setSelectedDate(gateDateString(date));
  };

  const { data: lessons, isLoading, isFetching } = useGetLessonsQuery();
  const dates = lessons?.map((lesson) => gateDateString(lesson.startsAt));

  const renderTileContent = ({ date }) => {
    const dateString = gateDateString(date);
    const lessonsArray = lessons.filter(
      (les) => gateDateString(les.startsAt) === dateString
    );
    if (lessonsArray.length > 0) {
      if (dateString === selectedDate) {
        return (
          <div className="card-container">
            <Card className="schedule-card">
              {lessonsArray.map((lesson, index) => (
                <div key={lesson.id}>
                  {index !== 0 && <hr />}
                  <Card.Body onClick={() => handleCardClick(lesson.id)}>
                    <Card.Title>Lesson {lesson.theme.title}</Card.Title>
                    {lesson.finishedAt && (
                      <Card.Text>
                        Finished at {gateTimeString(lesson.finishedAt)}
                      </Card.Text>
                    )}
                    {!lesson.finishedAt && (
                      <Card.Text>
                        Starts at {gateTimeString(lesson.startsAt)}
                      </Card.Text>
                    )}
                  </Card.Body>
                </div>
              ))}
            </Card>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="schedule-container">
      {(isFetching || isLoading) && <Loader />}
      <h2 style={{ marginBottom: "15px", textAlign: "center" }}>Schedule</h2>
      {dates && (
        <Calendar
          className="schedule-calendar"
          onClickDay={handleDateClick}
          tileClassName={({ date }) =>
            dates.includes(gateDateString(date))
              ? date < currentDate
                ? "highlighted-past"
                : "highlighted"
              : null
          }
          tileContent={renderTileContent}
        />
      )}
    </div>
  );
};

export default Schedule;
