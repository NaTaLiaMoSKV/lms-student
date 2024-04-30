import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { Navbar, Container, Dropdown, NavItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { CiUser } from "react-icons/ci";
import { useGetNotificationsStatQuery } from "../../redux/notificationApi";
import { useEffect } from "react";
import {
  selectNotificationStat,
  updateNotificationStat,
} from "../../redux/notificationStatSlice";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import { useModalFormState } from "hooks/useModalFormState";
import {
  CloseMobileMenuButton,
  CloseMobileMenuSection,
  MobileMenuContainer,
  MobileMenuNav,
  MobileMenuNavItem,
  MobileMenuNavbar,
  OpenMobileMenuButton,
} from "./MobileMenu.styled";

const MobileMenu = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenu, openMobileMenu, closeMobileMenu] = useModalFormState();

  const { data: stat } = useGetNotificationsStatQuery(null, {
    pollingInterval: 60000,
    skipPollingIfUnfocused: true,
    skip: !user,
  });

  useEffect(() => {
    if (mobileMenu) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [mobileMenu]);

  useEffect(() => {
    if (stat) {
      dispatch(updateNotificationStat(stat.data));
    }
  }, [stat, dispatch]);

  const { unviewed } = useSelector(selectNotificationStat);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <>
      <MobileMenuNavbar>
        <Container fluid>
          <OpenMobileMenuButton onClick={openMobileMenu}>
            <MdOutlineMenu />
          </OpenMobileMenuButton>
          <Navbar.Collapse className="justify-content-end">
            {user && (
              <Dropdown as={NavItem}>
                <Dropdown.Toggle
                  as={NavLink}
                  className="d-flex align-items-center"
                >
                  <CiUser className="me-1" />
                  <span className="fw-bolder ms-1">{user.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="nav-dropdown-menu">
                  <Dropdown.Item
                    onClick={handleSettings}
                    className="nav-dropdown-item"
                  >
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="nav-dropdown-item"
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </MobileMenuNavbar>
      <MobileMenuContainer className={mobileMenu ? "show" : "hidden"}>
        <CloseMobileMenuSection>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/logo.png"
              alt="LMS"
              width={52}
              height={52}
              style={{ borderRadius: "50%" }}
            />
          </Navbar.Brand>
          <CloseMobileMenuButton type="button" onClick={closeMobileMenu}>
            <MdClose />
          </CloseMobileMenuButton>
        </CloseMobileMenuSection>
        <MobileMenuNav>
          <MobileMenuNavItem>
            <NavLink
              onClick={closeMobileMenu}
              as={Link}
              to="/"
              className="mobile-menu-link"
            >
              Home
            </NavLink>
          </MobileMenuNavItem>
          {user ? (
            <>
              <MobileMenuNavItem>
                <NavLink
                  onClick={closeMobileMenu}
                  as={Link}
                  to="/groups"
                  className="mobile-menu-link"
                >
                  Groups
                </NavLink>
              </MobileMenuNavItem>
              <MobileMenuNavItem>
                <NavLink
                  onClick={closeMobileMenu}
                  as={Link}
                  to="/lessons"
                  className="mobile-menu-link"
                >
                  Lessons
                </NavLink>
              </MobileMenuNavItem>
              <MobileMenuNavItem>
                <NavLink
                  onClick={closeMobileMenu}
                  as={Link}
                  to="/notifications"
                  className="mobile-menu-link"
                >
                  <span style={{ display: "flex", gap: "2px" }}>
                    Notifications
                    <IoIosNotifications
                      style={{
                        marginBottom: "10px",
                        display: unviewed ? "block" : "none",
                      }}
                    />
                  </span>
                </NavLink>
              </MobileMenuNavItem>
            </>
          ) : (
            <MobileMenuNavItem>
              <NavLink
                onClick={closeMobileMenu}
                as={Link}
                to="/login"
                className="mobile-menu-link"
              >
                Login
              </NavLink>
            </MobileMenuNavItem>
          )}
        </MobileMenuNav>
      </MobileMenuContainer>
    </>
  );
};

export default MobileMenu;
