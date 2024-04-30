import { Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { handleError } from "utils/handleError";
import { useAddHomeworkMessageMutation } from "../redux/homeworkApi";
import {
  SendQuestionContainer,
  SendQuestionFormStyled,
} from "styles/Form.styled";

const validationSchema = yup.object({
  text: yup.string().required("Please enter the text"),
});

const initialValues = {
  text: "",
};

const SendMessageForm = ({ homework, refetch }) => {
  const [addHomeworkMessage] = useAddHomeworkMessageMutation();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await addHomeworkMessage({
            id: homework.id,
            text: values.text,
          }).unwrap();
          toast.success("Message was sent succefully!");
          values.text = "";
          if (refetch) {
            await refetch();
          }
        } catch (err) {
          handleError(err);
        }
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form onSubmit={handleSubmit} noValidate>
          <SendQuestionContainer>
            <SendQuestionFormStyled
              type="text"
              placeholder="Text"
              name="text"
              autoComplete="off"
              value={values.text}
              onChange={handleChange}
              isInvalid={touched.text && errors.text}
              onKeyDown={handleKeyPress}
            />

            <button
              type="submit"
              className="action-btn"
              disabled={homework?.approved}
            >
              Send
            </button>
          </SendQuestionContainer>
        </Form>
      )}
    </Formik>
  );
};

export default SendMessageForm;
