import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform
    } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useTranslation } from 'react-i18next';
import { handleContactClick } from '../utils/contactUtils';
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

interface LotsInnen {
  name: string;
  imagePath: string;
  languages: string[];
  subtitles: string[];
  whatsapp: string;
  email: string;
}

const expertImages = {
 "ibrahim": require("../assets/images/ibrahim.jpeg"),
 "hamdi": require("../assets/images/hamdi.jpeg"),
 "tayyaba": require("../assets/images/tayyaba.jpeg"),
 "yassin": require("../assets/images/yassin.jpeg"),
 }

const ExpertCard: React.FC<LotsInnen> = ({
  name,
  imagePath,
  languages,
  subtitle,
  whatsapp,
  email,
}) => {
  const [showContactPreference, setShowContactPreference] = useState(false);
  const { t, i18n } = useTranslation('support');
  const currentLanguage = i18n.language;

  const expertImage = expertImages[imagePath];

  const isWeb  = Platform.OS == 'web'
  const circleSize = isWeb ? 40 : 50;
  const flagSize = isWeb ? 50 : 70;

  return (
    <View style={styles.expertCard}>
      <View style={styles.expertHeader}>
        <View style={styles.avatarContainer}>
        <Image source={expertImage} style={styles.expertImage} />
        </View>
        <View style={styles.expertInfo}>
          <Text style={styles.expertName}>{name}</Text>
          <Text style={styles.expertSpecialization}>{subtitle[currentLanguage]}</Text>
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
                    borderColor={'#fff'}
                  >
                    <Flag width={flagSize} height={flagSize} />
                  </CircleBorder>
                  </View>
                  )})}
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleContactClick({method: "whatsapp", phone_number:whatsapp})}
        >
          <FontAwesome6 name="whatsapp" size={16} color="#10B981" />
          <Text style={styles.actionButtonText}>{t('textMe')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleContactClick({method: "email", email:email})}
        >
          <MaterialIcons name="email" size={16} color="#3B82F6" />
          <Text style={styles.actionButtonText}>{t('emailMe')}</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  expertCard: {
    flex: 1,
    minWidth: 350,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    margin: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expertHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  expertImage: {
    marginTop: 16,
    width: 200,
    height: 250,
    borderRadius: 30
  },
  expertInfo: {
    alignItems: 'center',
  },
  expertName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  expertSpecialization: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actionButtons: {
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
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
  flagWrapper: {
    width: 20,
    height: 15,
    marginRight: 3,
    borderRadius: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ExpertCard;