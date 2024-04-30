import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RowStyled } from "styles/Table.styled";

const isMobile = window.innerWidth < 768;

const NameValueRow = ({ name, value, linkTo }) => (
  <RowStyled>
    <Col sm={isMobile ? 0 : 2}>{name}</Col>
    <Col>
      <span className="fw-bold">
        {linkTo ? <Link to={linkTo}>{value}</Link> : value}
      </span>
    </Col>
  </RowStyled>
);

export default NameValueRow;
