
import React, { createContext, useContext, useState, useEffect } from 'react';

// Type for language object
export interface LanguageOption {
  code: 'fr' | 'en';
  name: string;
  flag: string;
}

// Export available languages
export const availableLanguages: LanguageOption[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

// Type for the translation context
interface TranslationContextType {
  language: LanguageOption;
  setLanguage: (lang: LanguageOption) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

// Create the context
const TranslationContext = createContext<TranslationContextType | null>(null);

// French translations
const frTranslations: Record<string, string> = {
  // Common translations
  "home": "Accueil",
  "cars": "Nos véhicules",
  "reservations": "Réservations",
  "contact": "Contact",
  "login": "Se connecter",
  "logout": "Se déconnecter",
  "signup": "S'inscrire",
  "admin": "Admin",
  "user": "Utilisateur",
  "settings": "Paramètres",
  "dashboard": "Tableau de bord",
  "search": "Rechercher",
  "profile": "Profil",
  "back": "Retour",
  "next": "Suivant",
  "previous": "Précédent",
  "save": "Enregistrer",
  "cancel": "Annuler",
  "delete": "Supprimer",
  "edit": "Modifier",
  "create": "Créer",
  "add": "Ajouter",
  "remove": "Retirer",
  "detail": "Détail",
  "details": "Détails",
  "loading": "Chargement...",
  "error": "Erreur",
  "success": "Succès",
  "warning": "Avertissement",
  "info": "Information",
  "close": "Fermer",
  "submit": "Soumettre",
  "send": "Envoyer",
  "required": "Requis",
  "optional": "Optionnel",
  "email": "Email",
  "password": "Mot de passe",
  "name": "Nom",
  "firstName": "Prénom",
  "lastName": "Nom de famille",
  "address": "Adresse",
  "phone": "Téléphone",
  "city": "Ville",
  "country": "Pays",
  "zipCode": "Code postal",
  "dateOfBirth": "Date de naissance",
  "gender": "Genre",
  "male": "Homme",
  "female": "Femme",
  "other": "Autre",
  "avatar": "Avatar",
  "profileTitle": "Profil Utilisateur",
  "profileSubtitle": "Gérez vos informations personnelles",
  "saveChanges": "Enregistrer les modifications",
  "generateAvatar": "Générer",
  "profileUpdatedTitle": "Profil mis à jour",
  "profileUpdatedDesc": "Vos informations ont été mises à jour avec succès.",
  "profilePrivacyNotice": "Vos informations personnelles sont protégées par notre politique de confidentialité.",
  
  // Added translations for favorites
  "addedToFavorites": "Ajouté aux favoris",
  "addedToFavoritesDescription": "Le véhicule a été ajouté à vos favoris",
  "removedFromFavorites": "Retiré des favoris",
  "removedFromFavoritesDescription": "Le véhicule a été retiré de vos favoris",
  "availabilityUpdated": "Disponibilité mise à jour",
  "vehicleNowUnavailable": "Le véhicule {car} n'est plus disponible",
  "vehicleNowAvailable": "Le véhicule {car} est maintenant disponible",
  
  // Car categories
  "tous": "Tous",
  "berline": "Berline",
  "suv": "SUV", 
  "électrique": "Électrique",
  "sport": "Sport",
  "premium": "Premium",
  
  // Featured cars section 
  "ourPremiumVehicles": "Notre Flotte",
  "featuredCarsDescription": "Découvrez notre sélection de véhicules haut de gamme pour tous vos besoins",
  "viewAllVehicles": "Voir tous les véhicules",
  
  // Home page
  "heroTitle": "Location de voitures professionnelle",
  "heroSubtitle": "Découvrez notre flotte de véhicules de qualité pour tous vos besoins de déplacement.",
  "heroButtonPrimary": "Réserver maintenant",
  "heroButtonSecondary": "En savoir plus",
  "featuredCarsTitle": "Véhicules en vedette",
  "featuredCarsSubtitle": "Découvrez notre sélection de véhicules populaires",
  "viewAllCars": "Voir tous les véhicules",
  "howItWorksTitle": "Comment ça marche",
  "howItWorksSubtitle": "Location simple en 3 étapes",
  "step1Title": "Choisissez votre véhicule",
  "step1Description": "Parcourez notre vaste sélection de véhicules et choisissez celui qui correspond à vos besoins.",
  "step2Title": "Réservez en ligne",
  "step2Description": "Sélectionnez vos dates et complétez votre réservation en quelques clics seulement.",
  "step3Title": "Profitez de votre voyage",
  "step3Description": "Récupérez votre véhicule et profitez de votre trajet en toute tranquillité.",
  "testimonialsTitle": "Témoignages clients",
  "testimonialsSubtitle": "Ce que nos clients disent de nous",

  // Cars page
  "allVehiclesTitle": "Tous nos véhicules",
  "allVehiclesSubtitle": "Trouvez le véhicule parfait pour votre prochain voyage",
  "filterByCategory": "Filtrer par catégorie",
  "filterByBrand": "Filtrer par marque",
  "filterByPrice": "Filtrer par prix",
  "sort": "Trier",
  "sortByPriceLowToHigh": "Prix: croissant",
  "sortByPriceHighToLow": "Prix: décroissant",
  "sortByPopularity": "Popularité",
  "sortByNewest": "Plus récent",
  "clearFilters": "Effacer les filtres",
  "pricePerDay": "Prix par jour",
  "seatsAvailable": "Places disponibles",
  "transmission": "Transmission",
  "fuelType": "Type de carburant",
  "automatic": "Automatique",
  "manual": "Manuelle",
  "gasoline": "Essence",
  "diesel": "Diesel",
  "electric": "Électrique",
  "hybrid": "Hybride",
  "viewDetails": "Voir détails",
  "bookNow": "Réserver maintenant",
  "noVehiclesFound": "Aucun véhicule ne correspond à vos critères de recherche.",
  "searchResults": "Résultats de recherche",
  "addToFavorites": "Ajouter aux favoris",
  "removeFromFavorites": "Retirer des favoris",

  // Vehicle details page
  "vehicleSpecifications": "Spécifications du véhicule",
  "availableDates": "Dates disponibles",
  "pickupDate": "Date de prise en charge",
  "returnDate": "Date de retour",
  "totalPrice": "Prix total",
  "included": "Inclus",
  "notIncluded": "Non inclus",
  "insurance": "Assurance",
  "unlimitedMileage": "Kilométrage illimité",
  "roadAssistance": "Assistance routière",
  "additionalDriver": "Conducteur supplémentaire",
  "childSeat": "Siège enfant",
  "gps": "GPS",
  "selectDates": "Sélectionner les dates",
  "bookThisVehicle": "Réserver ce véhicule",
  "similarVehicles": "Véhicules similaires",
  "vehicleFeatures": "Caractéristiques",
  "reviews": "Avis",
  "leaveAReview": "Laisser un avis",
  "rating": "Évaluation",
  "comment": "Commentaire",
  "submitReview": "Soumettre l'avis",
  "reviewSubmitted": "Votre avis a été soumis avec succès.",
  "reviewError": "Une erreur est survenue lors de la soumission de votre avis.",
  "loginToReview": "Connectez-vous pour laisser un avis.",

  // Reservation page
  "myReservations": "Mes réservations",
  "noReservations": "Vous n'avez pas encore de réservations.",
  "upcomingReservations": "Réservations à venir",
  "pastReservations": "Réservations passées",
  "reservationDetails": "Détails de la réservation",
  "reservationDate": "Date de réservation",
  "reservationStatus": "Statut",
  "confirmed": "Confirmée",
  "pending": "En attente",
  "cancelled": "Annulée",
  "completed": "Terminée",
  "modifyReservation": "Modifier",
  "cancelReservation": "Annuler",
  "confirmCancellation": "Êtes-vous sûr de vouloir annuler cette réservation?",
  "cancellationPolicy": "Politique d'annulation",
  "cancellationPolicyText": "Les annulations effectuées au moins 48 heures avant la date de prise en charge sont remboursées à 100%. Les annulations effectuées moins de 48 heures avant la date de prise en charge ne sont pas remboursables.",
  "invoiceDetails": "Détails de la facture",
  "downloadInvoice": "Télécharger la facture",
  "paymentMethod": "Méthode de paiement",
  "paymentStatus": "Statut du paiement",
  "paid": "Payé",
  "unpaid": "Non payé",
  "partial": "Partiel",

  // Contact page
  "contactTitle": "Contactez-nous",
  "contactSubtitle": "Nous sommes là pour vous aider",
  "contactFormTitle": "Envoyez-nous un message",
  "contactFormSubtitle": "Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.",
  "yourName": "Votre nom",
  "yourEmail": "Votre email",
  "subject": "Sujet",
  "message": "Message",
  "sendMessage": "Envoyer le message",
  "messageSent": "Votre message a été envoyé avec succès.",
  "messageError": "Une erreur est survenue lors de l'envoi de votre message.",
  "ourContacts": "Nos coordonnées",
  "callUs": "Appelez-nous",
  "emailUs": "Envoyez-nous un email",
  "visitUs": "Rendez-nous visite",
  "openingHours": "Heures d'ouverture",
  "mondayFriday": "Lundi - Vendredi",
  "saturdaySunday": "Samedi - Dimanche",
  "followUs": "Suivez-nous",

  // Auth pages
  "loginTitle": "Connexion à votre compte",
  "loginSubtitle": "Entrez vos identifiants pour accéder à votre compte",
  "forgotPassword": "Mot de passe oublié?",
  "rememberMe": "Se souvenir de moi",
  "dontHaveAccount": "Vous n'avez pas de compte?",
  "createAccount": "Créer un compte",
  "signupTitle": "Créer un compte",
  "signupSubtitle": "Remplissez le formulaire pour créer un nouveau compte",
  "alreadyHaveAccount": "Vous avez déjà un compte?",
  "termsAndConditions": "J'accepte les conditions d'utilisation et la politique de confidentialité",
  "confirmPassword": "Confirmer le mot de passe",
  "passwordsDontMatch": "Les mots de passe ne correspondent pas",
  "resetPasswordTitle": "Réinitialiser le mot de passe",
  "resetPasswordSubtitle": "Entrez votre email pour réinitialiser votre mot de passe",
  "resetPasswordInstructions": "Nous vous enverrons un lien pour réinitialiser votre mot de passe.",
  "resetPasswordSent": "Les instructions de réinitialisation ont été envoyées à votre email.",
  "resetPasswordError": "Une erreur est survenue. Veuillez réessayer.",
  "backToLogin": "Retour à la connexion",
  "loginWithGoogle": "Se connecter avec Google",
  "loginWithFacebook": "Se connecter avec Facebook",
  "or": "Ou",

  // Footer
  "aboutUs": "À propos de nous",
  "termsOfService": "Conditions d'utilisation",
  "privacyPolicy": "Politique de confidentialité",
  "cookiePolicy": "Politique de cookies",
  "faq": "FAQ",
  "blog": "Blog",
  "careers": "Carrières",
  "allRightsReserved": "Tous droits réservés",
  "newsletterTitle": "Inscrivez-vous à notre newsletter",
  "newsletterSubtitle": "Recevez nos dernières offres et nouvelles",
  "subscribe": "S'abonner",
  "yourEmailAddress": "Votre adresse email",
  "subscriptionSuccess": "Merci de vous être inscrit à notre newsletter!",
  "subscriptionError": "Une erreur est survenue. Veuillez réessayer.",

  // Privacy policy sections
  "privacyPolicyTitle": "Politique de confidentialité",
  "privacyIntroTitle": "Introduction",
  "privacyIntroText": "Chez CarRentalPro, nous prenons la confidentialité de vos données très au sérieux. Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre site web et nos services.",
  "dataCollectionTitle": "Collecte de données",
  "dataCollectionText": "Nous collectons des informations lorsque vous vous inscrivez sur notre site, effectuez une réservation, répondez à un sondage ou remplissez un formulaire. Les informations collectées incluent votre nom, adresse e-mail, numéro de téléphone, adresse, informations de paiement et préférences de location.",
  "dataUseTitle": "Utilisation des données",
  "dataUseText": "Les informations que nous collectons sont utilisées pour personnaliser votre expérience, améliorer notre site web, améliorer le service client et traiter les transactions. Nous pouvons également utiliser votre adresse e-mail pour vous envoyer des informations, des mises à jour sur votre compte, des nouvelles de l'entreprise et des offres spéciales.",
  "dataSharingTitle": "Partage des données",
  "dataSharingText": "Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles à des tiers sans votre consentement, sauf lorsque cela est nécessaire pour fournir un service demandé ou exigé par la loi.",
  "dataProtectionTitle": "Protection des données",
  "dataProtectionText": "Nous mettons en place une variété de mesures de sécurité pour maintenir la sécurité de vos informations personnelles. Nous utilisons un cryptage avancé pour protéger les informations sensibles transmises en ligne et nous protégeons également vos informations hors ligne.",
  "cookiesTitle": "Cookies",
  "cookiesText": "Notre site web utilise des cookies pour améliorer votre expérience. Les cookies sont de petits fichiers qu'un site ou son fournisseur de services transfère sur le disque dur de votre ordinateur via votre navigateur Web (si vous l'autorisez).",
  "thirdPartyTitle": "Services tiers",
  "thirdPartyText": "Nous utilisons des services tiers pour nous aider à exploiter notre site web, à mener nos activités ou à administrer des services en notre nom. Ces fournisseurs peuvent avoir accès aux informations personnelles nécessaires pour effectuer leurs fonctions, mais ils ne sont pas autorisés à les partager ou à les utiliser à d'autres fins.",
  "userRightsTitle": "Vos droits",
  "userRightsText": "Vous avez le droit d'accéder, de corriger ou de supprimer vos données personnelles. Vous pouvez également vous opposer au traitement de vos données ou demander une limitation de ce traitement. Pour exercer ces droits, veuillez nous contacter via les coordonnées fournies ci-dessous.",
  "contactPrivacyTitle": "Nous contacter",
  "contactPrivacyText": "Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter par email à privacy@carrentalpro.fr ou par téléphone au +33 1 23 45 67 89.",

  // Terms of service sections
  "termsTitle": "Conditions d'utilisation",
  "termsIntroTitle": "Introduction",
  "termsIntroText": "Ces conditions d'utilisation régissent votre utilisation de notre site web et de nos services. En accédant à notre site ou en utilisant nos services, vous acceptez d'être lié par ces conditions. Si vous n'êtes pas d'accord avec ces conditions, vous ne devez pas accéder à notre site ou utiliser nos services.",
  "accountTermsTitle": "Comptes utilisateurs",
  "accountTermsText": "Lorsque vous créez un compte sur notre site, vous devez fournir des informations précises, complètes et à jour. Vous êtes responsable de la confidentialité de votre compte et de votre mot de passe et de toute activité qui se produit sous votre compte.",
  "bookingTermsTitle": "Réservations et paiements",
  "bookingTermsText": "Les réservations sont soumises à disponibilité. Les prix indiqués sur notre site sont en euros et incluent la TVA. Le paiement est requis au moment de la réservation. Nous acceptons les principales cartes de crédit et de débit.",
  "cancellationTermsTitle": "Annulations et remboursements",
  "cancellationTermsText": "Les annulations effectuées au moins 48 heures avant la date de prise en charge sont remboursées à 100%. Les annulations effectuées moins de 48 heures avant la date de prise en charge ne sont pas remboursables. Les remboursements sont traités sur la même carte de paiement utilisée pour la réservation.",
  "liabilityTermsTitle": "Limitation de responsabilité",
  "liabilityTermsText": "Notre responsabilité envers vous pour toute perte ou dommage subi en raison de notre négligence ou de notre violation de ces conditions ne dépassera pas le montant total de votre réservation. Nous ne sommes pas responsables des pertes ou dommages indirects.",
  "intellectualPropertyTermsTitle": "Propriété intellectuelle",
  "intellectualPropertyTermsText": "Tout le contenu de notre site web, y compris les textes, graphiques, logos, icônes, images et logiciels, est la propriété de CarRentalPro ou de nos fournisseurs de contenu et est protégé par les lois sur les droits d'auteur.",
  "disputeTermsTitle": "Résolution des litiges",
  "disputeTermsText": "Ces conditions sont régies par les lois françaises. Tout litige découlant de ces conditions ou lié à celles-ci sera soumis à la juridiction exclusive des tribunaux français.",
  "modificationTermsTitle": "Modifications des conditions",
  "modificationTermsText": "Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur notre site. Il est de votre responsabilité de consulter régulièrement ces conditions.",
  "contactTermsTitle": "Nous contacter",
  "contactTermsText": "Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter par email à contact@carrentalpro.fr ou par téléphone au +33 1 23 45 67 89.",
  
  // Cookie policy sections
  "cookieIntroTitle": "Introduction aux cookies",
  "whatAreCookiesTitle": "Que sont les cookies ?",
  "whatAreCookiesText": "Les cookies sont de petits fichiers texte placés sur votre appareil lorsque vous visitez un site web. Ils sont largement utilisés pour faire fonctionner les sites web ou les rendre plus efficaces, ainsi que pour fournir des informations aux propriétaires du site.",
  "cookieTypesTitle": "Types de cookies que nous utilisons",
  "cookieTypesText": "Nous utilisons différents types de cookies : des cookies essentiels pour le fonctionnement du site, des cookies analytiques pour comprendre comment les visiteurs interagissent avec notre site, des cookies de fonctionnalité pour se souvenir de vos préférences et des cookies publicitaires pour vous montrer des publicités pertinentes.",
  "cookieControlTitle": "Comment contrôler les cookies",
  "cookieControlText": "Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies déjà présents sur votre appareil et vous pouvez configurer la plupart des navigateurs pour les empêcher d'être placés.",
  "cookieChangesTitle": "Modifications de notre politique de cookies",
  "cookieChangesText": "Nous pouvons mettre à jour notre politique de cookies de temps à autre. Nous vous encourageons à consulter régulièrement cette page pour vous tenir informé des modifications.",
  "cookieContactTitle": "Nous contacter",
  "cookieContactText": "Si vous avez des questions concernant notre utilisation des cookies, veuillez nous contacter par email à privacy@carrentalpro.fr ou par téléphone au +33 1 23 45 67 89.",

  // Settings page
  "generalSettings": "Paramètres généraux",
  "accountSettings": "Paramètres du compte",
  "notificationSettings": "Paramètres de notification",
  "languageSettings": "Paramètres de langue",
  "darkMode": "Mode sombre",
  "deleteAccount": "Supprimer le compte",
  "deleteAccountWarning": "Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible.",
  "confirm": "Confirmer",
  "chooseLanguage": "Choisir la langue",
  "french": "Français",
  "english": "Anglais",
  "receiveEmails": "Recevoir des emails",
  "receiveSMS": "Recevoir des SMS",
  "marketingCommunications": "Communications marketing",
  "saveSettings": "Enregistrer les paramètres",
  "settingsSaved": "Paramètres enregistrés avec succès.",
  "languageChanged": "Langue modifiée",
  "languageChangedTo": "La langue a été changée en {language}"
};

// English translations
const enTranslations: Record<string, string> = {
  // Common translations
  "home": "Home",
  "cars": "Cars",
  "reservations": "Reservations",
  "contact": "Contact",
  "login": "Login",
  "logout": "Logout",
  "signup": "Sign up",
  "admin": "Admin",
  "user": "User",
  "settings": "Settings",
  "dashboard": "Dashboard",
  "search": "Search",
  "profile": "Profile",
  "back": "Back",
  "next": "Next",
  "previous": "Previous",
  "save": "Save",
  "cancel": "Cancel",
  "delete": "Delete",
  "edit": "Edit",
  "create": "Create",
  "add": "Add",
  "remove": "Remove",
  "detail": "Detail",
  "details": "Details",
  "loading": "Loading...",
  "error": "Error",
  "success": "Success",
  "warning": "Warning",
  "info": "Information",
  "close": "Close",
  "submit": "Submit",
  "send": "Send",
  "required": "Required",
  "optional": "Optional",
  "email": "Email",
  "password": "Password",
  "name": "Name",
  "firstName": "First Name",
  "lastName": "Last Name",
  "address": "Address",
  "phone": "Phone",
  "city": "City",
  "country": "Country",
  "zipCode": "Zip Code",
  "dateOfBirth": "Date of Birth",
  "gender": "Gender",
  "male": "Male",
  "female": "Female",
  "other": "Other",
  "avatar": "Avatar",
  "profileTitle": "User Profile",
  "profileSubtitle": "Manage your personal information",
  "saveChanges": "Save Changes",
  "generateAvatar": "Generate",
  "profileUpdatedTitle": "Profile Updated",
  "profileUpdatedDesc": "Your information has been successfully updated.",
  "profilePrivacyNotice": "Your personal information is protected by our privacy policy.",
  
  // Added translations for favorites
  "addedToFavorites": "Added to favorites",
  "addedToFavoritesDescription": "The vehicle has been added to your favorites",
  "removedFromFavorites": "Removed from favorites",
  "removedFromFavoritesDescription": "The vehicle has been removed from your favorites",
  "availabilityUpdated": "Availability updated",
  "vehicleNowUnavailable": "Vehicle {car} is now unavailable",
  "vehicleNowAvailable": "Vehicle {car} is now available",
  
  // Car categories
  "tous": "All",
  "berline": "Sedan",
  "suv": "SUV", 
  "électrique": "Electric",
  "sport": "Sport",
  "premium": "Premium",
  
  // Featured cars section 
  "ourPremiumVehicles": "Our Fleet",
  "featuredCarsDescription": "Discover our selection of premium vehicles for all your needs",
  "viewAllVehicles": "View all vehicles",
  
  // Home page
  "heroTitle": "Professional Car Rental",
  "heroSubtitle": "Discover our fleet of quality vehicles for all your transportation needs.",
  "heroButtonPrimary": "Book Now",
  "heroButtonSecondary": "Learn More",
  "featuredCarsTitle": "Featured Vehicles",
  "featuredCarsSubtitle": "Discover our selection of popular vehicles",
  "viewAllCars": "View All Vehicles",
  "howItWorksTitle": "How It Works",
  "howItWorksSubtitle": "Simple rental in 3 steps",
  "step1Title": "Choose Your Vehicle",
  "step1Description": "Browse our vast selection of vehicles and choose the one that suits your needs.",
  "step2Title": "Book Online",
  "step2Description": "Select your dates and complete your reservation in just a few clicks.",
  "step3Title": "Enjoy Your Trip",
  "step3Description": "Pick up your vehicle and enjoy your trip with peace of mind.",
  "testimonialsTitle": "Customer Testimonials",
  "testimonialsSubtitle": "What our customers say about us",

  // Cars page
  "allVehiclesTitle": "All Our Vehicles",
  "allVehiclesSubtitle": "Find the perfect vehicle for your next trip",
  "filterByCategory": "Filter by Category",
  "filterByBrand": "Filter by Brand",
  "filterByPrice": "Filter by Price",
  "sort": "Sort",
  "sortByPriceLowToHigh": "Price: Low to High",
  "sortByPriceHighToLow": "Price: High to Low",
  "sortByPopularity": "Popularity",
  "sortByNewest": "Newest",
  "clearFilters": "Clear Filters",
  "pricePerDay": "Price per day",
  "seatsAvailable": "Seats available",
  "transmission": "Transmission",
  "fuelType": "Fuel Type",
  "automatic": "Automatic",
  "manual": "Manual",
  "gasoline": "Gasoline",
  "diesel": "Diesel",
  "electric": "Electric",
  "hybrid": "Hybrid",
  "viewDetails": "View Details",
  "bookNow": "Book Now",
  "noVehiclesFound": "No vehicles match your search criteria.",
  "searchResults": "Search Results",
  "addToFavorites": "Add to Favorites",
  "removeFromFavorites": "Remove from Favorites",

  // Vehicle details page
  "vehicleSpecifications": "Vehicle Specifications",
  "availableDates": "Available Dates",
  "pickupDate": "Pickup Date",
  "returnDate": "Return Date",
  "totalPrice": "Total Price",
  "included": "Included",
  "notIncluded": "Not Included",
  "insurance": "Insurance",
  "unlimitedMileage": "Unlimited Mileage",
  "roadAssistance": "Road Assistance",
  "additionalDriver": "Additional Driver",
  "childSeat": "Child Seat",
  "gps": "GPS",
  "selectDates": "Select Dates",
  "bookThisVehicle": "Book This Vehicle",
  "similarVehicles": "Similar Vehicles",
  "vehicleFeatures": "Features",
  "reviews": "Reviews",
  "leaveAReview": "Leave a Review",
  "rating": "Rating",
  "comment": "Comment",
  "submitReview": "Submit Review",
  "reviewSubmitted": "Your review has been submitted successfully.",
  "reviewError": "An error occurred while submitting your review.",
  "loginToReview": "Please login to leave a review.",

  // Reservation page
  "myReservations": "My Reservations",
  "noReservations": "You don't have any reservations yet.",
  "upcomingReservations": "Upcoming Reservations",
  "pastReservations": "Past Reservations",
  "reservationDetails": "Reservation Details",
  "reservationDate": "Reservation Date",
  "reservationStatus": "Status",
  "confirmed": "Confirmed",
  "pending": "Pending",
  "cancelled": "Cancelled",
  "completed": "Completed",
  "modifyReservation": "Modify",
  "cancelReservation": "Cancel",
  "confirmCancellation": "Are you sure you want to cancel this reservation?",
  "cancellationPolicy": "Cancellation Policy",
  "cancellationPolicyText": "Cancellations made at least 48 hours before the pickup date are refunded 100%. Cancellations made less than 48 hours before the pickup date are not refundable.",
  "invoiceDetails": "Invoice Details",
  "downloadInvoice": "Download Invoice",
  "paymentMethod": "Payment Method",
  "paymentStatus": "Payment Status",
  "paid": "Paid",
  "unpaid": "Unpaid",
  "partial": "Partial",

  // Contact page
  "contactTitle": "Contact Us",
  "contactSubtitle": "We're here to help you",
  "contactFormTitle": "Send Us a Message",
  "contactFormSubtitle": "Fill out the form below and we will get back to you as soon as possible.",
  "yourName": "Your Name",
  "yourEmail": "Your Email",
  "subject": "Subject",
  "message": "Message",
  "sendMessage": "Send Message",
  "messageSent": "Your message has been sent successfully.",
  "messageError": "An error occurred while sending your message.",
  "ourContacts": "Our Contacts",
  "callUs": "Call Us",
  "emailUs": "Email Us",
  "visitUs": "Visit Us",
  "openingHours": "Opening Hours",
  "mondayFriday": "Monday - Friday",
  "saturdaySunday": "Saturday - Sunday",
  "followUs": "Follow Us",

  // Auth pages
  "loginTitle": "Login to Your Account",
  "loginSubtitle": "Enter your credentials to access your account",
  "forgotPassword": "Forgot Password?",
  "rememberMe": "Remember Me",
  "dontHaveAccount": "Don't have an account?",
  "createAccount": "Create an Account",
  "signupTitle": "Create an Account",
  "signupSubtitle": "Fill out the form to create a new account",
  "alreadyHaveAccount": "Already have an account?",
  "termsAndConditions": "I agree to the Terms of Service and Privacy Policy",
  "confirmPassword": "Confirm Password",
  "passwordsDontMatch": "Passwords don't match",
  "resetPasswordTitle": "Reset Password",
  "resetPasswordSubtitle": "Enter your email to reset your password",
  "resetPasswordInstructions": "We will send you a link to reset your password.",
  "resetPasswordSent": "Reset instructions have been sent to your email.",
  "resetPasswordError": "An error occurred. Please try again.",
  "backToLogin": "Back to Login",
  "loginWithGoogle": "Login with Google",
  "loginWithFacebook": "Login with Facebook",
  "or": "Or",

  // Footer
  "aboutUs": "About Us",
  "termsOfService": "Terms of Service",
  "privacyPolicy": "Privacy Policy",
  "cookiePolicy": "Cookie Policy",
  "faq": "FAQ",
  "blog": "Blog",
  "careers": "Careers",
  "allRightsReserved": "All Rights Reserved",
  "newsletterTitle": "Subscribe to Our Newsletter",
  "newsletterSubtitle": "Get our latest offers and news",
  "subscribe": "Subscribe",
  "yourEmailAddress": "Your Email Address",
  "subscriptionSuccess": "Thank you for subscribing to our newsletter!",
  "subscriptionError": "An error occurred. Please try again.",

  // Privacy policy sections
  "privacyPolicyTitle": "Privacy Policy",
  "privacyIntroTitle": "Introduction",
  "privacyIntroText": "At CarRentalPro, we take your data privacy very seriously. This Privacy Policy describes how we collect, use, and protect your personal information when you use our website and services.",
  "dataCollectionTitle": "Data Collection",
  "dataCollectionText": "We collect information when you register on our site, make a reservation, respond to a survey, or fill out a form. The information collected includes your name, email address, phone number, address, payment information, and rental preferences.",
  "dataUseTitle": "Data Use",
  "dataUseText": "The information we collect is used to personalize your experience, improve our website, improve customer service, and process transactions. We may also use your email address to send you information, account updates, company news, and special offers.",
  "dataSharingTitle": "Data Sharing",
  "dataSharingText": "We do not sell, trade, or transfer your personal information to third parties without your consent, except when necessary to provide a service you've requested or required by law.",
  "dataProtectionTitle": "Data Protection",
  "dataProtectionText": "We implement a variety of security measures to maintain the safety of your personal information. We use advanced encryption to protect sensitive information transmitted online and we also protect your information offline.",
  "cookiesTitle": "Cookies",
  "cookiesText": "Our website uses cookies to enhance your experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site to recognize your browser and remember certain information.",
  "thirdPartyTitle": "Third-Party Services",
  "thirdPartyText": "We use third-party services to help us operate our website, conduct our business, or administer services on our behalf. These providers may have access to your personal information needed to perform their functions but are not permitted to share or use the information for any other purpose.",
  "userRightsTitle": "Your Rights",
  "userRightsText": "You have the right to access, correct, or delete your personal data. You can also object to the processing of your data or request a limitation of this processing. To exercise these rights, please contact us via the contact details provided below.",
  "contactPrivacyTitle": "Contact Us",
  "contactPrivacyText": "If you have any questions about this Privacy Policy, please contact us by email at privacy@carrentalpro.fr or by phone at +33 1 23 45 67 89.",

  // Terms of service sections
  "termsTitle": "Terms of Service",
  "termsIntroTitle": "Introduction",
  "termsIntroText": "These Terms of Service govern your use of our website and services. By accessing our site or using our services, you agree to be bound by these terms. If you disagree with these terms, you must not access our site or use our services.",
  "accountTermsTitle": "User Accounts",
  "accountTermsText": "When you create an account on our site, you must provide accurate, complete, and up-to-date information. You are responsible for maintaining the confidentiality of your account and password and for any activity that occurs under your account.",
  "bookingTermsTitle": "Bookings and Payments",
  "bookingTermsText": "Bookings are subject to availability. Prices shown on our site are in Euros and include VAT. Payment is required at the time of booking. We accept major credit and debit cards.",
  "cancellationTermsTitle": "Cancellations and Refunds",
  "cancellationTermsText": "Cancellations made at least 48 hours before the pickup date are refunded 100%. Cancellations made less than 48 hours before the pickup date are not refundable. Refunds are processed to the same payment card used for the booking.",
  "liabilityTermsTitle": "Limitation of Liability",
  "liabilityTermsText": "Our liability to you for any loss or damage suffered due to our negligence or breach of these terms shall not exceed the total amount of your booking. We are not liable for indirect loss or damage.",
  "intellectualPropertyTermsTitle": "Intellectual Property",
  "intellectualPropertyTermsText": "All content on our website, including text, graphics, logos, icons, images, and software, is the property of CarRentalPro or our content suppliers and is protected by copyright laws.",
  "disputeTermsTitle": "Dispute Resolution",
  "disputeTermsText": "These terms are governed by French law. Any dispute arising from or related to these terms will be subject to the exclusive jurisdiction of the French courts.",
  "modificationTermsTitle": "Modifications to Terms",
  "modificationTermsText": "We reserve the right to modify these terms at any time. Modifications will take effect immediately upon posting on our site. It is your responsibility to check these terms regularly.",
  "contactTermsTitle": "Contact Us",
  "contactTermsText": "If you have any questions about these Terms of Service, please contact us by email at contact@carrentalpro.fr or by phone at +33 1 23 45 67 89.",
  
  // Cookie policy sections
  "cookieIntroTitle": "Introduction to Cookies",
  "whatAreCookiesTitle": "What Are Cookies",
  "whatAreCookiesText": "Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work or work more efficiently, as well as to provide information to the site owners.",
  "cookieTypesTitle": "Types of Cookies We Use",
  "cookieTypesText": "We use different types of cookies: essential cookies for the operation of the site, analytical cookies to understand how visitors interact with our site, functionality cookies to remember your preferences, and advertising cookies to show you relevant advertisements.",
  "cookieControlTitle": "How to Control Cookies",
  "cookieControlText": "You can control and/or delete cookies as you wish. You can delete all cookies already on your device and you can set most browsers to prevent them from being placed.",
  "cookieChangesTitle": "Changes to Our Cookie Policy",
  "cookieChangesText": "We may update our Cookie Policy from time to time. We encourage you to periodically review this page to stay informed of any changes.",
  "cookieContactTitle": "Contact Us",
  "cookieContactText": "If you have any questions about our use of cookies, please contact us by email at privacy@carrentalpro.fr or by phone at +33 1 23 45 67 89.",

  // Settings page
  "generalSettings": "General Settings",
  "accountSettings": "Account Settings",
  "notificationSettings": "Notification Settings",
  "languageSettings": "Language Settings",
  "darkMode": "Dark Mode",
  "deleteAccount": "Delete Account",
  "deleteAccountWarning": "Are you sure you want to delete your account? This action is irreversible.",
  "confirm": "Confirm",
  "chooseLanguage": "Choose Language",
  "french": "French",
  "english": "English",
  "receiveEmails": "Receive Emails",
  "receiveSMS": "Receive SMS",
  "marketingCommunications": "Marketing Communications",
  "saveSettings": "Save Settings",
  "settingsSaved": "Settings saved successfully.",
  "languageChanged": "Language changed",
  "languageChangedTo": "Language has been changed to {language}"
};

// Helper function to replace parameters in translation strings
const replaceParams = (text: string, params?: Record<string, string | number>): string => {
  if (!params) return text;
  
  return Object.entries(params).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }, text);
};

// TranslationProvider component
export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to the first language
  const [language, setLanguage] = useState<LanguageOption>(availableLanguages[0]);

  // Effect to load the language from localStorage on mount
  useEffect(() => {
    const storedLanguageCode = localStorage.getItem('language');
    if (storedLanguageCode) {
      const foundLanguage = availableLanguages.find(lang => lang.code === storedLanguageCode);
      if (foundLanguage) {
        setLanguage(foundLanguage);
      }
    }
  }, []);

  // Function to change language and save to localStorage
  const changeLanguage = (lang: LanguageOption) => {
    setLanguage(lang);
    localStorage.setItem('language', lang.code);
  };

  // Function to get translation with optional parameter replacement
  const t = (key: string, params?: Record<string, string | number>): string => {
    const translations = language.code === 'fr' ? frTranslations : enTranslations;
    const translation = translations[key] || key;
    return replaceParams(translation, params);
  };

  // Context value
  const contextValue: TranslationContextType = {
    language,
    setLanguage: changeLanguage,
    t,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use translations
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
