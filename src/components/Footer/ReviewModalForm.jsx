import React from "react";
import { Modal, Form } from "react-bootstrap";
import { ModalStyled } from "styles/Modal.styled";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";
import { useCreateReviewMutation } from "../../redux/reviewApi";
import { FaRegStar } from "react-icons/fa";

const validationSchema = yup.object({
  text: yup.string().required("Required"),
  rating: yup.number().min(1).max(5),
});

const ReviewModalForm = ({ handleClose }) => {
  const [create] = useCreateReviewMutation();

  return (
    <Formik
      initialValues={{ text: "", rating: 0 }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { text, rating } = values;
          await create({ text, rating }).unwrap();
          toast.success("Message sent successfully!");
          handleClose();
        } catch (err) {
          handleError(err);
        }
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <ModalStyled show={true} onHide={handleClose}>
          <Form onSubmit={handleSubmit} noValidate>
            <Modal.Header closeButton>
              <Modal.Title>Write your review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Field
                  as="textarea"
                  style={{
                    letterSpacing: "0.03em",
                    height: "150px",
                    marginBottom: "5px",
                  }}
                  type="text"
                  placeholder="Text"
                  name="text"
                  autoComplete="off"
                  className={`form-control ${
                    touched.text && errors.text ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="text"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>
              <div className="m-2 mb-0 d-flex gap-2 align-items-center">
                <p className="status-info">Rate us </p>
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <FaRegStar
                    key={starIndex}
                    onClick={() =>
                      handleChange({
                        target: { name: "rating", value: starIndex },
                      })
                    }
                    color={starIndex <= values.rating ? "gold" : "gray"}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="submit"
                className="action-btn"
                disabled={values.rating === 0}
              >
                Send
              </button>
            </Modal.Footer>
          </Form>
        </ModalStyled>
      )}
    </Formik>
  );
};

export default ReviewModalForm;
