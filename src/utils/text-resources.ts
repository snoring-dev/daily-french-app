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

type UserInformationResources = {
  title: string;
  subtitle: string;
  firstNameField: string;
  lastNameField: string;
  phoneField: string;
  submitButton: string;
  firstNameRequired: string;
  lastNameRequired: string;
  phoneNumberRequired: string;
  invalidPhoneNumber: string;
  updateSuccess: string;
  updateError: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  phonePlaceholder: string;
};

type LanguageLevelResources = {
  title: string;
  saveButton: string;
};

type GlobalResources = {
  errorTitle: string;
  logoutError: string;
};

type WordCardResources = {
  examplePhrases: string;
};

type LoadingResources = {
  message: string;
};

export type PhoneModalResources = {
  France: string;
  US: string;
  UK: string;
  Germany: string;
  Spain: string;
  Italy: string;
  Canada: string;
  Australia: string;
  Japan: string;
  China: string;
};

type PreferencesResources = {
  personalInformation: string;
  languageLevel: string;
  applicationSettings: string;
  logout: string;
  loadingError: string;
};

export const TextResources = {
  global: {
    errorTitle: "Erreur",
    logoutError: "Erreur de déconnexion",
  } as GlobalResources,
  loading: {
    message: "Chargement en cours...",
  } as LoadingResources,
  phoneModal: {
    France: "France",
    US: "United States",
    UK: "United Kingdom",
    Germany: "Germany",
    Spain: "Spain",
    Italy: "Italy",
    Canada: "Canada",
    Australia: "Australia",
    Japan: "Japan",
    China: "China",
  } as PhoneModalResources,
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
  userInformation: {
    title: "Modifier Votre Profil",
    subtitle: "Mettez à jour vos informations personnelles",
    firstNameField: "Prénom",
    lastNameField: "Nom",
    phoneField: "Numéro de téléphone",
    submitButton: "Mettre à jour mon profil",
    firstNameRequired: "Le prénom est requis",
    lastNameRequired: "Le nom est requis",
    phoneNumberRequired: "Le numéro de téléphone est requis",
    invalidPhoneNumber: "Numéro de téléphone invalide",
    updateSuccess: "Profil mis à jour avec succès!",
    updateError: "Échec de la mise à jour du profil. Veuillez réessayer.",
    firstNamePlaceholder: "Entrez votre prénom",
    lastNamePlaceholder: "Entrez votre nom",
    phonePlaceholder: "Entrez votre numéro de téléphone",
  } as UserInformationResources,
  languageLevel: {
    title: "Séléctionner votre niveau en Francais",
    saveButton: "Enregistrer mon niveau",
  } as LanguageLevelResources,
  wordCard: {
    examplePhrases: "Exemples de phrases",
  } as WordCardResources,
  preferences: {
    personalInformation: "Informations personnelles",
    languageLevel: "Niveau de langue", 
    applicationSettings: "Paramètres de l'application",
    logout: "Déconnexion",
    loadingError: "Échec du chargement des données de profil"
  } as PreferencesResources,
};

export type ResourceKey = keyof typeof TextResources;

export function getResources<T extends ResourceKey>(
  screenName: T
): (typeof TextResources)[T] {
  return TextResources[screenName];
}
