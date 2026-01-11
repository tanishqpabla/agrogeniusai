import { useAuth, Language } from '@/contexts/AuthContext';
import { getTranslation, speechLanguageCodes } from '@/lib/translations';

export const useTranslation = () => {
  const { user } = useAuth();
  const lang: Language = user?.language || 'en';
  const t = getTranslation(lang);
  const speechLang = speechLanguageCodes[lang];
  
  return { t, lang, speechLang };
};
