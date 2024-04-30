import { Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import "./LoginPage.css";

const initialValues =
  process.env.NODE_ENV === "development"
    ? {
        email: "user1@mail.com",
        password: "123456",
      }
    : {
        email: "",
        password: "",
      };

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMobile = window.innerWidth < 768;
  document.title = "LMS - Login";

  if (user) {
    return <Navigate to="/settings" />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await dispatch(login(values));
          navigate("/settings");
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <div className="mt-4 login-container">
          <div className="login-wrapper">
            <Form className="form" onSubmit={handleSubmit} noValidate>
              <h2>Sign In</h2>
              <Form.Group>
                <Form.Control
                  className="formControl"
                  type="email"
                  placeholder="Enter the email"
                  name="email"
                  autoComplete="off"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="formControl"
                  type="password"
                  placeholder="Password"
                  name="password"
                  autoComplete="off"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={touched.password && errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="mt-1 d-flex justify-content-center">
                <button className="boton-elegante" type="submit">
                  Login
                </button>
              </div>
            </Form>
          </div>
          {!isMobile && (
            <div className="welcome-wrapper">
              <h2 className="welcome-title">Welcome to LMS</h2>
              <p className="welcome-text">
                Expand your horizons with our diverse range of online courses.
                Whether you're exploring a new interest or advancing your
                skills, we're here to support your journey. Start learning
                today!
              </p>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};

export default LoginPage;
