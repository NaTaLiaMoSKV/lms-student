import styled from "styled-components";

export const FooterStyled = styled.footer`
  position: relative;
  flex-shrink: 0;
  background-color: #282828;
  padding-top: 20px;
  font-size: 12px;
  color: #fafafa;
  text-align: center;
  letter-spacing: 0.04em;

  & a {
    color: #fff;
    letter-spacing: 0.04em;
  }
  & a:hover,
  & a:focus {
    color: #8bbb97;
  }

  & .rights-text {
    margin-bottom: 10px;
  }

  & .rights-text.user {
    margin-bottom: 10px;
    border-top: 1px solid gray;
    padding-top: 15px;
  }

  & .open-form-text {
    color: #fff;
    transition: all 0.3s ease-in-out;
  }

  & .open-form-text:hover,
  & .open-form-text:focus {
    color: #8bbb97;
  }
`;
