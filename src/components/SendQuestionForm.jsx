import { Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { handleError } from "utils/handleError";
import { useAddLessonQuestionMutation } from "../redux/questionsApi";
import {
  SendQuestionContainer,
  SendQuestionFormStyled,
} from "styles/Form.styled";

const validationSchema = yup.object({
  data: yup.string().required("Please enter the text"),
});

const SendQuestionForm = ({ lesson }) => {
  const [addLessonQuestion] = useAddLessonQuestionMutation();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Formik
      initialValues={{ data: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await addLessonQuestion({
            id: lesson.id,
            data: values.data,
          }).unwrap();
          resetForm();
        } catch (err) {
          handleError(err);
        }
      }}
    >
      {({ resetForm, handleSubmit, handleChange, values, touched, errors }) => (
        <Form onSubmit={handleSubmit} noValidate>
          <SendQuestionContainer>
            <SendQuestionFormStyled
              type="text"
              placeholder="Text"
              name="data"
              autoComplete="off"
              value={values.data}
              onChange={handleChange}
              isInvalid={touched.data && errors.data}
              onKeyDown={handleKeyPress}
            />
            <button
              className="action-btn"
              type="submit"
              disabled={lesson?.finishedAt}
            >
              Send
            </button>
          </SendQuestionContainer>
        </Form>
      )}
    </Formik>
  );
};

export default SendQuestionForm;
