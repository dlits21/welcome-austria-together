export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

export const languages: Language[] = [
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ce', name: 'Chechen', nativeName: 'Нохчийн', flag: '🇷🇺' },
  { code: 'prs', name: 'Dari', nativeName: 'دری', flag: '🇦🇫', rtl: true },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', flag: '🇦🇫', rtl: true },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', rtl: true },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'ku', name: 'Kurdish', nativeName: 'کوردی', flag: '🇮🇶', rtl: true },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', flag: '🇸🇴' },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', flag: '🇬🇪' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱' },
];

export const getConfirmationText = (code: string): string => {
  switch (code) {
    case 'de':
      return "Bitte bestätigen Sie, dass Deutsch Ihre Muttersprache ist. Von nun an wird die Seite auf Deutsch angezeigt. Dies kann später geändert werden.";
    case 'en':
      return "Please confirm that English is your mother tongue. From now on, the page will be in English. This can be changed later.";
    case 'ru':
      return "Пожалуйста, подтвердите, что русский язык — ваш родной язык. С этого момента страница будет на русском языке. Это можно изменить позже.";
    case 'ce':
      return "Дехар до, тIечIагIае хьан ненан мотт нохчийн мотт буйла. ХIинца дIа страница нохчийн маттахь хир ю. ХIара тIаьхьо хийца мега.";
    case 'prs':
      return "لطفاً تأیید کنید که دری زبان مادری شماست. از این پس، صفحه به زبان دری خواهد بود. این بعداً قابل تغییر است.";
    case 'ps':
      return "مهرباني وکړئ تایید کړئ چې پښتو ستاسو مورنۍ ژبه ده. له دې وروسته به پاڼه په پښتو کې وي. دا وروسته بدلیدی شي.";
    case 'fa':
      return "لطفاً تأیید کنید که فارسی زبان مادری شماست. از این پس، صفحه به زبان فارسی خواهد بود. این بعداً قابل تغییر است.";
    case 'ar':
      return "يرجى تأكيد أن اللغة العربية هي لغتك الأم. من الآن فصاعدًا، ستكون الصفحة باللغة العربية. يمكن تغيير هذا لاحقًا.";
    case 'ku':
      return "تکایە دڵنیابە کە کوردی زمانی دایکی تۆیە. لەمەودوا، لاپەڕەکە بە زمانی کوردی دەبێت. ئەمە دواتر دەتوانرێت بگۆڕدرێت.";
    case 'so':
      return "Fadlan xaqiiji in Soomaali ay tahay afkaaga hooyo. Hadda iyo wixii ka dambeeya, bogga wuxuu noqon doonaa Soomaali. Tan waa la bedeli karaa hadhow.";
    case 'ka':
      return "გთხოვთ, დაადასტუროთ, რომ ქართული თქვენი მშობლიური ენაა. ამიერიდან გვერდი იქნება ქართულად. ეს შეიძლება შეიცვალოს მოგვიანებით.";
    case 'sq':
      return "Ju lutemi konfirmoni që shqipja është gjuha juaj amtare. Tani e tutje, faqja do të jetë në shqip. Kjo mund të ndryshohet më vonë.";
    default:
      return "Please confirm your language selection. This can be changed later.";
  }
};

export const getHoverText = (code: string): string => {
  switch (code) {
    case 'de':
      return "Bitte wählen Sie Deutsch, wenn es Ihre Muttersprache ist";
    case 'en':
      return "Please select if English is your mother tongue";
    case 'ru':
      return "Пожалуйста, выберите, если русский — ваш родной язык";
    case 'ce':
      return "Дехар до, хаьржина, нохчийн мотт хьан ненан мотт белахь";
    case 'prs':
      return "لطفاً انتخاب کنید اگر دری زبان مادری شماست";
    case 'ps':
      return "مهرباني وکړئ وټاکئ که پښتو ستاسو مورنۍ ژبه وي";
    case 'fa':
      return "لطفاً انتخاب کنید اگر فارسی زبان مادری شماست";
    case 'ar':
      return "يرجى الاختيار إذا كانت العربية هي لغتك الأم";
    case 'ku':
      return "تکایە هەڵبژێرە ئەگەر کوردی زمانی دایکی تۆیە";
    case 'so':
      return "Fadlan dooro haddii Soomaali ay tahay afkaaga hooyo";
    case 'ka':
      return "გთხოვთ, აირჩიოთ, თუ ქართული თქვენი მშობლიური ენაა";
    case 'sq':
      return "Ju lutemi zgjidhni nëse shqipja është gjuha juaj amtare";
    default:
      return "Please select your mother tongue";
  }
};

