import PageContainer from "components/PageContainer";
import { Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetStudentGroupsQuery } from "../../redux/groupApi";
import { gateDateString } from "utils/dateUtils";
import { useEffect, useMemo, useState } from "react";
import Loader from "components/Loader";
import { TableStyled } from "styles/Table.styled";

const GroupTableRow = ({ group }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${group.id}`);
  };

  return (
    <tr onClick={handleClick} style={{ cursor: "pointer" }}>
      <td>{group.name}</td>
      <td>{group.course.title}</td>
      <td>{gateDateString(group.startsAfter)}</td>
      <td style={{ fontSize: "12px" }}>{group.type}</td>
    </tr>
  );
};

const Types = {
  all: "",
  active: "Active",
  finished: "Finished",
  new: "New",
};

const selectType = ({ startedAt, finishedAt }) => {
  if (startedAt && !finishedAt) return Types.active;
  else if (finishedAt) return Types.finished;
  else if (!startedAt && !finishedAt) return Types.new;
  else return Types.all;
};

const GroupsPage = () => {
  const { data: groups, isFetching, isLoading } = useGetStudentGroupsQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState(searchParams.get("type") ?? Types.all);

  useEffect(() => {
    const nextParams = {};
    if (type !== Types.all) {
      nextParams.type = type;
    }
    setSearchParams(nextParams);
  }, [type, setSearchParams]);

  const selectedGroups = useMemo(() => {
    const mappedGroups = groups?.map((group) => {
      return {
        ...group,
        type: selectType(group),
      };
    });
    if (type === "") return mappedGroups;
    return mappedGroups ? mappedGroups.filter((g) => g.type === type) : [];
  }, [groups, type]);

  return (
    <PageContainer title={"Groups"}>
      {(isFetching || isLoading) && <Loader />}
      <div className="m-4">
        <Form.Group>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value={Types.all}>All</option>
            <option value={Types.active}>Active</option>
            <option value={Types.finished}>Finished</option>
            <option value={Types.new}>New</option>
          </select>
        </Form.Group>
      </div>
      <div className="m-4">
        {selectedGroups?.length > 0 && (
          <TableStyled hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Start date</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {groups &&
                selectedGroups.map((group) => (
                  <GroupTableRow key={group.id} group={group} />
                ))}
            </tbody>
          </TableStyled>
        )}
        {selectedGroups?.length === 0 && (
          <h5 style={{ textAlign: "center", marginTop: "15px" }}>
            No {type.toLocaleLowerCase()} groups
          </h5>
        )}
      </div>
    </PageContainer>
  );
};

export default GroupsPage;
