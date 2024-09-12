import { LoginFormData } from "../components/login-form";
import { ResetPasswordData } from "../components/reset-password-form";
import api from "../utils/request";
import { getResources } from "../utils/text-resources";

export const doLogin = async (formData: LoginFormData) => {
  const resp = await api.post("/auth/login", {
    email: formData.email,
    password: formData.password,
  });

  if (!resp.data || !resp.data.access_token) {
    throw new Error(getResources("login").userNotFound);
  }

  return resp.data.access_token;
};

export const requestPasswordReset = async (formData: ResetPasswordData) => {
  const resp = await api.post("/password-reset/request", {
    email: formData.email,
  });

  if (!resp.data || !resp.data.message) {
    throw new Error(getResources("login").userNotFound);
  }

  return true;
};

export const sendValidationCode = async (email: string, code: number) => {
  const resp = await api.post("/password-reset/verify", {
    email,
    verificationCode: String(code),
  });

  return resp.data && resp.data.message;
};

export const setNewPassword = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  const resp = await api.post("/password-reset/reset", {
    email,
    newPassword: password,
    newPasswordConfirmation: confirmPassword,
  });

  return resp.data && resp.data.message;
};
