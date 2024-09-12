type RegisterResources = {
  title: string;
  subtitle: string;
  emailField: string;
  passwordField: string;
  phoneField: string;
  submitButton: string;
  agreeTermsPrefix: string;
  termsAndConditions: string;
  passwordTooShort: string;
  passwordPlaceholder: string;
  invalidEmail: string;
  phoneNumberTooShort: string;
  mustAgreeTerms: string;
  alreadyHaveAccount: string;
  loginNow: string;
};

type LoginResources = {
  title: string;
  subtitle: string;
  emailField: string;
  passwordField: string;
  forgotPassword: string;
  loginButton: string;
  dontHaveAccount: string;
  registerNow: string;
  userNotFound: string;
};

type ResetPasswordResources = {
  title: string;
  subtitle: string;
  emailField: string;
  wrongEmail: string;
  submitButton: string;
  alreadyHaveAccount: string;
  loginNow: string;
};

type EmailValidationResources = {
  title: string;
  subtitle: string;
  codeField: string;
  submitButton: string;
  codeNotReceived: string;
  resendCode: string;
  invalidCodeLength: string;
  codeContainsOnlyDigits: string;
  resendCodeAlertTitle: string;
  resendCodeAlertMessage: string;
  resendCodeError: string;
};

type GlobalResources = {
  errorTitle: string;
};

type RedefinePasswordResources = {
  title: string;
  subtitle: string;
  newPasswordField: string;
  confirmPasswordField: string;
  redefinePasswordButton: string;
  passwordsDontMatch: string;
  successTitle: string;
  errorTitle: string;
  errorMessage: string;
  successMessage: string;
};

export const TextResources = {
  global: {
    errorTitle: "Erreur",
  } as GlobalResources,
  register: {
    title: "Créez Votre Compte",
    subtitle: "Rejoignez notre communauté en quelques étapes simples",
    emailField: "Adresse e-mail",
    passwordField: "Mot de passe",
    phoneField: "Numéro de téléphone",
    submitButton: "Créer mon compte",
    agreeTermsPrefix: "J'accepte les",
    termsAndConditions: "conditions générales",
    passwordPlaceholder: "Entrez votre mot de passe",
    invalidEmail: "Adresse e-mail invalide",
    phoneNumberTooShort:
      "Le numéro de téléphone doit comporter au moins 10 chiffres",
    passwordTooShort: "Le mot de passe doit contenir au moins 8 caractères",
    mustAgreeTerms: "Vous devez accepter les conditions générales",
    alreadyHaveAccount: "Déja membre?",
    loginNow: "Connectez-vous.",
  } as RegisterResources,
  login: {
    title: "Bon retour",
    subtitle: "Connectez-vous à votre compte",
    emailField: "Adresse e-mail",
    passwordField: "Mot de passe",
    forgotPassword: "Mot de passe oublié ?",
    loginButton: "Se connecter",
    dontHaveAccount: "Vous n'avez pas de compte ?",
    registerNow: "Inscrivez-vous",
    userNotFound: "Utilisateur introuvable!",
  } as LoginResources,
  emailValidation: {
    title: "Confirmation",
    subtitle:
      "Un code de validation a été envoyé à votre e-mail. Vérifiez votre boîte de réception (et vos spams).",
    codeField: "Code de validation",
    codeNotReceived: "Vous n'avez pas reçu le code?",
    resendCode: "Renvoyer!",
    submitButton: "Valider mon compte",
    invalidCodeLength:
      "Le code de vérification doit contenir exactement 8 chiffres.",
    codeContainsOnlyDigits:
      "Le code de vérification ne doit contenir que des chiffres.",
    resendCodeAlertTitle: "Code Envoyé",
    resendCodeAlertMessage:
      "Un nouveau code de validation a été envoyé à votre adresse e-mail.",
    resendCodeError:
      "Une erreur s'est produite lors de l'envoi du code. Veuillez réessayer.",
  } as EmailValidationResources,
  resetPassword: {
    title: "Mot de passe oublié?",
    subtitle:
      "Pas de panique, vous pouvez redéfinir votre mot de passe facilement.",
    emailField: "Adresse e-mail",
    wrongEmail: "Vous avez donné une adresse e-mail invalide.",
    submitButton: "Confirmer",
    alreadyHaveAccount: "Déja membre?",
    loginNow: "Connectez-vous.",
  } as ResetPasswordResources,
  redefinePassword: {
    title: "Réinitialisez votre mot de passe",
    subtitle: "Veuillez entrer votre nouveau mot de passe",
    newPasswordField: "Nouveau mot de passe",
    confirmPasswordField: "Confirmer le nouveau mot de passe",
    redefinePasswordButton: "Réinitialiser le mot de passe",
    passwordsDontMatch: "Les mots de passe ne correspondent pas",
    successTitle: "Mot de passe réinitialisé avec succès",
    successMessage:
      "Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
    errorTitle: "Erreur",
    errorMessage:
      "Une erreur s'est produite lors de la réinitialisation de votre mot de passe. Veuillez réessayer.",
  } as RedefinePasswordResources,
};

export type ResourceKey = keyof typeof TextResources;

export function getResources<T extends ResourceKey>(
  screenName: T
): (typeof TextResources)[T] {
  return TextResources[screenName];
}
