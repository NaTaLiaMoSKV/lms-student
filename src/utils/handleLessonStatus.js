import { gateDateString, gateTimeString } from "./dateUtils";

const handleLessonStatus = (lesson) => {
  return !lesson.startedAt
    ? `Will start on ${gateDateString(lesson.startsAt)} at ${gateTimeString(
        lesson.startsAt
      )}`
    : lesson.finishedAt
    ? `Finished on ${gateDateString(lesson.finishedAt)} at ${gateTimeString(
        lesson.finishedAt
      )}`
    : `Started on ${gateDateString(lesson.startedAt)} at ${gateTimeString(
        lesson.startedAt
      )}`;
};

export default handleLessonStatus;
