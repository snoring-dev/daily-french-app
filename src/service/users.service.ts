import { FormData } from "../components/register-form";
import api from "../utils/request";

export const saveUser = async (formData: FormData) => {
  const resp = await api.post("/users/register", {
    email: formData.email,
    password: formData.password,
    phoneNumber: formatPhoneNumber(formData.phone),
  });

  return resp.data && resp.data.id;
};

export const resendEmailValidationCode = async () => {
  const resp = await api.post("/users/resend-verification-code");
  return resp.data && resp.data.message;
};

export const submitValidationCode = async (email: string, code: number) => {
  const resp = await api.post("/users/verify-email", {
    email,
    verificationCode: String(code),
  });
  return resp.data && resp.data.message;
};

export const getUserData = async () => {
  return await api.get("/users/get-user-data");
};
