import type { SupportedLanguagesType } from "./supported-languages";

import { initReactI18next } from "react-i18next";

import i18n, { type InitOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

import { LOCALE_NAMESPACES } from "@constants/translations";

import { SUPPORTED_LANGUAGES_KEYS } from "./supported-languages";

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        ns: [LOCALE_NAMESPACES.common],
        load: "currentOnly",
        fallbackLng: {} satisfies Partial<
            Record<SupportedLanguagesType | "default", SupportedLanguagesType[]>
        >,
        debug: import.meta.env.MODE === "development",
        supportedLngs: SUPPORTED_LANGUAGES_KEYS,
    } satisfies InitOptions);

export default i18n;
