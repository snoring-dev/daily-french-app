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
  },
};

export type Resources = keyof typeof TextResources;

export function getResources(screenName: Resources) {
  return TextResources[screenName];
}
