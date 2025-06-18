
import { Linking } from 'react-native';

export const handleContactClick = (method: string, isIndividual: boolean = true, languageCode: string = 'en') => {
  console.log(`Contact via ${method}, individual: ${isIndividual}`);
  
  const message = encodeURIComponent(
    languageCode === 'de' 
      ? 'Hallo, ich benötige Unterstützung und Beratung. Können Sie mir helfen?'
      : 'Hello, I need support and counseling. Can you help me?'
  );

  if (method === 'signal') {
    if (isIndividual) {
      const signalUrl = `sgnl://signal.me/#p/+yelloew.22`;
      try {
        Linking.openURL(signalUrl);
      } catch (error) {
        console.log('Signal app not available, showing fallback');
        Linking.openURL('https://signal.org/download/');
      }
    } else {
      const groupLink = 'https://signal.group/#CjQKINz5quiReN4ZksBVp99kW_f4-eCiPBR7bfwSphZDES8-EhBMIwtzlhtvoP42pntNjdaA';
      try {
        Linking.openURL(groupLink);
      } catch (error) {
        console.log('Could not open Signal group link');
        Linking.openURL('https://signal.org/download/');
      }
    }
  } else if (method === 'whatsapp') {
    if (isIndividual) {
      const whatsappUrl = `whatsapp://send?phone=+4368110768180&text=${message}`;
      try {
        Linking.openURL(whatsappUrl);
      } catch (error) {
        const webWhatsappUrl = `https://web.whatsapp.com/send?phone=4368110768180&text=${message}`;
        Linking.openURL(webWhatsappUrl);
      }
    } else {
      const communityLink = 'https://chat.whatsapp.com/Br987MYfTB88haisyOuWof';
      try {
        Linking.openURL(communityLink);
      } catch (error) {
        console.log('Could not open WhatsApp community link');
        Linking.openURL('https://web.whatsapp.com/Br987MYfTB88haisyOuWof');
      }
    }
  } else if (method === 'telegram') {
    if (isIndividual) {
      const telegramUrl = `tg://resolve?domain=Dlits2&text=${message}`;
      try {
        Linking.openURL(telegramUrl);
      } catch (error) {
        const webTelegramUrl = `https://t.me/Dlits2?text=${message}`;
        Linking.openURL(webTelegramUrl);
      }
    } else {
      const communityLink = 'https://t.me/+iHlinCIOaTI3OTNk';
      try {
        Linking.openURL(communityLink);
      } catch (error) {
        console.log('Could not open Telegram community link');
        Linking.openURL(communityLink);
      }
    }
  } else if (method === 'facebook') {
    const facebookUrl = 'https://m.me/your_facebook_page';
    Linking.openURL(facebookUrl);
  } else if (method === 'email') {
    const emailUrl = 'mailto:dlits2111@gmail.com';
    Linking.openURL(emailUrl);
  } else if (method === 'phone') {
    const phoneUrl = 'tel:+4368110768180';
    Linking.openURL(phoneUrl);
  } else if (method === 'community-forum') {
    const forumUrl = 'https://forum.example.com';
    Linking.openURL(forumUrl);
  }
};
