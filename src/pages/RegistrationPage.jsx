import { Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { handleError } from "utils/handleError";
import { useNavigate, useParams } from "react-router-dom";
import { sendRegistration } from "utils/registrationUtil";
import { useDispatch } from "react-redux";
import { useAuth } from "hooks/useAuth";
import { logout } from "../redux/authSlice";
import "./LoginPage/LoginPage.css";

const validationSchema = yup.object({
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};

const RegistrationPage = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async ({ password }) => {
        try {
          await sendRegistration(token, password);
          if (user) {
            dispatch(logout());
          }
          navigate("/login");
        } catch (err) {
          handleError(err);
        }
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <div className="mt-4 login-container">
          <div className="login-wrapper">
            <Form className="form" onSubmit={handleSubmit} noValidate>
              <h2>Set password</h2>
              <Form.Group>
                <Form.Control
                  className="formControl"
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="off"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={touched.password && errors.password}
                />
                <Form.Control.Feedback className="m-0" type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Control
                  className="formControl"
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  autoComplete="off"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  isInvalid={touched.confirmPassword && errors.confirmPassword}
                />
                <Form.Control.Feedback className="m-0" type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="mt-1 d-flex justify-content-center">
                <button className="boton-elegante" type="submit">
                  Send
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

export default RegistrationPage;