export const getWelcomeText = (code: string): string => {
  switch (code) {
    case 'de':
      return "Willkommen! Schön dass du da bist";
    case 'en':
      return "Welcome! Nice to have you here";
    case 'ru':
      return "Добро пожаловать! Приятно видеть вас здесь";
    case 'ce':
      return "Марша вогӏийла! Хьо кхуза веана хазахета";
    case 'prs':
      return "خوش آمدید! خوشحالیم که اینجا هستید";
    case 'ps':
      return "ښه راغلاست! ستاسو دلته شتون مو خوښ دی";
    case 'fa':
      return "خوش آمدید! خوشحالیم که اینجا هستید";
    case 'ar':
      return "مرحبًا! سعيد بوجودك هنا";
    case 'ku':
      return "Bi xêr hatî! Keyfxweş im ku hûn li vir in";
    case 'so':
      return "Soo dhawow! Ku faraxsan inaad halkan joogto";
    case 'ka':
      return "კეთილი იყოს თქვენი მობრძანება! კარგია რომ აქა ხართ";
    case 'sq':
      return "Mirësevini! Është kënaqësi t'ju kemi këtu";
    default:
      return "Welcome! Nice to have you here";
  }
};

export const getHowCanIHelpText = (code: string): string => {
  switch (code) {
    case 'de':
      return "Wie kann ich dir helfen?";
    case 'en':
      return "How can I help you?";
    case 'ru':
      return "Как я могу вам помочь?";
    case 'ce':
      return "Со муха гIо дийр ду хьуна?";
    case 'prs':
      return "چگونه می‌توانم به شما کمک کنم؟";
    case 'ps':
      return "زه څنګه تاسو سره مرسته کولی شم؟";
    case 'fa':
      return "چطور می‌توانم به شما کمک کنم؟";
    case 'ar':
      return "كيف يمكنني مساعدتك؟";
    case 'ku':
      return "چۆن دەتوانم یارمەتیت بدەم؟";
    case 'so':
      return "Sideen kuu caawin karaa?";
    case 'ka':
      return "როგორ შემიძლია დაგეხმაროთ?";
    case 'sq':
      return "Si mund t'ju ndihmoj?";
    default:
      return "How can I help you?";
  }
};

export const getInformationHoverText = (code: string): string => {
  switch (code) {
    case 'de':
      return "Möchten Sie mehr über UND erfahren?";
    case 'en':
      return "Do you want to learn more about UND?";
    case 'ru':
      return "Хотите узнать больше о UND?";
    case 'ce':
      return "Лаьий хьуна UND лаьцна дукха хIума хаа?";
    case 'prs':
      return "آیا می‌خواهید درباره UND بیشتر بدانید؟";
    case 'ps':
      return "ایا غواړئ د UND په اړه نور معلومات ترلاسه کړئ؟";
    case 'fa':
      return "آیا می‌خواهید درباره UND بیشتر بدانید؟";
    case 'ar':
      return "هل تريد معرفة المزيد عن UND؟";
    case 'ku':
      return "ئایا دەتەوێت زیاتر دەربارەی UND بزانیت؟";
    case 'so':
      return "Ma rabtaa inaad wax badan ka ogaato UND?";
    case 'ka':
      return "გსურთ მეტი შეიტყოთ UND-ის შესახებ?";
    case 'sq':
      return "A dëshironi të mësoni më shumë për UND?";
    default:
      return "Do you want to learn more about UND?";
  }
};

export const getMainCategories = (code: string, category: string): string => {
  switch (category) {
      case 'information':
        switch (code) {
          case 'de': return "Information";
          case 'en': return "Information";
          case 'ru': return "Информация";
          case 'ce': return "Хаам";
          case 'prs': return "معلومات";
          case 'ps': return "معلومات";
          case 'fa': return "اطلاعات";
          case 'ar': return "معلومات";
          case 'ku': return "زانیاری";
          case 'so': return "Macluumaad";
          case 'ka': return "ინფორმაცია";
          case 'sq': return "Informacion";
          default: return "Information";
        }
      case 'learn':
        switch (code) {
          case 'de': return "Lernen";
          case 'en': return "Learn";
          default: return "Learn";
        }
      case 'community':
        switch (code) {
          case 'de': return "Gemeinschaft";
          case 'en': return "Community";
          case 'ru': return "Сообщество";
          case 'ce': return "Жамагlат";
          case 'prs': return "انجمن";
          case 'ps': return "ټولنه";
          case 'fa': return "جامعه";
          case 'ar': return "المجتمع";
          case 'ku': return "کۆمەڵگە";
          case 'so': return "Bulshada";
          case 'ka': return "საზოგადოება";
          case 'sq': return "Komuniteti";
          default: return "Community";
        }
     case 'ask':
        switch (code) {
          case 'de': return "Fragen";
          case 'en': return "Ask";
          default: return "Ask";
        }
     default: return "Empty Placeholder"
    }
};


