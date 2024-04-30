import { Card } from "react-bootstrap";
import { CardStyled } from "styles/Card.styled";
import { gateDateString } from "utils/dateUtils";

const GroupHeader = ({ group }) => {
  return (
    <>
      <CardStyled>
        <Card.Header>Group</Card.Header>
        <Card.Body>
          <Card.Title>{group.name}</Card.Title>
          <Card.Text className="mb-2 text-muted">
            {group.course.title}: {group.course.description}
          </Card.Text>
          <Card.Text>{gateDateString(group.startsAfter)}</Card.Text>
        </Card.Body>
      </CardStyled>
    </>
  );
};

export default GroupHeader;
