import { Linking } from 'react-native';

export const handleContactClick = ({
    method,
    isIndividual = true,
    signal_handle = '+yelloew.22',
    phone_number = "+4368110768180",
    telegram_handle = "Dlits2",
    email = "dlits2111@gmail.com",
    facebook = "your_facebook_page",
    url = "www.und-sdg.at"}) => {

  const message = encodeURIComponent('Hallo, ich benötige Unterstützung und Beratung. Können Sie mir helfen?');
  console.log("phone_number", phone_number, email, method)
  phone_number = phone_number.replace(/\s/g, "");
  if (method === 'signal') {
    if (isIndividual) {
      const signalUrl = `sgnl://signal.me/#p/${signal_handle}`;
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
      const whatsappUrl = `whatsapp://send?phone=${phone_number}&text=${message}`;
      try {
        Linking.openURL(whatsappUrl);
      } catch (error) {
        const webWhatsappUrl = `https://web.whatsapp.com/send?phone=${phone_number}&text=${message}`;
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
      const telegramUrl = `tg://resolve?domain=${telegram_handle}&text=${message}`;
      try {
        Linking.openURL(telegramUrl);
      } catch (error) {
        const webTelegramUrl = `https://t.me/${telegram_handle}?text=${message}`;
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
    const facebookUrl = `https://m.me/${facebook}`;
    Linking.openURL(facebookUrl);
  } else if (method === 'email') {
    const emailUrl = `mailto:${email}`;
    Linking.openURL(emailUrl);
  } else if (method === 'phone') {
    const phoneUrl = `tel:${phone_number}`;
    Linking.openURL(phoneUrl);
  } else if (method === 'community-forum') {
    const forumUrl = 'https://forum.example.com';
    Linking.openURL(forumUrl);
  } else if (method === 'website') {
    Linking.openURL(url).catch(() => Alert.alert("Cannot open link"))
  }
};