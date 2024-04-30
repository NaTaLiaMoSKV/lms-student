import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

export const OpenMobileMenuButton = styled.button`
  width: 50px;
  height: 50px;

  & svg {
    fill: #fff;
    width: 32px;
    height: 32px;
    transition: fill 0.3s ease-in-out;
  }

  & svg:hover,
  & svg:focus {
    fill: #fafafa;
  }
`;

export const MobileMenuContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;

  &.hidden {
    opacity: 0;
    visibility: hidden;
  }

  &.show {
    opacity: 1;
    visibility: visible;
  }
`;

export const CloseMobileMenuSection = styled.div`
  background-color: #fafafa;
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

export const CloseMobileMenuButton = styled.button`
  width: 50px;
  height: 50px;

  & svg {
    fill: #282828;
    width: 40px;
    height: 40px;
    transition: fill 0.3s ease-in-out;
  }

  &:hover svg,
  &:focus svg {
    fill: #8bbb97;
  }
`;

export const MobileMenuNavbar = styled(Navbar)`
  background-color: #8bbb97;
  color: #fafafa;
  padding: 0;
  display: flex;
  flex-direction: column;

  & div {
    height: 85px;
  }

  & a,
  & a:hover,
  & a:focus,
  & a:active {
    color: #fafafa;
  }
`;

export const MobileMenuNav = styled(Nav)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 20px;
`;

export const MobileMenuNavItem = styled(Nav.Item)`
  font-size: 40px;
`;
