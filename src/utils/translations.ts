
export const translations = {
  fi: {
    // Header
    headerTitle: "SRO Tech",
    headerSubtitle: "paikkamerkki",
    
    // Settings
    settings: "Asetukset",
    settingsDescription: "Sovelluksen asetukset",
    darkMode: "Tumma tila",
    darkModeDescription: "Vaihda sovelluksen ulkoasua",
    language: "Kieli",
    languageDescription: "Valitse sovelluksen kieli",
    customOptInUrl: "Mukautettu ilmoittautumislinkki",
    customOptInUrlDescription: "Käytä mukautettua päätepistettä ilmoittautumispyynnöille",
    customUrl: "Mukautettu URL",
    customUrlPlaceholder: "https://oma-palvelin.com/api/ilmoittaudu",
    customUrlHelp: "Tämä URL vastaanottaa POST-pyyntöjä JSON-datalla, joka sisältää rivin ja arvon",
    
    // Navigation
    schedule: "Aikataulu",
    volunteers: "Tiimi",
    
    // Profile
    profile: "Profiili",
    profileDescription: "Henkilökohtaiset tiedot",
    name: "Nimi",
    namePlaceholder: "Syötä nimesi",
    
    // Event Card
    backup: "Varahenkilö",
    notes: "Lisätiedot",
    optInButton: "Ilmoittaudu vapaaehtoiseksi",
    optingIn: "Ilmoittaudutaan...",
    alreadyOptedIn: "Olet jo ilmoittautunut tähän tapahtumaan",
    setNameFirst: "Aseta ensin nimesi asetuksista ennen ilmoittautumista!",
    optInSuccess: "Ilmoittautuminen onnistui!",
    optInSuccessDesc: "Olet nyt ilmoittautunut tapahtumaan",
    optInError: "Ilmoittautuminen epäonnistui",
    optInErrorDesc: "Tapahtui virhe ilmoittautumisessa. Yritä myöhemmin uudelleen.",
    
    // Schedule
    scheduleDescription: "Tulevat tapahtumat ja vapaaehtoistyöt",
    loadingEvents: "Ladataan tapahtumia...",
    noEvents: "Ei tulevia tapahtumia",
    refreshEvents: "Päivitä tapahtumat",
    upcomingSchedule: "Tuleva aikataulu",
    pastEvents: "Menneet tapahtumat",
    upcomingTasks: "Tulevat tehtävät ja vastuuhenkilöt",
    pastTasks: "Menneet tehtävät ja vastuuhenkilöt",
    showMore: "Näytä kaikki",
    showLess: "Näytä vähemmän",
    moreEvents: "lisää",
    loadingFromSheets: "Ladataan aikataulua Google Sheetsistä...",
    errorLoadingSheets: "Virhe ladattaessa aikataulua Google Sheetsistä",
    tryAgain: "Yritä uudelleen",
    noPastEvents: "Ei menneitä tapahtumia",
    noUpcomingEvents: "Ei tulevia tapahtumia",
    
    // Notifications
    notifications: "Ilmoitukset",
    noNotifications: "Ei ilmoituksia",
    welcomeNotificationTitle: "Tervetuloa SRO Tech -sovellukseen!",
    welcomeNotificationMessage: "Hei {name}! Olet nyt valmis hallitsemaan vapaaehtoistöitäsi.",
    eventReminderTitle: "Tapahtuma tarvitsee vapaaehtoisia",
    eventReminderMessage: "Tapahtuma '{event}' ({date}) tarvitsee vapaaehtoisia. Oletko vapaa?",
    participationReminderTitle: "Muistutus tapahtumasta",
    participationReminderMessage: "Muistutus: Olet ilmoittautunut tapahtumaan '{event}' huomenna ({date})",
    
    // Event Schedule
    eventSchedule: "Tapahtumaohjelma",
    selectEvent: "Valitse tapahtuma",
    selectDate: "Valitse päivämäärä",
    selectArena: "Valitse areena",
    showAllEvents: "Näytä kaikki tapahtumat",
    showNextOnly: "Näytä vain seuraava",
    noEventsForDate: "Ei tapahtumia tälle päivälle",
    friday: "Perjantai",
    saturday: "Lauantai",
    sunday: "Sunnuntai",
    refresh: "Päivitä",
    notificationsToggle: "Ilmoitukset",
    enableNotifications: "Ota ilmoitukset käyttöön",
    
    // Languages
    languages: {
      fi: "Suomi",
      en: "English",
      sv: "Svenska",
      ar: "العربية",
      cat: "🐱 Cat"
    }
  },
  en: {
    // Header
    headerTitle: "SRO Tech",
    headerSubtitle: "Placeholer Institute",
    
    // Settings
    settings: "Settings",
    settingsDescription: "Application settings",
    darkMode: "Dark mode",
    darkModeDescription: "Switch application appearance",
    language: "Language",
    languageDescription: "Choose application language",
    customOptInUrl: "Custom Opt-In URL",
    customOptInUrlDescription: "Use a custom endpoint for opt-in requests",
    customUrl: "Custom URL",
    customUrlPlaceholder: "https://your-custom-endpoint.com/api/opt-in",
    customUrlHelp: "This URL will receive POST requests with JSON payload containing row and value",
    
    // Navigation
    schedule: "Schedule",
    volunteers: "Team",
    
    // Profile
    profile: "Profile",
    profileDescription: "Personal information",
    name: "Name",
    namePlaceholder: "Enter your name",
    
    // Event Card
    backup: "Backup person",
    notes: "Additional info",
    optInButton: "Sign up as volunteer",
    optingIn: "Signing up...",
    alreadyOptedIn: "You are already signed up for this event",
    setNameFirst: "Please set your name in settings before signing up!",
    optInSuccess: "Sign-up successful!",
    optInSuccessDesc: "You are now signed up for the event",
    optInError: "Sign-up failed",
    optInErrorDesc: "An error occurred during sign-up. Please try again later.",
    
    // Schedule
    scheduleDescription: "Upcoming events and volunteer work",
    loadingEvents: "Loading events...",
    noEvents: "No upcoming events",
    refreshEvents: "Refresh events",
    upcomingSchedule: "Upcoming Schedule",
    pastEvents: "Past Events",
    upcomingTasks: "Upcoming tasks and responsibilities",
    pastTasks: "Past tasks and responsibilities",
    showMore: "Show all",
    showLess: "Show less",
    moreEvents: "more",
    loadingFromSheets: "Loading schedule from Google Sheets...",
    errorLoadingSheets: "Error loading schedule from Google Sheets",
    tryAgain: "Try again",
    noPastEvents: "No past events",
    noUpcomingEvents: "No upcoming events",
    
    // Notifications
    notifications: "Notifications",
    noNotifications: "No notifications",
    welcomeNotificationTitle: "Welcome to SRO Tech!",
    welcomeNotificationMessage: "Hi {name}! You're now ready to manage your volunteer work.",
    eventReminderTitle: "Event needs volunteers",
    eventReminderMessage: "Event '{event}' ({date}) needs volunteers. Are you available?",
    participationReminderTitle: "Event reminder",
    participationReminderMessage: "Reminder: You're signed up for '{event}' tomorrow ({date})",
    
    // Event Schedule
    eventSchedule: "Event Schedule",
    selectEvent: "Select Event",
    selectDate: "Select Date",
    selectArena: "Select Arena",
    showAllEvents: "Show All Events",
    showNextOnly: "Show Next Only",
    noEventsForDate: "No events for this date",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    refresh: "Refresh",
    notificationsToggle: "Notifications",
    enableNotifications: "Enable notifications",
    
    // Languages
    languages: {
      fi: "Finnish",
      en: "English",
      sv: "Swedish",
      ar: "Arabic",
      cat: "🐱 Cat"
    }
  },
  sv: {
    // Header
    headerTitle: "SRO Tech",
    headerSubtitle: "platshållare",
    
    // Settings
    settings: "Inställningar",
    settingsDescription: "Applikationsinställningar",
    darkMode: "Mörkt läge",
    darkModeDescription: "Växla applikationsutseende",
    language: "Språk",
    languageDescription: "Välj applikationsspråk",
    customOptInUrl: "Anpassad anmälningslänk",
    customOptInUrlDescription: "Använd en anpassad slutpunkt för anmälningsförfrågningar",
    customUrl: "Anpassad URL",
    customUrlPlaceholder: "https://din-anpassade-slutpunkt.com/api/anmalan",
    customUrlHelp: "Denna URL kommer att ta emot POST-förfrågningar med JSON-data som innehåller rad och värde",
    
    // Navigation
    schedule: "Schema",
    volunteers: "Team",
    
    // Profile
    profile: "Profil",
    profileDescription: "Personlig information",
    name: "Namn",
    namePlaceholder: "Ange ditt namn",
    
    // Event Card
    backup: "Reservperson",
    notes: "Ytterligare info",
    optInButton: "Anmäl dig som volontär",
    optingIn: "Anmäler...",
    alreadyOptedIn: "Du är redan anmäld till detta evenemang",
    setNameFirst: "Vänligen ange ditt namn i inställningarna innan anmälan!",
    optInSuccess: "Anmälan lyckades!",
    optInSuccessDesc: "Du är nu anmäld till evenemanget",
    optInError: "Anmälan misslyckades",
    optInErrorDesc: "Ett fel uppstod vid anmälan. Försök igen senare.",
    
    // Schedule
    scheduleDescription: "Kommande evenemang och volontärarbete",
    loadingEvents: "Laddar evenemang...",
    noEvents: "Inga kommande evenemang",
    refreshEvents: "Uppdatera evenemang",
    upcomingSchedule: "Kommande Schema",
    pastEvents: "Tidigare Evenemang",
    upcomingTasks: "Kommande uppgifter och ansvar",
    pastTasks: "Tidigare uppgifter och ansvar",
    showMore: "Visa alla",
    showLess: "Visa mindre",
    moreEvents: "fler",
    loadingFromSheets: "Laddar schema från Google Sheets...",
    errorLoadingSheets: "Fel vid laddning av schema från Google Sheets",
    tryAgain: "Försök igen",
    noPastEvents: "Inga tidigare evenemang",
    noUpcomingEvents: "Inga kommande evenemang",
    
    // Notifications
    notifications: "Notifikationer",
    noNotifications: "Inga notifikationer",
    welcomeNotificationTitle: "Välkommen till SRO Tech!",
    welcomeNotificationMessage: "Hej {name}! Du är nu redo att hantera ditt volontärarbete.",
    eventReminderTitle: "Evenemang behöver volontärer",
    eventReminderMessage: "Evenemang '{event}' ({date}) behöver volontärer. Är du tillgänglig?",
    participationReminderTitle: "Evenemangs påminnelse",
    participationReminderMessage: "Påminnelse: Du är anmäld till '{event}' imorgon ({date})",
    
    // Event Schedule
    eventSchedule: "Eventschema",
    selectEvent: "Välj event",
    selectDate: "Välj datum",
    selectArena: "Välj arena",
    showAllEvents: "Visa alla events",
    showNextOnly: "Visa endast nästa",
    noEventsForDate: "Inga events för detta datum",
    friday: "Fredag",
    saturday: "Lördag",
    sunday: "Söndag",
    refresh: "Uppdatera",
    notificationsToggle: "Notifikationer",
    enableNotifications: "Aktivera notifikationer",
    
    // Languages
    languages: {
      fi: "Finska",
      en: "Engelska",
      sv: "Svenska",
      ar: "Arabiska",
      cat: "🐱 Cat"
    }
  },
  ar: {
    // Header
    headerTitle: "SRO Tech",
    headerSubtitle: "العنصر النائب",
    
    // Settings
    settings: "الإعدادات",
    settingsDescription: "إعدادات التطبيق",
    darkMode: "الوضع المظلم",
    darkModeDescription: "تغيير مظهر التطبيق",
    language: "اللغة",
    languageDescription: "اختر لغة التطبيق",
    customOptInUrl: "رابط التسجيل المخصص",
    customOptInUrlDescription: "استخدم نقطة نهاية مخصصة لطلبات التسجيل",
    customUrl: "الرابط المخصص",
    customUrlPlaceholder: "https://نقطة-النهاية-المخصصة.com/api/التسجيل",
    customUrlHelp: "سيتلقى هذا الرابط طلبات POST مع بيانات JSON تحتوي على الصف والقيمة",
    
    // Navigation
    schedule: "الجدول الزمني",
    volunteers: "الفريق",
    
    // Profile
    profile: "الملف الشخصي",
    profileDescription: "المعلومات الشخصية",
    name: "الاسم",
    namePlaceholder: "أدخل اسمك",
    
    // Event Card
    backup: "الشخص الاحتياطي",
    notes: "معلومات إضافية",
    optInButton: "سجل كمتطوع",
    optingIn: "جاري التسجيل...",
    alreadyOptedIn: "أنت مسجل بالفعل في هذا الحدث",
    setNameFirst: "يرجى تعيين اسمك في الإعدادات قبل التسجيل!",
    optInSuccess: "نجح التسجيل!",
    optInSuccessDesc: "أنت الآن مسجل في الحدث",
    optInError: "فشل التسجيل",
    optInErrorDesc: "حدث خطأ أثناء التسجيل. حاول مرة أخرى لاحقاً.",
    
    // Schedule
    scheduleDescription: "الأحداث القادمة والعمل التطوعي",
    loadingEvents: "تحميل الأحداث...",
    noEvents: "لا توجد أحداث قادمة",
    refreshEvents: "تحديث الأحداث",
    upcomingSchedule: "الجدول الزمني القادم",
    pastEvents: "الأحداث السابقة",
    upcomingTasks: "المهام والمسؤوليات القادمة",
    pastTasks: "المهام والمسؤوليات السابقة",
    showMore: "عرض الكل",
    showLess: "عرض أقل",
    moreEvents: "المزيد",
    loadingFromSheets: "تحميل الجدول من Google Sheets...",
    errorLoadingSheets: "خطأ في تحميل الجدول من Google Sheets",
    tryAgain: "حاول مرة أخرى",
    noPastEvents: "لا توجد أحداث سابقة",
    noUpcomingEvents: "لا توجد أحداث قادمة",
    
    // Notifications
    notifications: "الإشعارات",
    noNotifications: "لا توجد إشعارات",
    welcomeNotificationTitle: "مرحباً بك في SRO Tech!",
    welcomeNotificationMessage: "مرحباً {name}! أنت الآن جاهز لإدارة عملك التطوعي.",
    eventReminderTitle: "الحدث يحتاج متطوعين",
    eventReminderMessage: "الحدث '{event}' ({date}) يحتاج متطوعين. هل أنت متاح؟",
    participationReminderTitle: "تذكير بالحدث",
    participationReminderMessage: "تذكير: أنت مسجل في '{event}' غداً ({date})",
    
    // Event Schedule
    eventSchedule: "جدول الأحداث",
    selectEvent: "اختر الحدث",
    selectDate: "اختر التاريخ",
    selectArena: "اختر الساحة",
    showAllEvents: "إظهار جميع الأحداث",
    showNextOnly: "إظهار التالي فقط",
    noEventsForDate: "لا توجد أحداث لهذا التاريخ",
    friday: "الجمعة",
    saturday: "السبت",
    sunday: "الأحد",
    refresh: "تحديث",
    notificationsToggle: "الإشعارات",
    enableNotifications: "تمكين الإشعارات",
    
    // Languages
    languages: {
      fi: "الفنلندية",
      en: "الإنجليزية",
      sv: "السويدية",
      ar: "العربية",
      cat: "🐱 Cat"
    }
  },
  cat: {
    // Header
    headerTitle: "Meow Rescue Org",
    headerSubtitle: "Purr-fessional Cat Management",
    
    // Settings
    settings: "Cattings",
    settingsDescription: "App-purr-ance settings",
    darkMode: "Night Vision Mode",
    darkModeDescription: "Switch to stealth hunting mode",
    language: "Meownguage",
    languageDescription: "Choose your purr-ferred dialect",
    customOptInUrl: "Custom Scratching Post URL",
    customOptInUrlDescription: "Use your own territory for volunteer calls",
    customUrl: "Custom Litterbox URL",
    customUrlPlaceholder: "https://my-favorite-windowsill.com/api/nap",
    customUrlHelp: "This URL will receive POST requests with tasty treats containing row and tuna",
    
    // Navigation
    schedule: "Nap Schedule",
    volunteers: "Cat Pack",
    
    // Profile
    profile: "Cat Profile",
    profileDescription: "Your feline credentials",
    name: "Cat Name",
    namePlaceholder: "Enter your purr-fect name",
    
    // Event Card
    backup: "Backup cat",
    notes: "Purr-ticular notes",
    optInButton: "I'm feline this!",
    optingIn: "Pouncing on opportunity...",
    alreadyOptedIn: "You're already paw-tied to this mission",
    setNameFirst: "Set your cat name first before joining the pride!",
    optInSuccess: "Purr-fect success!",
    optInSuccessDesc: "You're now part of this cat-venture",
    optInError: "Cat-astrophic failure",
    optInErrorDesc: "Something went fur-ribly wrong. Try again after a nap.",
    
    // Schedule
    scheduleDescription: "Upcoming adventures and mouse-catching duties",
    loadingEvents: "Hunting for events...",
    noEvents: "No mice to catch today",
    refreshEvents: "Check for new prey",
    upcomingSchedule: "Upcoming Cat-ventures",
    pastEvents: "Conquered Territories",
    upcomingTasks: "Future hunting expeditions",
    pastTasks: "Legendary cat tales",
    showMore: "Show all nine lives",
    showLess: "Hide like a ninja cat",
    moreEvents: "more treats",
    loadingFromSheets: "Downloading from the cloud... like a cat on a tree...",
    errorLoadingSheets: "Failed to catch the data mouse",
    tryAgain: "Pounce again",
    noPastEvents: "No previous adventures",
    noUpcomingEvents: "No future expeditions",
    
    // Notifications
    notifications: "Purr-notifications",
    noNotifications: "No messages from the pack",
    welcomeNotificationTitle: "Welcome to the Cat Pack!",
    welcomeNotificationMessage: "Meow {name}! You're now ready for epic cat-ventures.",
    eventReminderTitle: "Mission needs more cats",
    eventReminderMessage: "Mission '{event}' ({date}) needs more paws. Are you feline up to it?",
    participationReminderTitle: "Cat-venture reminder",
    participationReminderMessage: "Reminder: You're signed up for '{event}' tomorrow ({date}). Don't fur-get!",
    
    // Event Schedule
    eventSchedule: "Purr-event Schedule",
    selectEvent: "Select Meow-vent",
    selectDate: "Select Cat-endar Date",
    selectArena: "Select Play-arena",
    showAllEvents: "Show All Purr-vents",
    showNextOnly: "Show Next Meow Only",
    noEventsForDate: "No purr-vents for this cat-endar date",
    friday: "Fur-iday",
    saturday: "Cat-urday",
    sunday: "Sun-nap-day",
    refresh: "Pounce again",
    notificationsToggle: "Purr-notifications",
    enableNotifications: "Enable purr-notifications",
    
    // Languages
    languages: {
      fi: "Finnish Cat",
      en: "English Cat",
      sv: "Swedish Cat", 
      ar: "Arabic Cat",
      cat: "🐱 Pure Cat"
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
