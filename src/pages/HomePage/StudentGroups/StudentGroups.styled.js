import styled from "styled-components";

export const StudentGroupsContainer = styled.div`
  margin: 20px 0;

  & h2 {
    margin-bottom: 15px;
    text-align: center;
  }
`;

export const StudentGroupsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

export const StudentGroup = styled.div`
  cursor: pointer;
  display: flex;
  padding: 20px 80px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;

  & .chart-description {
    color: #8bbb97;
    font-style: italic;
    text-align: center;
  }

  &:hover,
  &:focus {
    transform: scale(1.05);
  }
`;
