
import React from 'react';
import AssistantSlide from './tutorial/AssistantSlide';
import BasicSlide from './tutorial/BasicSlide';
import ConfirmationSlide from './tutorial/ConfirmationSlide';
import CategorySlide from './tutorial/CategorySlide';
import { getTutorialData, getCategoryHelper } from '../utils/tutorialDataUtils';

interface TutorialSlideContentProps {
  currentSlide: number;
  languageCode: string;
  isWideScreen: boolean;
  tutorialData?: string;
  onVirtualAssistant?: () => void;
}

const TutorialSlideContent: React.FC<TutorialSlideContentProps> = ({ 
  currentSlide, 
  languageCode, 
  isWideScreen,
  tutorialData = 'home',
  onVirtualAssistant
}) => {
  const data = getTutorialData(tutorialData);
  const slide = data.slides.find(s => s.id === currentSlide);
  
  if (!slide) {
    return null;
  }

  const categoryHelperFunc = (key: string, lang: string) => 
    getCategoryHelper(key, lang, tutorialData);

  switch (slide.type) {
    case 'assistant':
      return (
        <AssistantSlide 
          slide={slide}
          languageCode={languageCode}
          onVirtualAssistant={onVirtualAssistant}
        />
      );
    
    case 'welcome':
    case 'instruction':
    case 'feature':
    case 'language':
    case 'icons':
      return (
        <BasicSlide 
          slide={slide}
          currentSlide={currentSlide}
          languageCode={languageCode}
          tutorialData={tutorialData}
        />
      );
    
    case 'confirmation':
      return (
        <ConfirmationSlide 
          slide={slide}
          languageCode={languageCode}
          isWideScreen={isWideScreen}
        />
      );
    
    case 'category':
      return (
        <CategorySlide 
          slide={slide}
          languageCode={languageCode}
          isWideScreen={isWideScreen}
          getCategoryHelper={categoryHelperFunc}
        />
      );
    
    default:
      return null;
  }
};

export default TutorialSlideContent;
