import { Col, Row } from "react-bootstrap";
import { MessageStyled } from "styles/Message.styled";
import { gateDateTimeString } from "utils/dateUtils";

const MessageAlert = ({ text, date, variant }) => (
  <MessageStyled attr={variant}>
    <p>{text}</p>
    {date && (
      <small className="d-flex justify-content-end fw-light">
        {gateDateTimeString(date)}
      </small>
    )}
  </MessageStyled>
);

const Message = ({ incoming, text, date, id, ...props }) => (
  <Row id={id}>
    <Col>
      {incoming && (
        <MessageAlert variant="secondary" text={text} date={date} {...props} />
      )}
    </Col>
    <Col>
      {!incoming && (
        <MessageAlert variant="primary" text={text} date={date} {...props} />
      )}
    </Col>
  </Row>
);

export default Message;
