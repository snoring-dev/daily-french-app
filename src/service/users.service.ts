import { FormData } from "../components/register-form";
import { removeUserData, saveUserData } from "../utils/auth";
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
  const resp = await api.get("/users/get-user-data");
  return resp.data;
};

export const refreshUserData = async () => {
  try {
    await removeUserData();
    const userData = await getUserData();
    await saveUserData(userData);
  } catch (e) {
    throw e;
  }
};
