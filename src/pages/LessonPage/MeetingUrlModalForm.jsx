import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { handleError } from "utils/handleError";
import { useSetLessonMeetingUrlMutation } from "../../redux/lessonApi";

const validationSchema = yup.object({
  url: yup.string().required("Please enter th URL"),
});

const initialValues = {
  url: "",
};

const MeetingUrlModalForm = ({ lessonId, url, handleClose }) => {
  const [setLessonMeetingUrl] = useSetLessonMeetingUrlMutation();

  return (
    <Formik
      initialValues={url ? { url } : initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await setLessonMeetingUrl({
            id: lessonId,
            meetingUrl: values.url,
          }).unwrap();
          handleClose();
        } catch (err) {
          handleError(err);
        }
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Modal show={true} onHide={handleClose}>
          <Form onSubmit={handleSubmit} noValidate>
            <Modal.Header closeButton>
              <Modal.Title>Set meeting URL</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="URL"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="url"
                    autoComplete="off"
                    value={values.url}
                    onChange={handleChange}
                    isInvalid={touched.url && errors.url}
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">
                  {errors.url}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="action-btn"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="action-btn">
                Send
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default MeetingUrlModalForm;
