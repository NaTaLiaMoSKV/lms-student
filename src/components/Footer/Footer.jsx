import { FooterStyled } from "./Footer.styled";
import { useModalFormState } from "hooks/useModalFormState";
import { useAuth } from "hooks/useAuth";
import Loader from "components/Loader";
import ReviewModalForm from "./ReviewModalForm";

const Footer = () => {
  const { user, isLoading } = useAuth();
  const [helpForm, openHelpForm, closeHelpForm] = useModalFormState();

  return (
    <FooterStyled>
      {isLoading && <Loader />}
      {user && (
        <div
          className="d-flex justify-content-around mb-2"
          style={{ width: "100vw" }}
        >
          <p className="contact-text">
            Contact:{"  "}
            <a href="mailto:natashamoskv@gmail.com">natashamoskv@gmail.com</a>
          </p>
          {helpForm && <ReviewModalForm handleClose={closeHelpForm} />}
          <p className="open-form-text" onClick={openHelpForm}>
            Have questions or suggestions? Write here
          </p>
        </div>
      )}
      <p className={user ? "rights-text user" : "rights-text"}>
        © 2024 Natalia Moskvychova | All rights reserved.
      </p>
    </FooterStyled>
  );
};

export default Footer;
