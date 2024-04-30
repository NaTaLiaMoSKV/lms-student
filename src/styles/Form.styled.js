import { styled } from "styled-components";
import { FormControl, FormLabel, FormSelect } from "react-bootstrap";

export const FormSelectStyled = styled(FormSelect)`
  letter-spacing: 0.03em;
  padding: 12px;

  & option {
    letter-spacing: 0.03em;
  }
`;

export const SendQuestionFormStyled = styled(FormControl)`
  flex: 1;
`;

export const SendQuestionContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  letter-spacing: 0.03em;
`;

export const FormSelectLabelStyled = styled(FormLabel)`
  padding: 0;
  margin-bottom: 5px;
  color: #212529b0;
`;
