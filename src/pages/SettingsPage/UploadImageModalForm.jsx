import { Modal, Form, Card } from "react-bootstrap";
import { handleError } from "utils/handleError";
import {
  useCommitUploadedImageMutation,
  useUploadImageMutation,
} from "../../redux/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { useState } from "react";
import { ModalStyled } from "styles/Modal.styled";
import { CardImgStyled } from "styles/Card.styled";
import "./SettingsPage.css";

const UploadImageModalForm = ({ user, handleClose }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    user.image ? `${process.env.REACT_APP_BASE_URL}/images/${user.image}` : null
  );

  const [uploadImage] = useUploadImageMutation();
  const [commitImage] = useCommitUploadedImageMutation();

  const dispatch = useDispatch();

  const handleUploadImage = async (e) => {
    try {
      e.preventDefault();
      const file = e.target.files[0];
      const result = await uploadImage(file).unwrap();
      setImage(result.image);
      setImageUrl(
        `${process.env.REACT_APP_BASE_URL}/images/upload/${result.image}`
      );
    } catch (err) {
      handleError(err);
    }
  };

  const handleCommit = async (e) => {
    try {
      e.preventDefault();
      if (!image) {
        throw Error("No image!");
      }
      const result = await commitImage(image).unwrap();
      dispatch(setUser(result));
      handleClose();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <ModalStyled show={true} onHide={handleClose}>
      <Form onSubmit={handleCommit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>Change image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="upload-image-card">
            <CardImgStyled
              src={imageUrl ? imageUrl : "/user.png"}
              alt="User image"
              variant="top"
              style={{ height: "128px", width: "128px" }}
            />
            <Form.Group>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </Form.Group>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="action-btn">
            Cancel
          </button>
          <button type="submit" className="action-btn" disabled={!image}>
            Send
          </button>
        </Modal.Footer>
      </Form>
    </ModalStyled>
  );
};

export default UploadImageModalForm;