export const getMainCategoriesSubtitles = (code: string, category: string): string => {
  switch (category) {
      case 'information':
        switch (code) {
          case 'de': return "Hier bieten wir spezifische Informationen zu verschiedenen Themen";
          case 'en': return "Here we offer specific information to various topics";
          default: return "Here we offer specific information to various topics";
        }
      case 'learn':
        switch (code) {
          case 'de': return "Klicken Sie hier für Kurse, Ressourcen oder Klassen";
          case 'en': return "Click here for courses, resources or classes";
          default: return "Click here for courses, resources or classes";
        }
      case 'community':
        switch (code) {
          case 'de': return "Brauchen Sie Hilfe oder möchten Sie anderen helfen? Klicken Sie hier";
          case 'en': return "Do you need help or do you want to help others? Click here";
          default: return "Do you need help or do you want to help others? Click here";
        }
     case 'ask':
        switch (code) {
          case 'de': return "Haben Sie eine Frage? Kontaktieren Sie uns!";
          case 'en': return "Do you have a question? Get in touch with us!";
          default: return "Do you have a question? Get in touch with us!";
        }
     default: return "Empty Placeholder"
    }
};

export const getSearchPlaceholder = (code: string): string => {
  switch (code) {
    case 'de': return "Suchen...";
    case 'en': return "Search...";
    case 'ru': return "Поиск...";
    case 'ce': return "Лаха...";
    case 'prs': return "جستجو...";
    case 'ps': return "لټون...";
    case 'fa': return "جستجو...";
    case 'ar': return "بحث...";
    case 'ku': return "گەڕان...";
    case 'so': return "Raadi...";
    case 'ka': return "ძებნა...";
    case 'sq': return "Kërko...";
    default: return "Search...";
  }
};

export const getPageTitle = (code: string, page: string): string => {
  switch (page) {
    case 'contacts':
      switch (code) {
        case 'de': return "Wichtige Kontakte und rechtliche Hilfe";
        case 'en': return "Important Contacts and Legal Help";
        case 'ru': return "Важные контакты и юридическая помощь";
        case 'ce': return "Къонаха болх беш йолу контакташ а, юридически гIо а";
        case 'prs': return "مخاطبین مهم و کمک حقوقی";
        case 'ps': return "مهم اړیکې او حقوقي مرستې";
        case 'fa': return "مخاطبین مهم و کمک حقوقی";
        case 'ar': return "جهات الاتصال المهمة والمساعدة القانونية";
        case 'ku': return "پەیوەندییە گرنگەکان و یارمەتی یاسایی";
        case 'so': return "Xiriirinta muhiimka ah iyo caawimaadda sharciga";
        case 'ka': return "მნიშვნელოვანი კონტაქტები და იურიდიული დახმარება";
        case 'sq': return "Kontakte të rëndësishme dhe ndihmë juridike";
        default: return "Important Contacts and Legal Help";
      }
    case 'housing':
      switch (code) {
        case 'de': return "Wohnen";
        case 'en': return "Housing";
        case 'ru': return "Жилье";
        case 'ce': return "Хиш";
        case 'prs': return "مسکن";
        case 'ps': return "کور";
        case 'fa': return "مسکن";
        case 'ar': return "السكن";
        case 'ku': return "نیشتەجێبوون";
        case 'so': return "Guriga";
        case 'ka': return "საცხოვრებელი";
        case 'sq': return "Banimi";
        default: return "Housing";
      }
    case 'education':
      switch (code) {
        case 'de': return "Bildung und Kinderbetreuung";
        case 'en': return "Education and Childcare";
        case 'ru': return "Образование и уход за детьми";
        case 'ce': return "Дешаран а, берийн хьал а";
        case 'prs': return "آموزش و مراقبت از کودکان";
        case 'ps': return "زده کړه او د ماشومانو پاملرنه";
        case 'fa': return "آموزش و مراقبت از کودکان";
        case 'ar': return "التعليم ورعاية الأطفال";
        case 'ku': return "پەروەردە و چاودێری منداڵان";
        case 'so': return "Waxbarashada iyo daryeelka carruurta";
        case 'ka': return "განათლება და ბავშვების მოვლა";
        case 'sq': return "Edukimi dhe kujdesi për fëmijët";
        default: return "Education and Childcare";
      }
    case 'volunteering':
      switch (code) {
        case 'de': return "Mithelfen";
        case 'en': return "Volunteering";
        case 'ru': return "Волонтерство";
        case 'ce': return "Къинхетам болх";
        case 'prs': return "داوطلبانه";
        case 'ps': return "داوطلبي";
        case 'fa': return "داوطلبانه";
        case 'ar': return "التطوع";
        case 'ku': return "خۆبەخشین";
        case 'so': return "Iskaa wax u qabso";
        case 'ka': return "მოხალისეობა";
        case 'sq': return "Vullnetarizmi";
        default: return "Volunteering";
      }
    case 'funding':
      switch (code) {
        case 'de': return "Förderungen";
        case 'en': return "Funding";
        case 'ru': return "Финансирование";
        case 'ce': return "Финансирование";
        case 'prs': return "تامین مالی";
        case 'ps': return "مالي تمویل";
        case 'fa': return "تامین مالی";
        case 'ar': return "التمويل";
        case 'ku': return "دارایی";
        case 'so': return "Maaliyadda";
        case 'ka': return "დაფინანსება";
        case 'sq': return "Financimi";
        default: return "Funding";
      }
    default:
      return "";
  }
};

