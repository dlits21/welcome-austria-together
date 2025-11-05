import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import SlidesInformation from '../components/SlidesInformation';

export default function SlidesInformationPage() {
  const params = useLocalSearchParams();

  // Parse the params
  const stepNumber = Number(params.stepNumber) || 1;
  const title = String(params.title || '');
  const subtitle = String(params.subtitle || '');
  const imagePath = params.imagePath; // This should be passed as image require/import
  const imagePosition = (params.imagePosition as 'left' | 'right') || 'right';
  const slideContent = params.slideContent ? JSON.parse(String(params.slideContent)) : [];
  const helperText = String(params.helperText || '');
  const translationNamespace = String(params.translationNamespace || '');
  const colorPalette = params.colorPalette ? JSON.parse(String(params.colorPalette)) : undefined;
  const badgeText = String(params.badgeText || 'M2');

  return (
    <SlidesInformation
      translationNamespace={translationNamespace}
      stepNumber={stepNumber}
      title={title}
      subtitle={subtitle}
      imagePath={imagePath}
      imagePosition={imagePosition}
      slideContent={slideContent}
      helperText={helperText}
      audioText={helperText}
      colorPalette={colorPalette}
      badgeText={badgeText}
    />
  );
}
