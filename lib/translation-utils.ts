import {
  translations,
  type Language,
  type TranslationKey,
} from './translations';

/**
 * Translation utility functions for content management
 */

// Helper function to get all available translation keys
export const getAllTranslationKeys = (): TranslationKey[] => {
  return Object.keys(translations.en) as TranslationKey[];
};

// Helper function to check if a key exists
export const hasTranslation = (key: string): key is TranslationKey => {
  return key in translations.en;
};

// Helper function to get missing translations between languages
export const getMissingTranslations = (lang: Language): TranslationKey[] => {
  const englishKeys = Object.keys(translations.en) as TranslationKey[];
  const langKeys = Object.keys(translations[lang]);

  return englishKeys.filter((key) => !langKeys.includes(key));
};

// Helper function to validate all translations are complete
export const validateTranslations = (): {
  [key in Language]: TranslationKey[];
} => {
  const result = {} as { [key in Language]: TranslationKey[] };

  Object.keys(translations).forEach((lang) => {
    result[lang as Language] = getMissingTranslations(lang as Language);
  });

  return result;
};

// Helper function to add new content with automatic translation structure
export const createTranslationTemplate = (key: string, englishText: string) => {
  return {
    en: { [key]: englishText },
    es: { [key]: `[TRANSLATE: ${englishText}]` },
  };
};

// Helper function to get translation with fallback
export const getTranslationWithFallback = (
  key: TranslationKey,
  language: Language,
  fallbackLanguage: Language = 'en'
): string => {
  const translation = translations[language][key];
  if (translation && !translation.startsWith('[TRANSLATE:')) {
    return translation;
  }

  return translations[fallbackLanguage][key];
};

// Helper function to extract all text content for translation services
export const extractAllTextForTranslation = (): { [key: string]: string } => {
  return translations.en;
};

// Helper function to update translations programmatically
export const updateTranslation = (
  key: TranslationKey,
  language: Language,
  text: string
): void => {
  if (translations[language]) {
    translations[language][key] = text;
  }
};
