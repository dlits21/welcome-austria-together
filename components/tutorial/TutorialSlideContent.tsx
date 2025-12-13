
import React from 'react';
import BasicSlide from './BasicSlide';
import ConfirmationSlide from './ConfirmationSlide';
import CategorySlide from './CategorySlide';
import languageModal from "@/components/LanguageModal";

interface TutorialSlideContentProps {
  data: any;
  currentSlide: number;
  isWideScreen: boolean;
}

const TutorialSlideContent: React.FC<TutorialSlideContentProps> = ({
  data,
  currentSlide,
  isWideScreen,
}) => {

  const slide = data.slides.find(s => s.id === currentSlide);

  if (!slide) {
    return null;
  }

  switch (slide.type) {
    case 'confirmation':
      return (
        <ConfirmationSlide
          slide={slide}
          isWideScreen={isWideScreen}
        />
      );

    case 'category':
      return (
        <CategorySlide
          slide={slide}
          isWideScreen={isWideScreen}
        />
      );

    default:
        return (
          <BasicSlide
            slide={slide}
            currentSlide={currentSlide}
            data={data}
          />
        );
  }
};

export default TutorialSlideContent;
