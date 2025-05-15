
import { createContext, useContext, useState, useEffect } from "react";

// Language type
type Language = {
  code: string;
  name: string;
  flag: string;
};

// Context type
type TranslationContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
  availableLanguages: Language[];
};

// Available languages
export const availableLanguages: Language[] = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "it", name: "Italiano", flag: "🇮🇹" }
];

// Translation strings organized by language code
const translations: Record<string, Record<string, string>> = {
  fr: {
    // Navigation
    "home": "Accueil",
    "cars": "Nos Véhicules",
    "reservations": "Réservations",
    "contact": "Contact",
    "login": "Connexion",
    "signup": "S'inscrire",
    "logout": "Déconnexion",
    "admin": "Admin",
    "user": "Utilisateur",
    
    // Footer
    "footerDescription": "Votre partenaire de confiance pour la location de véhicules de qualité supérieure. Notre mission est de vous offrir la meilleure expérience de location possible.",
    "quickLinks": "Liens rapides",
    "categories": "Catégories",
    "sedan": "Berlines",
    "suv": "SUVs",
    "electric": "Électriques",
    "luxury": "Voitures de Luxe",
    "economic": "Économiques",
    "utility": "Utilitaires",
    "allRightsReserved": "Tous droits réservés.",
    
    // Featured Cars
    "ourPremiumVehicles": "Nos Véhicules",
    "premium": "Premium",
    "featuredCarsDescription": "Découvrez notre sélection de véhicules de haute qualité pour tous vos besoins et budgets. Nous offrons une large gamme de voitures pour répondre à toutes vos exigences.",
    "tous": "Tous",
    "berline": "Berline",
    "suv": "SUV",
    "électrique": "Électrique",
    "sport": "Sport",
    "viewAllVehicles": "Voir tous les véhicules",
    "addedToFavorites": "Ajouté aux favoris",
    "addedToFavoritesDescription": "Le véhicule a été ajouté à vos favoris",
    "removedFromFavorites": "Retiré des favoris",
    "removedFromFavoritesDescription": "Le véhicule a été retiré de vos favoris",
    "availabilityUpdated": "Disponibilité mise à jour",
    "vehicleNowUnavailable": "{car} est maintenant indisponible",
    "vehicleNowAvailable": "{car} est maintenant disponible",
    
    // Language
    "languageChanged": "Langue modifiée",
    "languageChangedTo": "La langue a été changée en {language}",
    
    // Auth
    "fullName": "Nom complet",
    "enterFullName": "Entrez votre nom complet",
    "email": "Email",
    "password": "Mot de passe",
    "confirmPassword": "Confirmer le mot de passe",
    "forgotPassword": "Mot de passe oublié ?",
    "backToLogin": "Retour à la connexion",
    "dontHaveAccount": "Vous n'avez pas de compte ?",
    "alreadyHaveAccount": "Vous avez déjà un compte ?",
    "createAccount": "Créer un compte",
    "loginAccount": "Se connecter",
    "forgotPasswordDescription": "Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
    "sendResetLink": "Envoyer le lien de réinitialisation",
    "sending": "Envoi en cours...",
    "passwordResetEmailInfo": "Nous vous enverrons un lien pour réinitialiser votre mot de passe.",
    "passwordResetEmailSent": "Email de réinitialisation envoyé",
    "passwordResetInstructions": "Des instructions ont été envoyées à {email}",
    "passwordResetEmailSentDescription": "Veuillez vérifier votre email pour un lien de réinitialisation.",
    "tryAnotherEmail": "Essayer une autre adresse email",
    "passwordResetError": "Erreur de réinitialisation",
    "passwordResetErrorMessage": "Une erreur s'est produite lors de l'envoi de l'email. Veuillez réessayer.",
    
    // Reservation
    "bookNow": "Réserver maintenant",
    "pickupDate": "Date de prise en charge",
    "returnDate": "Date de retour",
    "phoneNumber": "Numéro de téléphone",
    "rentalPrice": "Prix de la location :",
    "confirmReservation": "Confirmer la réservation",
    "processing": "Traitement en cours...",
    "vehicleUnavailable": "Véhicule indisponible",
    "vehicleUnavailableMessage": "Ce véhicule n'est actuellement pas disponible à la location.",
    "reservationSuccess": "Réservation confirmée",
    "reservationSuccessDescription": "Votre réservation pour {car} a été confirmée.",
    "reservationError": "Erreur de réservation",
    "reservationErrorDescription": "Une erreur s'est produite lors de la réservation. Veuillez réessayer.",
    "features": "Caractéristiques",
    "seats": "sièges",
    "vehicleNotFound": "Véhicule non trouvé",
    "vehicleNotFoundDescription": "Le véhicule que vous recherchez n'existe pas ou a été supprimé.",
    "backToCars": "Retour aux véhicules",
    
    // Footer pages
    "privacyPolicy": "Politique de confidentialité",
    "termsOfService": "Conditions d'utilisation",
    "cookiePolicy": "Gestion des cookies",
    "privacyPolicyLastUpdated": "Dernière mise à jour :",
    "termsLastUpdated": "Dernière mise à jour :",
    "cookieLastUpdated": "Dernière mise à jour :",
    "date": "{date, date, long}",
    
    // Privacy policy sections
    "privacyIntroTitle": "Introduction",
    "privacyIntroText": "Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre service de location de voitures.",
    "dataCollectionTitle": "Collecte des données",
    "dataCollectionText": "Nous collectons différents types d'informations à diverses fins pour vous fournir et améliorer notre service.",
    "personalDataTitle": "Données personnelles",
    "personalDataText": "Lors de votre utilisation de notre service, nous pouvons vous demander de nous fournir certaines informations personnelles qui peuvent être utilisées pour vous contacter ou vous identifier, notamment :",
    "personalDataName": "Nom et prénom",
    "personalDataEmail": "Adresse e-mail",
    "personalDataPhone": "Numéro de téléphone",
    "personalDataAddress": "Adresse postale",
    "personalDataPayment": "Informations de paiement",
    "usageDataTitle": "Données d'utilisation",
    "usageDataText": "Nous pouvons également recueillir des informations sur la façon dont le service est utilisé, notamment votre adresse IP, le type de navigateur, la version du navigateur, les pages de notre service que vous visitez, l'heure et la date de votre visite, le temps passé sur ces pages, et d'autres statistiques.",
    "dataUseTitle": "Utilisation des données",
    "dataUseText": "Nous utilisons les données collectées pour diverses finalités :",
    "dataUseProvideService": "Pour fournir et maintenir notre service",
    "dataUseImproveService": "Pour améliorer notre service",
    "dataUseCommunicate": "Pour communiquer avec vous",
    "dataUseLegal": "Pour se conformer aux obligations légales",
    "dataSharingTitle": "Partage des données",
    "dataSharingText": "Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos informations avec nos prestataires de services, partenaires commerciaux et affiliés qui nous aident à vous fournir nos services.",
    "dataSecurityTitle": "Sécurité des données",
    "dataSecurityText": "La sécurité de vos données est importante pour nous. Nous nous efforçons d'utiliser des moyens commercialement acceptables pour protéger vos informations personnelles, mais nous ne pouvons pas garantir leur sécurité absolue.",
    "yourRightsTitle": "Vos droits",
    "yourRightsText": "En vertu de la réglementation sur la protection des données, vous disposez des droits suivants :",
    "rightsAccess": "Droit d'accès à vos données personnelles",
    "rightsRectification": "Droit de rectification des données inexactes",
    "rightsDeletion": "Droit à l'effacement de vos données",
    "rightsRestriction": "Droit à la limitation du traitement",
    "rightsPortability": "Droit à la portabilité des données",
    "rightsObjection": "Droit d'opposition au traitement",
    "contactTitle": "Contact",
    "contactText": "Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter par email à contact@carrentalpro.fr ou par téléphone au +33 1 23 45 67 89.",
    
    // Terms of service sections
    "termsIntroTitle": "Introduction",
    "termsIntroText": "Ces conditions d'utilisation régissent votre utilisation de notre service de location de voitures et constituent un accord juridiquement contraignant entre vous et CarRentalPro.",
    "definitionsTitle": "Définitions",
    "definitionsText": "Dans ces conditions d'utilisation, les termes suivants ont la signification suivante :",
    "definitionService": "Service",
    "definitionServiceText": "Le service de location de voitures proposé par CarRentalPro",
    "definitionCompany": "Société",
    "definitionCompanyText": "CarRentalPro, la société qui exploite le service",
    "definitionUser": "Utilisateur",
    "definitionUserText": "La personne qui accède ou utilise le service",
    "definitionVehicle": "Véhicule",
    "definitionVehicleText": "La voiture ou tout autre véhicule mis à disposition pour la location",
    "definitionRental": "Location",
    "definitionRentalText": "L'accord temporaire permettant à l'utilisateur d'utiliser un véhicule",
    "accountTitle": "Votre compte",
    "accountText": "Pour utiliser certaines fonctionnalités de notre service, vous devez créer un compte. Vous êtes responsable du maintien de la confidentialité de votre compte et de votre mot de passe.",
    "accountResponsibility": "Vous acceptez d'être responsable de toutes les activités qui se produisent sous votre compte.",
    "rentalProcessTitle": "Processus de location",
    "rentalProcessText": "Le processus de location est soumis aux conditions suivantes :",
    "reservationsTitle": "Réservations",
    "reservationsText": "Les réservations sont sujettes à disponibilité. Nous nous réservons le droit d'annuler ou de modifier une réservation en cas de circonstances exceptionnelles.",
    "paymentTitle": "Paiement",
    "paymentText": "Le paiement doit être effectué avant la prise en charge du véhicule. Des frais supplémentaires peuvent s'appliquer pour les retours tardifs ou les dommages.",
    "cancellationTitle": "Annulation",
    "cancellationText": "Notre politique d'annulation permet des remboursements complets jusqu'à 48 heures avant la date de location prévue. Des frais d'annulation peuvent s'appliquer pour les annulations tardives.",
    "vehicleUseTitle": "Utilisation du véhicule",
    "vehicleUseText": "Vous acceptez d'utiliser le véhicule conformément à toutes les lois et réglementations applicables et selon les termes spécifiés dans le contrat de location.",
    "prohibitedUsesTitle": "Utilisations interdites",
    "prohibitedUsesText": "Le véhicule ne doit pas être utilisé pour des activités illégales, des compétitions, des tests, pour remorquer d'autres véhicules (sauf autorisation expresse), ou être conduit par une personne non autorisée.",
    "liabilityTitle": "Limitation de responsabilité",
    "liabilityText": "Dans la mesure permise par la loi, notre responsabilité est limitée au montant payé pour la location. Nous ne sommes pas responsables des dommages indirects, spéciaux ou consécutifs.",
    "changesTitle": "Modifications des conditions",
    "changesText": "Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront publiées sur notre site web et prendront effet immédiatement.",
    "contactTermsText": "Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter par email à contact@carrentalpro.fr ou par téléphone au +33 1 23 45 67 89.",
    
    // Cookie policy sections
    "cookiePolicy": "Politique de cookies",
    "whatAreCookiesTitle": "Que sont les cookies ?",
    "whatAreCookiesText": "Les cookies sont de petits fichiers texte placés sur votre appareil lorsque vous visitez un site web. Ils sont largement utilisés pour faire fonctionner les sites web ou les rendre plus efficaces, ainsi que pour fournir des informations aux propriétaires du site.",
    "cookieTypesTitle": "Types de cookies que nous utilisons",
    "cookieTypesText": "Nous utilisons différents types de cookies pour diverses raisons :",
    "essentialCookiesTitle": "Cookies essentiels",
    "essentialCookiesText": "Ces cookies sont nécessaires au fonctionnement de notre site web. Ils vous permettent de naviguer sur notre site et d'utiliser ses fonctionnalités.",
    "functionCookiesTitle": "Cookies de fonctionnalité",
    "functionCookiesText": "Ces cookies nous permettent de reconnaître et de mémoriser vos préférences, comme votre langue préférée ou votre région.",
    "analyticsCookiesTitle": "Cookies d'analyse",
    "analyticsCookiesText": "Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web en collectant et en signalant des informations de manière anonyme.",
    "marketingCookiesTitle": "Cookies de marketing",
    "marketingCookiesText": "Ces cookies sont utilisés pour suivre les visiteurs sur les sites web. L'intention est d'afficher des publicités pertinentes et attrayantes pour l'utilisateur individuel.",
    "cookieControlTitle": "Comment contrôler les cookies",
    "cookieControlText": "Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies déjà présents sur votre appareil et vous pouvez configurer la plupart des navigateurs pour qu'ils ne les acceptent pas.",
    "browserSettings": "Voici comment gérer les cookies dans les navigateurs populaires :",
    "cookiesWeUseTitle": "Cookies spécifiques que nous utilisons",
    "cookiesWeUseText": "Voici une liste des cookies spécifiques que nous utilisons sur notre site :",
    "cookieName": "Nom du cookie",
    "cookiePurpose": "Objectif",
    "cookieExpiration": "Expiration",
    "sessionCookieDescription": "Pour maintenir votre session active",
    "preferencesCookieDescription": "Pour mémoriser vos préférences de site",
    "gaCookieDescription": "Utilisé par Google Analytics pour distinguer les utilisateurs",
    "sessionLength": "Session",
    "year": "an",
    "years": "ans",
    "contactCookiesText": "Si vous avez des questions concernant notre politique de cookies, veuillez nous contacter par email à contact@carrentalpro.fr ou par téléphone au +33 1 23 45 67 89.",
  },
  en: {
    // Navigation
    "home": "Home",
    "cars": "Our Vehicles",
    "reservations": "Reservations",
    "contact": "Contact",
    "login": "Login",
    "signup": "Sign Up",
    "logout": "Logout",
    "admin": "Admin",
    "user": "User",
    
    // Footer
    "footerDescription": "Your trusted partner for premium quality vehicle rentals. Our mission is to provide you with the best possible rental experience.",
    "quickLinks": "Quick Links",
    "categories": "Categories",
    "sedan": "Sedans",
    "suv": "SUVs",
    "electric": "Electric",
    "luxury": "Luxury Cars",
    "economic": "Economy",
    "utility": "Utility",
    "allRightsReserved": "All rights reserved.",
    
    // Featured Cars
    "ourPremiumVehicles": "Our Vehicles",
    "premium": "Premium",
    "featuredCarsDescription": "Discover our selection of high-quality vehicles for all your needs and budgets. We offer a wide range of cars to meet all your requirements.",
    "tous": "All",
    "berline": "Sedan",
    "suv": "SUV",
    "électrique": "Electric",
    "sport": "Sport",
    "viewAllVehicles": "View All Vehicles",
    "addedToFavorites": "Added to favorites",
    "addedToFavoritesDescription": "The vehicle has been added to your favorites",
    "removedFromFavorites": "Removed from favorites",
    "removedFromFavoritesDescription": "The vehicle has been removed from your favorites",
    "availabilityUpdated": "Availability updated",
    "vehicleNowUnavailable": "{car} is now unavailable",
    "vehicleNowAvailable": "{car} is now available",
    
    // Language
    "languageChanged": "Language Changed",
    "languageChangedTo": "Language has been changed to {language}",
    
    // Auth
    "fullName": "Full Name",
    "enterFullName": "Enter your full name",
    "email": "Email",
    "password": "Password",
    "confirmPassword": "Confirm Password",
    "forgotPassword": "Forgot Password?",
    "backToLogin": "Back to Login",
    "dontHaveAccount": "Don't have an account?",
    "alreadyHaveAccount": "Already have an account?",
    "createAccount": "Create Account",
    "loginAccount": "Login",
    "forgotPasswordDescription": "Enter your email address and we'll send you a link to reset your password.",
    "sendResetLink": "Send Reset Link",
    "sending": "Sending...",
    "passwordResetEmailInfo": "We'll send you a link to reset your password.",
    "passwordResetEmailSent": "Reset Email Sent",
    "passwordResetInstructions": "Instructions have been sent to {email}",
    "passwordResetEmailSentDescription": "Please check your email for a reset link.",
    "tryAnotherEmail": "Try Another Email",
    "passwordResetError": "Reset Error",
    "passwordResetErrorMessage": "An error occurred while sending the email. Please try again.",
    
    // Reservation
    "bookNow": "Book Now",
    "pickupDate": "Pickup Date",
    "returnDate": "Return Date",
    "phoneNumber": "Phone Number",
    "rentalPrice": "Rental Price:",
    "confirmReservation": "Confirm Reservation",
    "processing": "Processing...",
    "vehicleUnavailable": "Vehicle Unavailable",
    "vehicleUnavailableMessage": "This vehicle is currently unavailable for rental.",
    "reservationSuccess": "Reservation Confirmed",
    "reservationSuccessDescription": "Your reservation for {car} has been confirmed.",
    "reservationError": "Reservation Error",
    "reservationErrorDescription": "An error occurred during reservation. Please try again.",
    "features": "Features",
    "seats": "seats",
    "vehicleNotFound": "Vehicle Not Found",
    "vehicleNotFoundDescription": "The vehicle you're looking for doesn't exist or has been removed.",
    "backToCars": "Back to Vehicles",
    
    // Footer pages
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service",
    "cookiePolicy": "Cookie Policy",
    "privacyPolicyLastUpdated": "Last Updated:",
    "termsLastUpdated": "Last Updated:",
    "cookieLastUpdated": "Last Updated:",
    "date": "{date, date, long}",
    
    // Privacy policy sections
    "privacyIntroTitle": "Introduction",
    "privacyIntroText": "This Privacy Policy explains how we collect, use, and protect your personal information when you use our car rental service.",
    "dataCollectionTitle": "Data Collection",
    "dataCollectionText": "We collect different types of information for various purposes to provide and improve our service.",
    "personalDataTitle": "Personal Data",
    "personalDataText": "While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, including:",
    "personalDataName": "Full name",
    "personalDataEmail": "Email address",
    "personalDataPhone": "Phone number",
    "personalDataAddress": "Postal address",
    "personalDataPayment": "Payment information",
    "usageDataTitle": "Usage Data",
    "usageDataText": "We may also collect information on how the service is accessed and used, such as your computer's Internet Protocol address, browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.",
    "dataUseTitle": "Use of Data",
    "dataUseText": "We use the collected data for various purposes:",
    "dataUseProvideService": "To provide and maintain our service",
    "dataUseImproveService": "To improve our service",
    "dataUseCommunicate": "To communicate with you",
    "dataUseLegal": "To comply with legal obligations",
    "dataSharingTitle": "Data Sharing",
    "dataSharingText": "We do not sell your personal data to third parties. We may share your information with our service providers, business partners, and affiliates who help us provide our services to you.",
    "dataSecurityTitle": "Data Security",
    "dataSecurityText": "The security of your data is important to us. We strive to use commercially acceptable means to protect your personal information, but we cannot guarantee its absolute security.",
    "yourRightsTitle": "Your Rights",
    "yourRightsText": "Under data protection regulations, you have the following rights:",
    "rightsAccess": "Right to access your personal data",
    "rightsRectification": "Right to rectification of inaccurate data",
    "rightsDeletion": "Right to erasure of your data",
    "rightsRestriction": "Right to restriction of processing",
    "rightsPortability": "Right to data portability",
    "rightsObjection": "Right to object to processing",
    "contactTitle": "Contact Us",
    "contactText": "If you have any questions about this Privacy Policy, please contact us by email at contact@carrentalpro.fr or by phone at +33 1 23 45 67 89.",
    
    // Terms of service sections
    "termsIntroTitle": "Introduction",
    "termsIntroText": "These Terms of Service govern your use of our car rental service and constitute a legally binding agreement between you and CarRentalPro.",
    "definitionsTitle": "Definitions",
    "definitionsText": "In these Terms of Service, the following terms shall have the meaning set forth below:",
    "definitionService": "Service",
    "definitionServiceText": "The car rental service provided by CarRentalPro",
    "definitionCompany": "Company",
    "definitionCompanyText": "CarRentalPro, the company operating the service",
    "definitionUser": "User",
    "definitionUserText": "The person accessing or using the service",
    "definitionVehicle": "Vehicle",
    "definitionVehicleText": "The car or other vehicle made available for rental",
    "definitionRental": "Rental",
    "definitionRentalText": "The temporary agreement allowing the user to use a vehicle",
    "accountTitle": "Your Account",
    "accountText": "To use certain features of our service, you must create an account. You are responsible for maintaining the confidentiality of your account and password.",
    "accountResponsibility": "You agree to be responsible for all activities that occur under your account.",
    "rentalProcessTitle": "Rental Process",
    "rentalProcessText": "The rental process is subject to the following conditions:",
    "reservationsTitle": "Reservations",
    "reservationsText": "Reservations are subject to availability. We reserve the right to cancel or modify a reservation in exceptional circumstances.",
    "paymentTitle": "Payment",
    "paymentText": "Payment must be made before vehicle pickup. Additional charges may apply for late returns or damages.",
    "cancellationTitle": "Cancellation",
    "cancellationText": "Our cancellation policy allows for full refunds up to 48 hours before the scheduled rental date. Cancellation fees may apply for late cancellations.",
    "vehicleUseTitle": "Vehicle Use",
    "vehicleUseText": "You agree to use the vehicle in accordance with all applicable laws and regulations and as specified in the rental agreement.",
    "prohibitedUsesTitle": "Prohibited Uses",
    "prohibitedUsesText": "The vehicle must not be used for illegal activities, racing, testing, towing other vehicles (unless expressly permitted), or be driven by an unauthorized person.",
    "liabilityTitle": "Limitation of Liability",
    "liabilityText": "To the extent permitted by law, our liability is limited to the amount paid for the rental. We are not responsible for indirect, special, or consequential damages.",
    "changesTitle": "Changes to Terms",
    "changesText": "We reserve the right to modify these terms at any time. Changes will be posted on our website and will take effect immediately.",
    "contactTermsText": "If you have any questions about these Terms of Service, please contact us by email at contact@carrentalpro.fr or by phone at +33 1 23 45 67 89.",
    
    // Cookie policy sections
    "cookiePolicy": "Cookie Policy",
    "whatAreCookiesTitle": "What Are Cookies",
    "whatAreCookiesText": "Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work or work more efficiently, as well as to provide information to the site owners.",
    "cookieTypesTitle": "Types of Cookies We Use",
    "cookieTypesText": "We use different types of cookies for various reasons:",
    "essentialCookiesTitle": "Essential Cookies",
    "essentialCookiesText": "These cookies are necessary for the website to function properly. They enable you to navigate our site and use its features.",
    "functionCookiesTitle": "Functionality Cookies",
    "functionCookiesText": "These cookies allow us to recognize and remember you, such as your preferred language or region.",
    "analyticsCookiesTitle": "Analytics Cookies",
    "analyticsCookiesText": "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
    "marketingCookiesTitle": "Marketing Cookies",
    "marketingCookiesText": "These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.",
    "cookieControlTitle": "How to Control Cookies",
    "cookieControlText": "You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and you can set most browsers to prevent them from being placed.",
    "browserSettings": "Here's how to manage cookies in popular browsers:",
    "cookiesWeUseTitle": "Specific Cookies We Use",
    "cookiesWeUseText": "Here is a list of specific cookies we use on our site:",
    "cookieName": "Cookie Name",
    "cookiePurpose": "Purpose",
    "cookieExpiration": "Expiration",
    "sessionCookieDescription": "To maintain your active session",
    "preferencesCookieDescription": "To remember your site preferences",
    "gaCookieDescription": "Used by Google Analytics to distinguish users",
    "sessionLength": "Session",
    "year": "year",
    "years": "years",
    "contactCookiesText": "If you have any questions about our Cookie Policy, please contact us by email at contact@carrentalpro.fr or by phone at +33 1 23 45 67 89.",
  },
  ar: {
    // Navigation
    "home": "الرئيسية",
    "cars": "سياراتنا",
    "reservations": "الحجوزات",
    "contact": "اتصل بنا",
    "login": "تسجيل الدخول",
    "signup": "إنشاء حساب",
    "logout": "تسجيل الخروج",
    "admin": "مدير",
    "user": "مستخدم",
    
    // Footer
    "footerDescription": "شريكك الموثوق لتأجير السيارات عالية الجودة. مهمتنا هي تزويدك بأفضل تجربة تأجير ممكنة.",
    "quickLinks": "روابط سريعة",
    "categories": "الفئات",
    "sedan": "سيدان",
    "suv": "دفع رباعي",
    "electric": "كهربائية",
    "luxury": "سيارات فاخرة",
    "economic": "اقتصادية",
    "utility": "نفعية",
    "allRightsReserved": "جميع الحقوق محفوظة.",
    
    // Featured Cars
    "ourPremiumVehicles": "سياراتنا",
    "premium": "الفاخرة",
    "featuredCarsDescription": "اكتشف مجموعتنا من السيارات عالية الجودة لجميع احتياجاتك وميزانياتك. نحن نقدم مجموعة واسعة من السيارات لتلبية جميع متطلباتك.",
    "tous": "الكل",
    "berline": "سيدان",
    "suv": "دفع رباعي",
    "électrique": "كهربائية",
    "sport": "رياضية",
    "viewAllVehicles": "عرض جميع السيارات",
    "addedToFavorites": "تمت الإضافة إلى المفضلة",
    "addedToFavoritesDescription": "تمت إضافة السيارة إلى مفضلاتك",
    "removedFromFavorites": "تمت الإزالة من المفضلة",
    "removedFromFavoritesDescription": "تمت إزالة السيارة من مفضلاتك",
    "availabilityUpdated": "تم تحديث التوفر",
    "vehicleNowUnavailable": "{car} غير متوفرة الآن",
    "vehicleNowAvailable": "{car} متوفرة الآن",
    
    // Language
    "languageChanged": "تم تغيير اللغة",
    "languageChangedTo": "تم تغيير اللغة إلى {language}",
    
    // Auth
    "fullName": "الاسم الكامل",
    "enterFullName": "أدخل اسمك الكامل",
    "email": "البريد الإلكتروني",
    "password": "كلمة المرور",
    "confirmPassword": "تأكيد كلمة المرور",
    "forgotPassword": "نسيت كلمة المرور؟",
    "backToLogin": "العودة إلى تسجيل الدخول",
    "dontHaveAccount": "ليس لديك حساب؟",
    "alreadyHaveAccount": "لديك حساب بالفعل؟",
    "createAccount": "إنشاء حساب",
    "loginAccount": "تسجيل الدخول",
    
    // Simplified for brevity - in a real app, you would include all translations
    "privacyIntroTitle": "مقدمة",
    "privacyIntroText": "توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام خدمة تأجير السيارات الخاصة بنا.",
    "contactTitle": "اتصل بنا",
    "contactText": "إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا عبر البريد الإلكتروني على contact@carrentalpro.fr أو عبر الهاتف على +33 1 23 45 67 89.",
    
    // Basic translations for policy pages
    "privacyPolicy": "سياسة الخصوصية",
    "termsOfService": "شروط الخدمة",
    "cookiePolicy": "سياسة ملفات تعريف الارتباط",
  },
  it: {
    // Navigation
    "home": "Home",
    "cars": "I Nostri Veicoli",
    "reservations": "Prenotazioni",
    "contact": "Contatti",
    "login": "Accedi",
    "signup": "Registrati",
    "logout": "Esci",
    "admin": "Amministratore",
    "user": "Utente",
    
    // Footer
    "footerDescription": "Il tuo partner di fiducia per il noleggio di veicoli di qualità premium. La nostra missione è offrirti la migliore esperienza di noleggio possibile.",
    "quickLinks": "Link Rapidi",
    "categories": "Categorie",
    "sedan": "Berline",
    "suv": "SUV",
    "electric": "Elettriche",
    "luxury": "Auto di Lusso",
    "economic": "Economiche",
    "utility": "Utilitarie",
    "allRightsReserved": "Tutti i diritti riservati.",
    
    // Featured Cars
    "ourPremiumVehicles": "I Nostri Veicoli",
    "premium": "Premium",
    "featuredCarsDescription": "Scopri la nostra selezione di veicoli di alta qualità per tutte le tue esigenze e budget. Offriamo una vasta gamma di auto per soddisfare tutti i tuoi requisiti.",
    "tous": "Tutte",
    "berline": "Berlina",
    "suv": "SUV",
    "électrique": "Elettrica",
    "sport": "Sport",
    "viewAllVehicles": "Visualizza Tutti i Veicoli",
    "addedToFavorites": "Aggiunto ai preferiti",
    "addedToFavoritesDescription": "Il veicolo è stato aggiunto ai tuoi preferiti",
    "removedFromFavorites": "Rimosso dai preferiti",
    "removedFromFavoritesDescription": "Il veicolo è stato rimosso dai tuoi preferiti",
    "availabilityUpdated": "Disponibilità aggiornata",
    "vehicleNowUnavailable": "{car} non è più disponibile",
    "vehicleNowAvailable": "{car} è ora disponibile",
    
    // Language
    "languageChanged": "Lingua Modificata",
    "languageChangedTo": "La lingua è stata cambiata in {language}",
    
    // Auth
    "fullName": "Nome completo",
    "enterFullName": "Inserisci il tuo nome completo",
    "email": "Email",
    "password": "Password",
    "confirmPassword": "Conferma Password",
    "forgotPassword": "Password dimenticata?",
    "backToLogin": "Torna al login",
    "dontHaveAccount": "Non hai un account?",
    "alreadyHaveAccount": "Hai già un account?",
    "createAccount": "Crea Account",
    "loginAccount": "Accedi",
    
    // Simplified for brevity - in a real app, you would include all translations
    "privacyIntroTitle": "Introduzione",
    "privacyIntroText": "Questa Informativa sulla Privacy spiega come raccogliamo, utilizziamo e proteggiamo le tue informazioni personali quando utilizzi il nostro servizio di noleggio auto.",
    "contactTitle": "Contattaci",
    "contactText": "Se hai domande su questa Informativa sulla Privacy, contattaci via email all'indirizzo contact@carrentalpro.fr o telefonicamente al numero +33 1 23 45 67 89.",
    
    // Basic translations for policy pages
    "privacyPolicy": "Informativa sulla Privacy",
    "termsOfService": "Termini di Servizio",
    "cookiePolicy": "Politica dei Cookie",
  }
};

// Create context
const TranslationContext = createContext<TranslationContextType>({
  language: availableLanguages[0],
  setLanguage: () => {},
  t: () => "",
  availableLanguages
});

// Provider component
export const TranslationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage
    const savedLanguage = localStorage.getItem('preferred_language');
    if (savedLanguage) {
      const parsed = JSON.parse(savedLanguage);
      const found = availableLanguages.find(lang => lang.code === parsed.code);
      return found || availableLanguages[0];
    }
    return availableLanguages[0];
  });

  // Function to set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred_language', JSON.stringify(lang));
    
    // Set HTML dir attribute for RTL languages
    if (lang.code === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.classList.remove('rtl');
    }
  };

  // Set direction on initial load
  useEffect(() => {
    if (language.code === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.classList.remove('rtl');
    }
  }, []);

  // Translation function
  const t = (key: string, params?: Record<string, any>): string => {
    const translation = translations[language.code]?.[key] || translations.en?.[key] || key;
    
    if (params && Object.keys(params).length > 0) {
      return Object.keys(params).reduce((acc, paramKey) => {
        return acc.replace(`{${paramKey}}`, params[paramKey]);
      }, translation);
    }
    
    return translation;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook to use the translation context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
