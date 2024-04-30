import PageContainer from "components/PageContainer";
import { useAuth } from "hooks/useAuth";
import { Card, Row, Col } from "react-bootstrap";
import EditUserModalForm from "./EditUserModalForm";
import UploadImageModalForm from "./UploadImageModalForm";
import { useModalFormState } from "hooks/useModalFormState";
import Loader from "components/Loader";
import { CardImgStyled, CardStyled } from "styles/Card.styled";

const UserCard = () => {
  const { user, isLoading } = useAuth();

  const [editForm, openEditForm, closeEditForm] = useModalFormState(false);
  const [uploadImageForm, openUploadForm, closeUploadForm] =
    useModalFormState(false);

  return (
    <>
      {isLoading && <Loader />}
      <CardStyled className="mt-4">
        <Card.Body className="text-center">
          <Row className="no-gutters">
            <Col
              className="d-flex justify-content-center align-items-center"
              md={4}
            >
              <CardImgStyled
                src={
                  user.image
                    ? `${process.env.REACT_APP_BASE_URL}/images/${user.image}`
                    : "/user.png"
                }
                alt="User image"
                variant="top"
              />
            </Col>
            <Col
              md={8}
              className="d-flex justify-content-center align-items-center"
            >
              <div>
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {user.email}
                </Card.Subtitle>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end gap-3">
          <button className="action-btn" onClick={openEditForm}>
            Edit
          </button>
          <button className="action-btn" onClick={openUploadForm}>
            Image
          </button>
        </Card.Footer>
      </CardStyled>
      {editForm && (
        <EditUserModalForm user={user} handleClose={closeEditForm} />
      )}
      {uploadImageForm && (
        <UploadImageModalForm user={user} handleClose={closeUploadForm} />
      )}
    </>
  );
};
const SettingsPage = () => (
  <PageContainer title={"Settings"}>
    <UserCard />
  </PageContainer>
);

export default SettingsPage;
