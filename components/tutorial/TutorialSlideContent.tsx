
import React from 'react';
import AssistantSlide from './AssistantSlide';
import BasicSlide from './BasicSlide';
import ConfirmationSlide from './ConfirmationSlide';
import CategorySlide from './CategorySlide';

interface TutorialSlideContentProps {
  data: string;
  currentSlide: number;
  languageCode: string;
  isWideScreen: boolean;
  onVirtualAssistant?: () => void;
}

const TutorialSlideContent: React.FC<TutorialSlideContentProps> = ({
  data,
  currentSlide,
  languageCode,
  isWideScreen,
  onVirtualAssistant
}) => {

  const slide = data.slides.find(s => s.id === currentSlide);

  if (!slide) {
    return null;
  }

  switch (slide.type) {
    case 'assistant':
      return (
        <AssistantSlide
          slide={slide}
          languageCode={languageCode}
          onVirtualAssistant={onVirtualAssistant}
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
        />
      );

    default:
        return (
          <BasicSlide
            slide={slide}
            currentSlide={currentSlide}
            languageCode={languageCode}
            data={data}
          />
        );
  }
};

export default TutorialSlideContent;
