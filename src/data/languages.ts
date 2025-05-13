
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
      return "Willkommen bei UND";
    case 'en':
      return "Welcome at UND";
    case 'ru':
      return "Добро пожаловать в UND";
    case 'ce':
      return "UND-хьа марша догIийла";
    case 'prs':
      return "به UND خوش آمدید";
    case 'ps':
      return "UND ته ښه راغلاست";
    case 'fa':
      return "به UND خوش آمدید";
    case 'ar':
      return "مرحبًا بك في UND";
    case 'ku':
      return "بەخێربێن بۆ UND";
    case 'so':
      return "Ku soo dhowow UND";
    case 'ka':
      return "კეთილი იყოს თქვენი მობრძანება UND-ში";
    case 'sq':
      return "Mirë se vini në UND";
    default:
      return "Welcome at UND";
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

export const getCategoryLabel = (code: string, category: string): string => {
  if (category === 'information') {
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
  }
  else if (category === 'courses') {
    switch (code) {
      case 'de': return "Kurse";
      case 'en': return "Courses";
      case 'ru': return "Курсы";
      case 'ce': return "Курсаш";
      case 'prs': return "دوره‌ها";
      case 'ps': return "کورسونه";
      case 'fa': return "دوره‌ها";
      case 'ar': return "الدورات";
      case 'ku': return "خولەکان";
      case 'so': return "Koorsooyinka";
      case 'ka': return "კურსები";
      case 'sq': return "Kurse";
      default: return "Courses";
    }
  }
  else if (category === 'community') {
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
  }
  else if (category === 'help') {
    switch (code) {
      case 'de': return "Hilfe";
      case 'en': return "Help";
      case 'ru': return "Помощь";
      case 'ce': return "ГIо";
      case 'prs': return "کمک";
      case 'ps': return "مرسته";
      case 'fa': return "کمک";
      case 'ar': return "مساعدة";
      case 'ku': return "یارمەتی";
      case 'so': return "Caawimaad";
      case 'ka': return "დახმარება";
      case 'sq': return "Ndihmë";
      default: return "Help";
    }
  }
  return "";
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
