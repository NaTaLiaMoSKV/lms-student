import { useMemo } from "react";
import { useGetLessonsQuery } from "../../../redux/lessonApi";
import { useGetStudentGroupsQuery } from "../../../redux/groupApi";
import Loader from "components/Loader";
import GroupStatisctics from "./GroupStatisctics";
import {
  StudentGroupsContainer,
  StudentGroupsWrapper,
} from "./StudentGroups.styled";

const StudentGroups = () => {
  const {
    data: groups,
    isFetching: isGroupsFetching,
    isLoading: isGroupsLoading,
  } = useGetStudentGroupsQuery();
  const {
    data: lessons,
    isFetching,
    isLoading,
  } = useGetLessonsQuery({
    refetchOnMountOrArgChange: true,
  });

  // Groups with lessons
  const filteredGroups = useMemo(() => {
    const lessonGroupNames = new Set(
      lessons?.map((lesson) => lesson.group.name)
    );
    return groups
      ?.filter((group) => lessonGroupNames.has(group.name))
      .sort((a, b) => b.startsAfter.getTime() - a.startsAfter.getTime());
  }, [lessons, groups]);

  return (
    <StudentGroupsContainer>
      {(isFetching || isLoading || isGroupsFetching || isGroupsLoading) && (
        <Loader />
      )}
      <h2>Current groups</h2>
      <StudentGroupsWrapper>
        {filteredGroups?.map((group) => (
          <GroupStatisctics key={group.id} group={group} />
        ))}
      </StudentGroupsWrapper>
    </StudentGroupsContainer>
  );
};

export default StudentGroups;
