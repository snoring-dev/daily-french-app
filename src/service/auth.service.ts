import { LoginFormData } from "../components/login-form";
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
