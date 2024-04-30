import { styled } from "styled-components";
import { Modal } from "react-bootstrap";

export const ModalStyled = styled(Modal)`
  & .modal-content {
    padding: 10px 20px;
  }

  & .modal-body {
    margin: 10px 0px;
  }
`;
