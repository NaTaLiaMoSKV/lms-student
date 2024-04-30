import axios from "axios";
import { handleError } from "./handleError";

export const sendRegistration = async (registrationToken, password) => {
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/registration`, {
      registrationToken,
      password,
    });
  } catch (err) {
    handleError(err);
  }
};
