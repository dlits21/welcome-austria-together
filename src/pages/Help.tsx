import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getCategoryLabel } from '../data/languages';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { ArrowLeft, Volume, VolumeX, HelpCircle, Languages, Play } from 'lucide-react';

// Sample video data
const videos = [
  { id: 'vid1', thumbnail: '📺', title: { en: 'How to register', de: 'Wie man sich anmeldet' } },
  { id: 'vid2', thumbnail: '📺', title: { en: 'Finding a job', de: 'Einen Job finden' } },
  { id: 'vid3', thumbnail: '📺', title: { en: 'Learning German', de: 'Deutsch lernen' } },
  { id: 'vid4', thumbnail: '📺', title: { en: 'Housing assistance', de: 'Wohnungshilfe' } },
  { id: 'vid5', thumbnail: '📺', title: { en: 'Healthcare system', de: 'Gesundheitssystem' } },
  { id: 'vid6', thumbnail: '📺', title: { en: 'Education options', de: 'Bildungsangebote' } },
  { id: 'vid7', thumbnail: '📺', title: { en: 'Public transportation', de: 'Öffentliche Verkehrsmittel' } },
  { id: 'vid8', thumbnail: '📺', title: { en: 'Cultural activities', de: 'Kulturelle Aktivitäten' } },
  { id: 'vid9', thumbnail: '📺', title: { en: 'Legal rights', de: 'Rechte und Gesetze' } },
  { id: 'vid10', thumbnail: '📺', title: { en: 'Financial support', de: 'Finanzielle Unterstützung' } },
];

const Videos: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // Sound toggle logic would be implemented here
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-8"
      dir={language.rtl ? 'rtl' : 'ltr'}
    >
      <div className="flex justify-between mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/home')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language.rtl ? 'رجوع' : 'Back'}
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="p-2"
            onClick={toggleSound}
          >
            {soundEnabled ? <Volume className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
          </Button>
          <Button
            variant="ghost"
            className="p-2"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            className="p-2"
          >
            <Languages className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">
        {language.code === 'de' ? 'Videos' : 'Videos'}
      </h1>
      
      <ScrollArea className="h-[70vh] max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <Button
              key={video.id}
              variant="outline"
              className="h-auto flex flex-col items-center text-center p-4 hover:bg-gray-50"
              onClick={() => console.log(`Playing video: ${video.id}`)}
            >
              <div className="bg-gray-200 w-full aspect-video mb-2 flex items-center justify-center">
                <span className="text-4xl">{video.thumbnail}</span>
                <Play className="absolute h-12 w-12 text-white bg-black/50 rounded-full p-2" />
              </div>
              <span className="text-lg mt-2">
                {language.code === 'de' ? video.title.de : video.title.en}
              </span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Videos;
