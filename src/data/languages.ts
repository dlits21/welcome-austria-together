
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
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', rtl: true },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', rtl: true },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', flag: '🇦🇫', rtl: true },
  { code: 'ku', name: 'Kurdish', nativeName: 'کوردی', flag: '🇮🇶', rtl: true },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', flag: '🇸🇴' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ', flag: '🇪🇷' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' }
];

export const getConfirmationText = (code: string): string => {
  switch (code) {
    case 'de':
      return "Bitte bestätige dass du Deutsch verstehst! Von nun an wird dir die Seite auf Deutsch angezeigt. Du kannst dies später jederzeit ändern";
    case 'en':
      return "Please confirm that you understand English! From now on, the page will be displayed in English. You can change this at any time later.";
    case 'ar':
      return "الرجاء تأكيد أنك تفهم اللغة العربية! من الآن فصاعدًا، سيتم عرض الصفحة باللغة العربية. يمكنك تغيير ذلك في أي وقت لاحقًا.";
    case 'fa':
      return "لطفاً تأیید کنید که فارسی را متوجه می‌شوید! از این پس، صفحه به زبان فارسی نمایش داده خواهد شد. شما می‌توانید این را بعداً در هر زمان تغییر دهید.";
    case 'fr':
      return "Veuillez confirmer que vous comprenez le français ! À partir de maintenant, la page sera affichée en français. Vous pourrez modifier cela à tout moment ultérieurement.";
    default:
      return "Please confirm your language selection. You can change it later.";
  }
};
