
import { MaterialIcons } from '@expo/vector-icons';

export const getSlideIconAndColor = (type: string, slideIndex: number, tutorialData: string) => {
  const getIconForSlide = (type: string, slideIndex: number) => {
    switch (type) {
      case 'welcome':
        return 'info';
      case 'instruction':
        return 'touch-app';
      case 'confirmation':
        return 'check-circle';
      case 'language':
        return 'language';
      case 'icons':
        return 'help';
      case 'feature':
        if (tutorialData === 'ask' || tutorialData === 'ask-general' || tutorialData === 'ask-emergency' || tutorialData === 'ask-health' || tutorialData === 'ask-financial' || tutorialData === 'ask-cultural') {
          const isLastSlide = slideIndex === (tutorialData === 'ask' ? 10 : tutorialData === 'ask-emergency' ? 10 : tutorialData === 'ask-health' ? 10 : tutorialData === 'ask-financial' ? 9 : tutorialData === 'ask-cultural' ? 8 : 6);
          const isSecondLastSlide = slideIndex === (tutorialData === 'ask' ? 9 : tutorialData === 'ask-emergency' ? 9 : tutorialData === 'ask-health' ? 9 : tutorialData === 'ask-financial' ? 8 : tutorialData === 'ask-cultural' ? 7 : 5);
          return isLastSlide ? 'language' : isSecondLastSlide ? 'record-voice-over' : 'mic';
        }
        if (tutorialData === 'ask-legal-support') {
          const isLastSlide = slideIndex === 7;
          const isSecondLastSlide = slideIndex === 6;
          return isLastSlide ? 'language' : isSecondLastSlide ? 'record-voice-over' : 'mic';
        }
        return slideIndex === 4 ? 'record-voice-over' : slideIndex === 5 ? 'help' : 'mic';
      default:
        return 'info';
    }
  };

  const getColorForSlide = (type: string, slideIndex: number) => {
    switch (type) {
      case 'welcome':
        return '#3B82F6';
      case 'instruction':
        return '#10B981';
      case 'confirmation':
        return '#F59E0B';
      case 'icons':
        return '#8B5CF6';
      case 'feature':
        if (tutorialData === 'ask' || tutorialData === 'ask-general' || tutorialData === 'ask-emergency' || tutorialData === 'ask-health' || tutorialData === 'ask-financial' || tutorialData === 'ask-cultural') {
          const isLastSlide = slideIndex === (tutorialData === 'ask' ? 10 : tutorialData === 'ask-emergency' ? 10 : tutorialData === 'ask-health' ? 10 : tutorialData === 'ask-financial' ? 9 : tutorialData === 'ask-cultural' ? 8 : 6);
          const isSecondLastSlide = slideIndex === (tutorialData === 'ask' ? 9 : tutorialData === 'ask-emergency' ? 9 : tutorialData === 'ask-health' ? 9 : tutorialData === 'ask-financial' ? 8 : tutorialData === 'ask-cultural' ? 7 : 5);
          return isLastSlide ? '#10B981' : isSecondLastSlide ? '#8B5CF6' : '#10B981';
        }
        if (tutorialData === 'ask-legal-support') {
          const isLastSlide = slideIndex === 7;
          const isSecondLastSlide = slideIndex === 6;
          return isLastSlide ? '#10B981' : isSecondLastSlide ? '#8B5CF6' : '#10B981';
        }
        return slideIndex === 4 ? '#10B981' : slideIndex === 5 ? '#8B5CF6' : '#10B981';
      default:
        return '#3B82F6';
    }
  };

  return {
    icon: getIconForSlide(type, slideIndex) as keyof typeof MaterialIcons.glyphMap,
    color: getColorForSlide(type, slideIndex)
  };
};
