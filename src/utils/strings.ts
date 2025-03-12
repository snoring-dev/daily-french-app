function formatPhoneNumber(phoneObj: {
  callingCode: string;
  number: string;
}): string {
  const { callingCode, number } = phoneObj;
  const cleanNumber = number.replace(/\D/g, "");

  return `${callingCode}${cleanNumber}`;
}
