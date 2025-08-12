import React, { useState } from 'react';
import { X } from 'lucide-react';

interface HighlightedTextProps {
  children: string;
  definitions: { [key: string]: { en: string; de: string } };
  language: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ children, definitions, language }) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderTextWithHighlights = () => {
    const text = children;
    const highlightedWords = Object.keys(definitions);
    
    // Split text into paragraphs and then words
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, paragraphIndex) => {
      const words = paragraph.split(' ');
      const elements: JSX.Element[] = [];
      
      words.forEach((word, index) => {
        // Remove punctuation for matching but keep it for display
        const cleanWord = word.toLowerCase().replace(/[.,!?;:\n]$/, '');
        const isHighlighted = highlightedWords.some(hw => hw.toLowerCase() === cleanWord);
        
        if (isHighlighted) {
          const originalWord = highlightedWords.find(hw => hw.toLowerCase() === cleanWord) || word;
          elements.push(
            <button
              key={`${paragraphIndex}-${index}`}
              onClick={() => {
                setSelectedWord(originalWord);
                setModalVisible(true);
              }}
              className="inline border-b-2 border-primary bg-primary/10 px-1 py-0.5 rounded-sm text-primary hover:bg-primary/20 transition-colors cursor-pointer"
            >
              {word}
            </button>
          );
        } else {
          elements.push(
            <span key={`${paragraphIndex}-${index}`} className="text-foreground">
              {word}
            </span>
          );
        }
        
        // Add space between words except for the last word
        if (index < words.length - 1) {
          elements.push(
            <span key={`${paragraphIndex}-space-${index}`} className="text-foreground"> </span>
          );
        }
      });
      
      return (
        <p key={paragraphIndex} className="mb-4 leading-relaxed">
          {elements}
        </p>
      );
    });
  };

  const getDefinition = () => {
    if (!selectedWord || !definitions[selectedWord]) return '';
    return language === 'de' ? definitions[selectedWord].de : definitions[selectedWord].en;
  };

  return (
    <div className="text-foreground">
      <div className="space-y-4">
        {renderTextWithHighlights()}
      </div>
      
      {modalVisible && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setModalVisible(false)}
        >
          <div 
            className="bg-background border rounded-lg p-6 max-w-sm w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-foreground">{selectedWord}</h3>
              <button 
                onClick={() => setModalVisible(false)}
                className="p-1 hover:bg-muted rounded-sm transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>
            <p className="text-muted-foreground leading-relaxed">{getDefinition()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HighlightedText;