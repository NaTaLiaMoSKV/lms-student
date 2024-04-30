import { useParams } from "react-router-dom";
import PageContainer from "components/PageContainer";
import { useGetGroupQuery } from "../../redux/groupApi";
import GroupHeader from "./GroupHeader";
import GroupLessons from "./GroupLessons";
import Loader from "components/Loader";

const GroupPage = () => {
  const params = useParams();
  const { data: group, isFetching, isLoading } = useGetGroupQuery(params.id);

  return (
    <PageContainer
      title={group?.name ?? "Group"}
      breadcrumbs={[
        { title: "Groups", to: "/groups" },
        { title: group?.name ?? "Group", active: true },
      ]}
    >
      {(isFetching || isLoading) && <Loader />}
      {group && (
        <>
          <div className="mt-4">
            <GroupHeader group={group} />
          </div>
          <div className="mt-4">
            <GroupLessons group={group} />
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default GroupPage;
