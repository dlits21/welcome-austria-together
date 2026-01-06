import React from 'react';
import {
  Linking,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform
} from "react-native";
import {
  GermanFlag,
  GBFlag,
  RussianFlag,
  AfghaniFlag,
  IranianFlag,
  SyrianFlag,
  SomaliFlag,
  GeorgianFlag,
  AlbanianFlag,
  KurdishFlag,
  ChechenFlag
} from '../components/SVG/Flags';
import { CircleBorder } from '../components/CircleIcon';
import { handleContactClick } from '../utils/contactUtils';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";

interface ContactData {
  name: string;
  subtitle?: string;
  languages: string[];
  phone?: string;
  email?: string;
  url?: string;
}

const LANGUAGES = {
  "de": GermanFlag,
  "en": GBFlag,
  "ru": RussianFlag,
  "ch": ChechenFlag,
  "prs": AfghaniFlag,
  "ps": AfghaniFlag,
  "fa": IranianFlag,
  "ar": SyrianFlag,
  "ku": KurdishFlag,
  "so": SomaliFlag,
  "ka": GeorgianFlag,
  "sq": AlbanianFlag
}

const ContactCard: React.FC<ContactData> = ({
  name,
  subtitle,
  phone,
  email,
  url,
  languages = ['de'],
}) => {
 const { t, i18n } = useTranslation('common');
 const currentLanguage = i18n.language;
 const isWeb  = Platform.OS == 'web'
 const circleSize = isWeb ? 30 : 20;
 const flagSize = isWeb ? 150 : 70;
 console.log(email)

  return (
    <View style={styles.contactCard}>
      <View style={{flexDirection: "row"}}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.contactName}>{name}</Text>
          {subtitle ? <Text style={styles.contactSub}>{subtitle}</Text> : null}
        </View>
        {languages.length > 0 && (
           <View style={styles.languagesContainer}>
             <View style={styles.flagsContainer}>
               {languages.map((lang) => {
                 const Flag = LANGUAGES[lang]
                 return (
                 <View style={styles.flag}>
                 <CircleBorder
                   size={circleSize}
                   borderWidth={2}
                   borderColor={'#e6e6e6'}
                 >
                   <Flag width={flagSize} height={flagSize} />
                 </CircleBorder>
                 </View>
                 )})}
             </View>
           </View>
         )}
      </View>

      <View style={styles.contactActions}>
        {phone && (
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => handleContactClick({method: "phone", phone_number:phone})}
          >
            <MaterialIcons name="phone" size={16} color="#fff" />
            <Text style={styles.contactButtonText}>{t('phone')}</Text>
          </TouchableOpacity>
        )}
        {email && (
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => handleContactClick({method: "email", email:email})}
          >
            <MaterialIcons name="email" size={16} color="#fff" />
            <Text style={styles.contactButtonText}>{t('email')}</Text>
          </TouchableOpacity>
        )}
        {url && (
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => handleContactClick({method: "website", url:url})}
          >
            <FontAwesome6 name="internet-explorer" size={16} color="#fff" />
            <Text style={styles.contactButtonText}>{t('website')}</Text>
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  contactCard: { flexDirection: "row", alignItems: "center", padding: 12, borderWidth: 1, borderColor: "#e6e6e6", borderRadius: 10, marginBottom: 10, justifyContent: "space-between" },
  contactName: { fontSize: 15, fontWeight: "700", color: "#111" },
  contactSub: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  contactActions: { flexDirection: "row", marginLeft: 12 },
  contactButton: { backgroundColor: "#A60B33", padding: 10, borderRadius: 8, marginLeft: 6, alignItems: "center"},
  contactButtonText: { color: "#fff", fontWeight: "700" },

  languagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  flagsContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  flag: {
    flexDirection: 'row',
    marginHorizontal: 8,
  },

});

export default ContactCard;