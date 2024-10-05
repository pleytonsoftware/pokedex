export const SUPPORTED_LANGUAGES_LOCALES = {
  en: 'en',
  es: 'es',
} as const

export type SupportedLanguagesType = keyof typeof SUPPORTED_LANGUAGES_LOCALES

export const SUPPORTED_LANGUAGES: Record<SupportedLanguagesType, string> = {
  en: 'English',
  es: 'Español (España)',
}

export const SUPPORTED_LANGUAGES_ENTRIES = Object.entries(SUPPORTED_LANGUAGES) as [SupportedLanguagesType, string][]
export const SUPPORTED_LANGUAGES_KEYS = Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguagesType[]
