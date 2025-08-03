
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
    currentEvent: "Meneillään",
    nextEvent: "Seuraava",
    upcomingEvents: "Tulevat tapahtumat",
    
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
    currentEvent: "Current",
    nextEvent: "Next",
    upcomingEvents: "Upcoming Events",
    
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
    currentEvent: "Pågående",
    nextEvent: "Nästa",
    upcomingEvents: "Kommande events",
    
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
    currentEvent: "الحالي",
    nextEvent: "التالي",
    upcomingEvents: "الأحداث القادمة",
    
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
    headerSubtitle: "oh hai! iz for srs bzniz",
    
    // Settings
    settings: "Cattingz",
    settingsDescription: "App-purr-ance stuffz",
    darkMode: "Nite Vision Modez",
    darkModeDescription: "can haz stealthy huntingz?",
    language: "Meownguagez",
    languageDescription: "pick ur fav speekingz",
    customOptInUrl: "Custom Scratchin Post URL",
    customOptInUrlDescription: "ur own territoryz for volunterz callz",
    customUrl: "Custom Litterbox URL",
    customUrlPlaceholder: "https://mai-fav-windowsill.com/api/napz",
    customUrlHelp: "dis url wil get POST reqestez wit tasteh treetz",
    
    // Navigation
    schedule: "Nap Schedulez",
    volunteers: "Cat Packz",
    
    // Profile
    profile: "Cat Profilez",
    profileDescription: "ur feline credentialz",
    name: "Cat Namez",
    namePlaceholder: "entr ur purr-fect namez",
    
    // Event Card
    backup: "Backup kitteh",
    notes: "Purr-ticular notez",
    optInButton: "I can haz dis mision?",
    optingIn: "pouncin on opportuniteh...",
    alreadyOptedIn: "u alredeh paw-tied 2 dis mision",
    setNameFirst: "set ur cat namez first b4 joinin da pridez!",
    optInSuccess: "purr-fect succesz!",
    optInSuccessDesc: "u iz nao part of dis cat-ventur",
    optInError: "cat-astrophic failur",
    optInErrorDesc: "sumthin went fur-ribly wrong. try agin aftr a napz.",
    
    // Schedule
    scheduleDescription: "upcmoin cat-venturz an mous-catchin dutiez",
    loadingEvents: "huntin 4 eventz...",
    noEvents: "no micez 2 catch 2day",
    refreshEvents: "chek 4 new preyz",
    upcomingSchedule: "upcmoin cat-venturz",
    pastEvents: "conquerd territoryz",
    upcomingTasks: "futur huntin expedishunz",
    pastTasks: "legendareh cat talez",
    showMore: "sho al nien livez",
    showLess: "hied liek ninja cat",
    moreEvents: "moar treetz",
    loadingFromSheets: "downloadin frm da cloudz... liek cat on tre...",
    errorLoadingSheets: "faild 2 catch da data mous",
    tryAgain: "pounce agin",
    noPastEvents: "no previus cat-venturz",
    noUpcomingEvents: "no futur expedishunz",
    
    // Notifications
    notifications: "purr-notifikashunz",
    noNotifications: "no mesagez frm da pack",
    welcomeNotificationTitle: "welcm 2 da cat pack!",
    welcomeNotificationMessage: "oh hai {name}! u iz nao redeh 4 epic cat-venturz.",
    eventReminderTitle: "mision nedz moar catz",
    eventReminderMessage: "mision '{event}' ({date}) nedz moar pawz. u felin up 2 it?",
    participationReminderTitle: "cat-ventur remindr",
    participationReminderMessage: "remindr: u iz signd up 4 '{event}' 2moro ({date}). dnt fur-get!",
    
    // Event Schedule
    eventSchedule: "purr-event schedulez",
    selectEvent: "select meow-vent",
    selectDate: "select cat-endar daet",
    selectArena: "select plai-arenaz",
    showAllEvents: "sho al purr-ventz",
    showNextOnly: "sho nex meow onleh",
    noEventsForDate: "no purr-ventz 4 dis daet",
    friday: "fridai",
    saturday: "caturdai",
    sunday: "sundai",
    refresh: "refres",
    notificationsToggle: "purr-notifikashunz",
    enableNotifications: "enabul purr-notifikashunz",
    currentEvent: "purr-rent",
    nextEvent: "nex meow",
    upcomingEvents: "futur purr-ventz",
    
    // Languages
    languages: {
      fi: "Finishez",
      en: "Englishez",
      sv: "Swedishez",
      ar: "Arabicz",
      cat: "🐱 Lolcat"
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
