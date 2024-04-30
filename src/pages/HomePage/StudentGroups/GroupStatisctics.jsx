import { useMemo } from "react";
import { useGetGroupLessonsQuery } from "../../../redux/groupApi";
import PieChart from "components/PieChart";
import { useNavigate } from "react-router-dom";
import { StudentGroup } from "./StudentGroups.styled";
import Loader from "components/Loader";

const GroupStatisctics = ({ group }) => {
  const navigate = useNavigate();
  const {
    data: lessons,
    isFetching,
    isLoading,
  } = useGetGroupLessonsQuery(group.id);

  const countPercentage = useMemo(() => {
    return (
      (lessons?.filter((lesson) => lesson.finishedAt).length /
        lessons?.length) *
      100
    );
  }, [lessons]);

  return (
    <StudentGroup onClick={() => navigate(`../groups/${group.id}`)}>
      {(isFetching || isLoading) && <Loader />}
      <h4>{group.name}</h4>
      <PieChart percentage={countPercentage} />
      <p className="chart-description">of the course completed</p>
    </StudentGroup>
  );
};

export default GroupStatisctics;
