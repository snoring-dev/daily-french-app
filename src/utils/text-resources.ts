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
};

export const TextResources = {
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
  } as EmailValidationResources,
};

export type ResourceKey = keyof typeof TextResources;

export function getResources<T extends ResourceKey>(
  screenName: T
): (typeof TextResources)[T] {
  return TextResources[screenName];
}
