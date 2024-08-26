export const TextResources = {
  register: {
    title: 'Créez Votre Compte',
    subtitle: 'Rejoignez notre communauté en quelques étapes simples',
    emailField: 'Adresse e-mail',
    passwordField: 'Mot de passe',
    phoneField: 'Numéro de téléphone',
    submitButton: 'Créer mon compte',
    agreeTerms: 'J\'accepte les conditions générales',
  }
};

export type Resources = keyof typeof TextResources;

export function getResources(screenName: Resources) {
  return TextResources[screenName];
}