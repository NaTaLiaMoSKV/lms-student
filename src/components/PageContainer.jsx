import { useEffect, useMemo } from "react";
import { Container, Breadcrumb, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const PageContainer = ({ title, children, breadcrumbs, buttonBack }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (title) {
      document.title = `${process.env.REACT_APP_NAME} - ${title}`;
    } else {
      document.title = process.env.REACT_APP_NAME;
    }
  }, [title]);

  const location = useLocation();

  const _breadcrumbs = useMemo(() => {
    if (!breadcrumbs || breadcrumbs.length === 0) {
      return null;
    }
    return breadcrumbs.map((item, index, array) => {
      if (index === array.length - 1) {
        return { ...item, active: true };
      }
      if (item.to) {
        return { ...item };
      } else {
        if (location.state?.from?.pathname) {
          const { pathname, search } = location.state?.from;
          return { ...item, to: pathname + search };
        } else {
          return { ...item, active: true };
        }
      }
    });
  }, [breadcrumbs, location]);

  return (
    <Container className="mt-4">
      {_breadcrumbs && (
        <Breadcrumb>
          {_breadcrumbs.map(({ title, to, active }) => (
            <Breadcrumb.Item
              key={title}
              linkAs={Link}
              linkProps={{ to }}
              active={active}
            >
              {title}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}
      {buttonBack && (
        <Button
          className="border-0"
          variant="outline-secondary"
          onClick={() => navigate(-1)}
        >
          <IoMdArrowBack />
        </Button>
      )}
      {breadcrumbs && <hr></hr>}
      <div>{children}</div>
    </Container>
  );
};

export default PageContainer;
