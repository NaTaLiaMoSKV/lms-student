import { Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";
import { useUpdateUserMutation } from "../../redux/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import "../LoginPage/LoginPage.css";
import { ModalStyled } from "styles/Modal.styled";

const validationSchema = yup.object({
  name: yup.string().required(),
});

const initialValues = {
  name: "",
};

const EditUserModalForm = ({ user, handleClose }) => {
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={user ?? initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          const result = await updateUser(values).unwrap();
          dispatch(setUser(result));
          toast.success("Name was updated succefully!");
          handleClose();
        } catch (err) {
          handleError(err);
        }
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <ModalStyled show={true} onHide={handleClose}>
          <Form onSubmit={handleSubmit} noValidate>
            <Modal.Header closeButton>
              <Modal.Title>Edit name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Control
                  className="formControl"
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose} className="action-btn">
                Cancel
              </button>
              <button attr="primary" type="submit" className="action-btn">
                Send
              </button>
            </Modal.Footer>
          </Form>
        </ModalStyled>
      )}
    </Formik>
  );
};

export default EditUserModalForm;
