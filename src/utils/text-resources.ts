type RegisterResources = {
  title: string;
  subtitle: string;
  emailField: string;
  passwordField: string;
  phoneField: string;
  submitButton: string;
  agreeTermsPrefix: string;
  termsAndConditions: string;
  passwordHint: string;
  passwordPlaceholder: string;
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
    passwordHint: "Le mot de passe doit contenir au moins 8 caractères",
    passwordPlaceholder: "Entrez votre mot de passe",
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
};

export type ResourceKey = keyof typeof TextResources;

export function getResources<T extends ResourceKey>(screenName: T): typeof TextResources[T] {
  return TextResources[screenName];
}
