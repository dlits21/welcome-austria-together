
import homeTutorialData from '../data/tutorial/home.json';
import virtualAssistantTutorialData from '../data/tutorial/virtualAssistant.json';
import indexTutorialData from '../data/tutorial/index.json';
import askTutorialData from '../data/tutorial/ask.json';
import askGeneralTutorial from '../data/tutorial/ask/general.json';
import askEmergencyTutorial from '../data/tutorial/ask/emergency.json';
import askLegalSupportTutorial from '../data/tutorial/ask/legal-support.json';
import askHealthTutorial from '../data/tutorial/ask/health.json';
import askFinancialTutorial from '../data/tutorial/ask/financial.json';
import askCulturalTutorial from '../data/tutorial/ask/cultural.json';
import {
  getGlobalText,
  getAskText,
  getAskGeneralText,
  getAskEmergencyText,
  getAskLegalText,
  getAskHealthText,
  getAskFinancialText,
  getAskCulturalText,
  getHomeText
} from './languageUtils';

export const getTutorialData = (tutorialData: string) => {
  switch (tutorialData) {
    case 'index':
      return indexTutorialData;
    case 'ask':
      return askTutorialData;
    case 'ask-general':
      return askGeneralTutorial;
    case 'ask-emergency':
      return askEmergencyTutorial;
    case 'ask-legal-support':
      return askLegalSupportTutorial;
    case 'ask-health':
      return askHealthTutorial;
    case 'ask-financial':
      return askFinancialTutorial;
    case 'ask-cultural':
      return askCulturalTutorial;
    case 'virtualAssistant':
      return virtualAssistantTutorialData;
    default:
      return homeTutorialData;
  }
};

export const getCategoryHelper = (key: string, languageCode: string, tutorialData: string) => {
  switch (tutorialData) {
    case 'ask':
      return getAskText(key, languageCode);
    case 'ask-general':
      return getAskGeneralText(key, languageCode);
    case 'ask-emergency':
      return getAskEmergencyText(key, languageCode);
    case 'ask-legal-support':
      return getAskLegalText(key, languageCode);
    case 'ask-health':
      return getAskHealthText(key, languageCode);
    case 'ask-financial':
      return getAskFinancialText(key, languageCode);
    case 'ask-cultural':
      return getAskCulturalText(key, languageCode);
    case 'virtualAssistant':
      return virtualAssistantTutorialData;
    default:
      return getHomeText(key, languageCode);
  }
};
