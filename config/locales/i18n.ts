import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";

i18n
  .use(backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS: "translation",
    fallbackLng: "fa-IR",
    debug: false,
    lng: "fa-IR",
    interpolation: {
      escapeValue: false,
    },
    load: "languageOnly",
    saveMissing: true,
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

export default i18n;
