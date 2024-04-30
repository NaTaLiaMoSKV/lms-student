import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { Navbar, Container, Nav, Dropdown, NavItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { CiUser } from "react-icons/ci";
import { useGetNotificationsStatQuery } from "../../redux/notificationApi";
import { useEffect } from "react";
import {
  selectNotificationStat,
  updateNotificationStat,
} from "../../redux/notificationStatSlice";
import "./Navigation.css";
import { IoIosNotifications } from "react-icons/io";
import { NavigationNavItem, NavigationNavbar } from "./Navigation.styled";

const Navigation = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: stat } = useGetNotificationsStatQuery(null, {
    pollingInterval: 60000,
    skipPollingIfUnfocused: true,
    skip: !user,
  });

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
      <NavigationNavbar>
        <Container fluid>
          <Navbar.Collapse>
            <Navbar.Brand as={Link} to="/">
              <img
                src="/logo.png"
                alt="LMS"
                width={64}
                height={64}
                style={{ borderRadius: "50%" }}
              />
            </Navbar.Brand>
            <Nav>
              <NavigationNavItem>
                <NavLink as={Link} to="/" className="navigation-link">
                  Home
                </NavLink>
              </NavigationNavItem>
              {user ? (
                <>
                  <NavigationNavItem>
                    <NavLink as={Link} to="/groups" className="navigation-link">
                      Groups
                    </NavLink>
                  </NavigationNavItem>
                  <NavigationNavItem>
                    <NavLink
                      as={Link}
                      to="/lessons"
                      className="navigation-link"
                    >
                      Lessons
                    </NavLink>
                  </NavigationNavItem>
                  <NavigationNavItem>
                    <NavLink
                      as={Link}
                      to="/notifications"
                      className="navigation-link"
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
                  </NavigationNavItem>
                </>
              ) : (
                <NavigationNavItem>
                  <NavLink as={Link} to="/login" className="navigation-link">
                    Login
                  </NavLink>
                </NavigationNavItem>
              )}
            </Nav>
          </Navbar.Collapse>
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
      </NavigationNavbar>
    </>
  );
};

export default Navigation;
