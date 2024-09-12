import { Alert, AlertButton } from "react-native";
import { getResources } from "./text-resources";

interface AlertOptions {
  title: string;
  message: string;
  okText?: string;
  onOk?: () => void;
  cancelText?: string;
  onCancel?: () => void;
}

export const showAlert = ({
  title,
  message,
  okText = "OK",
  onOk,
  cancelText,
  onCancel,
}: AlertOptions) => {
  const buttons: AlertButton[] = [
    {
      text: okText,
      onPress: onOk,
    },
  ];

  if (cancelText) {
    buttons.unshift({
      text: cancelText,
      onPress: onCancel,
      style: "cancel",
    });
  }

  Alert.alert(title, message, buttons);
};

export const showCodeSentAlert = (onOk?: () => void) => {
  const labels = getResources("emailValidation");
  showAlert({
    title: labels.resendCodeAlertTitle,
    message: labels.resendCodeAlertMessage,
    onOk,
  });
};

export const showCodeSendingErrorAlert = (onOk?: () => void) => {
  showAlert({
    title: getResources("global").errorTitle,
    message: getResources("emailValidation").resendCodeError,
    onOk,
  });
};

export const showErrorAlert = (message: string, onOk?: () => void) => {
  showAlert({
    title: getResources("global").errorTitle,
    message,
    onOk,
  });
};