export const getSectionTitle = (code: string, section: string): string => {
  switch (section) {
    case 'aboutPage':
      switch (code) {
        case 'de': return 'Über diese Seite';
        case 'en': return 'About this page';
        // ...other languages
        default: return 'About this page';
      }
    // Add more sections as needed
    default:
      return '';
  }
};

export const getSectionText = (code: string, section: string): string => {
  switch (section) {
    case 'aboutPage':
      switch (code) {
        case 'de': return 'Diese Seite wird bald mit Informationen gefüllt.';
        case 'en': return 'This page will soon be filled with information.';
        // ...other languages
        default: return 'This page will soon be filled with information.';
      }
    // Add more sections as needed
    default:
      return '';
  }
};

export const getSoundEnabled = (code: string, enabled: string): string => {
  switch (enabled) {
    case 'enabled':
        switch (code) {
            case 'de': return 'Ton eingeschaltet';
            case 'en': return 'Sound enabled';
            // ...other languages
            default: return 'Sound enabled';
      }
    default:
      switch (code) {
          case 'de': return 'Ton ausgeschaltet';
          case 'en': return 'Sound disabled';
          // ...other languages
          default: return 'Sound disabled';
      }
  }
};

export const getSearchTerm = (code: string): string => {
    switch (code) {
        case 'de': return 'Bitte geben Sie einen Suchbegriff ein';
        case 'en': return 'Please enter a search term';
        // ...other languages
        default: return 'Please enter a search term';
  }
};

export const getYes = (code: string): string => {
    switch (code) {
        case 'de': return 'Ja';
        case 'en': return 'Yes';
        // ...other languages
        default: return 'Yes';
    }
};

export const getNo = (code: string): string => {
    switch (code) {
        case 'de': return 'Nein';
        case 'en': return 'No';
        // ...other languages
        default: return 'No';
    }
};

export const getWhatWouldYouWantToKnow = (code: string): string => {
    switch (code) {
        case 'de': return 'Worüber möchtest du mehr wissen?';
        case 'en': return 'What would you like to know more about?';
        // ...other languages
        default: return 'What would you like to know more about?';
    }
};

export const getClickForDetails = (code: string): string => {
    switch (code) {
        case 'de': return 'Klicken für Details';
        case 'en': return 'Click for details';
        // ...other languages
        default: return 'Click for details';
    }
};

export const getLocation = (code: string): string => {
    switch (code) {
        case 'de': return 'Standort';
        case 'en': return 'Location';
        // ...other languages
        default: return 'Location';
    }
};

export const getFormat = (code: string): string => {
    switch (code) {
        case 'de': return 'Format';
        case 'en': return 'Format';
        // ...other languages
        default: return 'Format';
    }
};

export const getFilter = (code: string): string => {
    switch (code) {
        case 'de': return 'Filter';
        case 'en': return 'Filters';
        // ...other languages
        default: return 'Filters';
    }
};

export const getNiveau = (code: string): string => {
    switch (code) {
        case 'de': return 'Niveau';
        case 'en': return 'Level';
        // ...other languages
        default: return 'Level';
    }
};

export const getOnlineOnly = (code: string): string => {
    switch (code) {
        case 'de': return 'Nur online';
        case 'en': return 'Online only';
        // ...other languages
        default: return 'Online only';
    }
};

export const getPrice = (code: string): string => {
     switch (code) {
         case 'de': return 'Preis';
         case 'en': return 'Price';
         // ...other languages
         default: return 'Price';
    }
};

export const getFreeOnly = (code: string): string => {
     switch (code) {
         case 'de': return 'Nur kostenlos';
         case 'en': return 'Free only';
         // ...other languages
         default: return 'Free only';
    }
};

export const getClearFilters = (code: string): string => {
     switch (code) {
         case 'de': return 'Filter zurücksetzen';
         case 'en': return 'Clear Filters';
         // ...other languages
         default: return 'Clear Filters';
    }
};

export const getApply = (code: string): string => {
     switch (code) {
         case 'de': return 'Anwenden';
         case 'en': return 'Apply';
         // ...other languages
         default: return 'Apply';
    }
};

