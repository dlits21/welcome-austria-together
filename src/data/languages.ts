
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', rtl: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', rtl: true },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', flag: '🇦🇫', rtl: true },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', rtl: false },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱', rtl: false },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', flag: '🇸🇴', rtl: false },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ', flag: '🇪🇷', rtl: false },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', rtl: false },
  { code: 'ku', name: 'Kurdish', nativeName: 'کوردی', flag: '🇮🇶', rtl: true },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', rtl: true },
];

// Utility functions for translations
export function getWelcomeText(languageCode: string) {
  switch (languageCode) {
    case 'de':
      return 'Willkommen';
    case 'ar':
      return 'مرحبا';
    case 'fa':
      return 'خوش آمدید';
    case 'ps':
      return 'ښه راغلاست';
    case 'ru':
      return 'Добро пожаловать';
    case 'sq':
      return 'Mirësevini';
    case 'so':
      return 'Soo dhowow';
    case 'ti':
      return 'ብደሓን ምጹ';
    case 'tr':
      return 'Hoşgeldiniz';
    case 'ku':
      return 'بەخێر بێی';
    case 'ur':
      return 'خوش آمدید';
    default:
      return 'Welcome';
  }
}

export function getHoverText(languageCode: string) {
  switch (languageCode) {
    case 'de':
      return 'Klicken Sie hier, um mit dieser Sprache fortzufahren';
    case 'ar':
      return 'انقر هنا للمتابعة بهذه اللغة';
    case 'fa':
      return 'برای ادامه با این زبان کلیک کنید';
    case 'ps':
      return 'دې ژبې سره د دوام لپاره دلته کلیک وکړئ';
    case 'ru':
      return 'Нажмите здесь, чтобы продолжить на этом языке';
    case 'sq':
      return 'Klikoni këtu për të vazhduar me këtë gjuhë';
    case 'so':
      return 'Halkan riix si aad ugu sii socotid luuqaddan';
    case 'ti':
      return 'ነዚ ቋንቋ እዚ ንምቕጻል ኣብዚ ጠውቑ';
    case 'tr':
      return 'Bu dille devam etmek için buraya tıklayın';
    case 'ku':
      return 'کلیک لێرە بکە بۆ بەردەوام بوون بەم زمانە';
    case 'ur':
      return 'اس زبان کے ساتھ جاری رکھنے کے لیے یہاں کلک کریں';
    default:
      return 'Click here to continue with this language';
  }
}

export function getConfirmationText(languageCode: string) {
  switch (languageCode) {
    case 'de':
      return 'Ist dies Ihre Sprache?';
    case 'ar':
      return 'هل هذه لغتك؟';
    case 'fa':
      return 'آیا این زبان شماست؟';
    case 'ps':
      return 'ایا دا ستاسو ژبه ده؟';
    case 'ru':
      return 'Это ваш язык?';
    case 'sq':
      return 'A është kjo gjuha juaj?';
    case 'so':
      return 'Kani luuqadaada?';
    case 'ti':
      return 'እዚ ቋንቋ ናትካ ድዩ?';
    case 'tr':
      return 'Bu diliniz mi?';
    case 'ku':
      return 'ئایا ئەمە زمانی تۆیە؟';
    case 'ur':
      return 'کیا یہ آپ کی زبان ہے؟';
    default:
      return 'Is this your language?';
  }
}

export function getHowCanIHelpText(languageCode: string) {
  switch (languageCode) {
    case 'de':
      return 'Wie kann ich dir helfen?';
    case 'ar':
      return 'كيف يمكنني مساعدتك؟';
    case 'fa':
      return 'چگونه می‌توانم کمک کنم؟';
    case 'ps':
      return 'زه څنګه مرسته کولی شم؟';
    case 'ru':
      return 'Как я могу вам помочь?';
    case 'sq':
      return 'Si mund të ndihmoj?';
    case 'so':
      return 'Sideen kugu caawin karaa?';
    case 'ti':
      return 'ብኸመይ ክሕግዝ እኽእል?';
    case 'tr':
      return 'Size nasıl yardımcı olabilirim?';
    case 'ku':
      return 'من چۆن دەتوانم یارمەتیت بدەم؟';
    case 'ur':
      return 'میں آپ کی کیسے مدد کر سکتا ہوں؟';
    default:
      return 'How can I help you?';
  }
}

export function getSearchPlaceholder(languageCode: string) {
  switch (languageCode) {
    case 'de':
      return 'Suchen Sie nach Informationen...';
    case 'ar':
      return 'ابحث عن المعلومات...';
    case 'fa':
      return 'جستجوی اطلاعات...';
    case 'ps':
      return 'د معلوماتو لټون وکړئ...';
    case 'ru':
      return 'Поиск информации...';
    case 'sq':
      return 'Kërko për informacion...';
    case 'so':
      return 'Raadi macluumaad...';
    case 'ti':
      return 'ሓበሬታ ድለይ...';
    case 'tr':
      return 'Bilgi arayın...';
    case 'ku':
      return 'بۆ زانیاری بگەڕێ...';
    case 'ur':
      return 'معلومات تلاش کریں...';
    default:
      return 'Search for information...';
  }
}

export function getCategoryLabel(languageCode: string, category: string) {
  if (languageCode === 'de') {
    switch (category) {
      case 'ask': return 'Fragen';
      case 'information': return 'Informationen';
      case 'learn': return 'Lernen';
      case 'community': return 'Gemeinschaft';
      default: return category;
    }
  } else {
    switch (category) {
      case 'ask': return 'Ask';
      case 'information': return 'Information';
      case 'learn': return 'Learn';
      case 'community': return 'Community';
      default: return category;
    }
  }
}
