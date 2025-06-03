
export const translations = {
  fi: {
    // Header
    headerTitle: "SRO Tech",
    headerSubtitle: "Raamattuopisto",
    
    // Settings
    settings: "Asetukset",
    settingsDescription: "Sovelluksen asetukset",
    darkMode: "Tumma tila",
    darkModeDescription: "Vaihda sovelluksen ulkoasua",
    language: "Kieli",
    languageDescription: "Valitse sovelluksen kieli",
    
    // Profile
    profile: "Profiili",
    profileDescription: "Henkilökohtaiset tiedot",
    name: "Nimi",
    namePlaceholder: "Syötä nimesi",
    
    // Event Card
    volunteers: "Vapaaehtoiset",
    backup: "Varahenkilö",
    notes: "Lisätiedot",
    optInButton: "Ilmoittaudu vapaaehtoiseksi",
    optingIn: "Ilmoittaudutaan...",
    alreadyOptedIn: "Olet jo ilmoittautunut tähän tapahtumaan",
    setNameFirst: "Aseta ensin nimesi asetuksista ennen ilmoittautumista!",
    
    // Schedule
    schedule: "Aikataulu",
    scheduleDescription: "Tulevat tapahtumat ja vapaaehtoistyöt",
    loadingEvents: "Ladataan tapahtumia...",
    noEvents: "Ei tulevia tapahtumia",
    refreshEvents: "Päivitä tapahtumat",
    
    // Languages
    languages: {
      fi: "Suomi",
      en: "English",
      sv: "Svenska",
      ar: "العربية"
    }
  },
  en: {
    // Header
    headerTitle: "SRO Tech",
    headerSubtitle: "Bible Institute",
    
    // Settings
    settings: "Settings",
    settingsDescription: "Application settings",
    darkMode: "Dark mode",
    darkModeDescription: "Switch application appearance",
    language: "Language",
    languageDescription: "Choose application language",
    
    // Profile
    profile: "Profile",
    profileDescription: "Personal information",
    name: "Name",
    namePlaceholder: "Enter your name",
    
    // Event Card
    volunteers: "Volunteers",
    backup: "Backup person",
    notes: "Additional info",
    optInButton: "Sign up as volunteer",
    optingIn: "Signing up...",
    alreadyOptedIn: "You are already signed up for this event",
    setNameFirst: "Please set your name in settings before signing up!",
    
    // Schedule
    schedule: "Schedule",
    scheduleDescription: "Upcoming events and volunteer work",
    loadingEvents: "Loading events...",
    noEvents: "No upcoming events",
    refreshEvents: "Refresh events",
    
    // Languages
    languages: {
      fi: "Finnish",
      en: "English",
      sv: "Swedish",
      ar: "Arabic"
    }
  },
  sv: {
    // Header
    headerTitle: "SRO Tech",
    headerSubtitle: "Bibelskola",
    
    // Settings
    settings: "Inställningar",
    settingsDescription: "Applikationsinställningar",
    darkMode: "Mörkt läge",
    darkModeDescription: "Växla applikationsutseende",
    language: "Språk",
    languageDescription: "Välj applikationsspråk",
    
    // Profile
    profile: "Profil",
    profileDescription: "Personlig information",
    name: "Namn",
    namePlaceholder: "Ange ditt namn",
    
    // Event Card
    volunteers: "Volontärer",
    backup: "Reservperson",
    notes: "Ytterligare info",
    optInButton: "Anmäl dig som volontär",
    optingIn: "Anmäler...",
    alreadyOptedIn: "Du är redan anmäld till detta evenemang",
    setNameFirst: "Vänligen ange ditt namn i inställningarna innan anmälan!",
    
    // Schedule
    schedule: "Schema",
    scheduleDescription: "Kommande evenemang och volontärarbete",
    loadingEvents: "Laddar evenemang...",
    noEvents: "Inga kommande evenemang",
    refreshEvents: "Uppdatera evenemang",
    
    // Languages
    languages: {
      fi: "Finska",
      en: "Engelska",
      sv: "Svenska",
      ar: "Arabiska"
    }
  },
  ar: {
    // Header
    headerTitle: "SRO Tech",
    headerSubtitle: "معهد الكتاب المقدس",
    
    // Settings
    settings: "الإعدادات",
    settingsDescription: "إعدادات التطبيق",
    darkMode: "الوضع المظلم",
    darkModeDescription: "تغيير مظهر التطبيق",
    language: "اللغة",
    languageDescription: "اختر لغة التطبيق",
    
    // Profile
    profile: "الملف الشخصي",
    profileDescription: "المعلومات الشخصية",
    name: "الاسم",
    namePlaceholder: "أدخل اسمك",
    
    // Event Card
    volunteers: "المتطوعون",
    backup: "الشخص الاحتياطي",
    notes: "معلومات إضافية",
    optInButton: "سجل كمتطوع",
    optingIn: "جاري التسجيل...",
    alreadyOptedIn: "أنت مسجل بالفعل في هذا الحدث",
    setNameFirst: "يرجى تعيين اسمك في الإعدادات قبل التسجيل!",
    
    // Schedule
    schedule: "الجدول الزمني",
    scheduleDescription: "الأحداث القادمة والعمل التطوعي",
    loadingEvents: "تحميل الأحداث...",
    noEvents: "لا توجد أحداث قادمة",
    refreshEvents: "تحديث الأحداث",
    
    // Languages
    languages: {
      fi: "الفنلندية",
      en: "الإنجليزية",
      sv: "السويدية",
      ar: "العربية"
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.fi;

export const getTranslation = (language: Language, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to Finnish if translation not found
      value = translations.fi;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key if no translation found
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
};
