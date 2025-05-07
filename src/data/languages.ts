
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
