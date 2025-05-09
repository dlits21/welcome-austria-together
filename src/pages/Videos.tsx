
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/languages';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, PlaySquare } from 'lucide-react';
import { ScrollArea } from '../components/ui/scroll-area';
import PageNavigation from '../components/PageNavigation';

interface Video {
  id: string;
  title: { en: string; de: string };
  description: { en: string; de: string };
  thumbnail: string;
  url: string;
  duration: string;
}

const mockVideos: Video[] = [
  {
    id: "vid1",
    title: { en: "Introduction to UND", de: "Einführung in UND" },
    description: { 
      en: "Learn about the basics of UND and how it can help you.", 
      de: "Erfahren Sie mehr über die Grundlagen von UND und wie es Ihnen helfen kann." 
    },
    thumbnail: "https://placehold.co/640x360/333/white?text=Introduction",
    url: "https://example.com/video1",
    duration: "3:45"
  },
  {
    id: "vid2",
    title: { en: "How to Find a Job", de: "Wie man einen Job findet" },
    description: { 
      en: "Step by step guide to finding employment in Germany.", 
      de: "Schritt-für-Schritt-Anleitung zur Jobsuche in Deutschland." 
    },
    thumbnail: "https://placehold.co/640x360/444/white?text=Job+Search",
    url: "https://example.com/video2",
    duration: "5:12"
  },
  {
    id: "vid3",
    title: { en: "Understanding Healthcare", de: "Gesundheitsversorgung verstehen" },
    description: { 
      en: "Overview of the German healthcare system.", 
      de: "Überblick über das deutsche Gesundheitssystem." 
    },
    thumbnail: "https://placehold.co/640x360/555/white?text=Healthcare",
    url: "https://example.com/video3",
    duration: "4:30"
  },
  {
    id: "vid4",
    title: { en: "Learning German", de: "Deutsch lernen" },
    description: { 
      en: "Tips and resources for learning the German language.", 
      de: "Tipps und Ressourcen zum Erlernen der deutschen Sprache." 
    },
    thumbnail: "https://placehold.co/640x360/666/white?text=German+Language",
    url: "https://example.com/video4",
    duration: "6:15"
  },
  {
    id: "vid5",
    title: { en: "Housing in Germany", de: "Wohnen in Deutschland" },
    description: { 
      en: "How to find accommodation and understand rental contracts.", 
      de: "Wie man eine Unterkunft findet und Mietverträge versteht." 
    },
    thumbnail: "https://placehold.co/640x360/777/white?text=Housing",
    url: "https://example.com/video5",
    duration: "5:45"
  }
];

const Videos: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const filtered = mockVideos.filter(video => 
        video.title[language.code === 'de' ? 'de' : 'en'].toLowerCase().includes(searchInput.toLowerCase()) || 
        video.description[language.code === 'de' ? 'de' : 'en'].toLowerCase().includes(searchInput.toLowerCase())
      );
      setVideos(filtered.length ? filtered : mockVideos);
      console.log('Search query:', searchInput);
    } else {
      setVideos(mockVideos);
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // Sound toggle logic would be implemented here
  };

  const playVideo = (video: Video) => {
    setSelectedVideo(video);
    console.log('Playing video:', video.id);
  };

  const helpContent = (
    <div>
      {language.code === 'de' 
        ? 'Diese Seite enthält informative Videos zu verschiedenen Themen, die Ihnen bei der Integration helfen können.' 
        : 'This page contains informative videos on various topics that can help you with integration.'}
    </div>
  );

  return (
    <div 
      className="min-h-screen p-4 md:p-8"
      dir={language.rtl ? 'rtl' : 'ltr'}
    >
      <PageNavigation 
        toggleSound={toggleSound} 
        soundEnabled={soundEnabled} 
        helpContent={helpContent}
      />
      
      <h1 className="text-3xl font-bold mb-6">
        {language.code === 'de' ? 'Videos' : 'Videos'}
      </h1>
      
      <form onSubmit={handleSearch} className="flex w-full gap-2 mb-8 max-w-3xl">
        <Input
          type="text"
          placeholder={language.code === 'de' ? 'Videos suchen...' : 'Search videos...'}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </form>
      
      <ScrollArea className="h-[60vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-video bg-gray-200 overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={language.code === 'de' ? video.title.de : video.title.en} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100"
                    onClick={() => playVideo(video)}
                  >
                    <PlaySquare className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">
                  {language.code === 'de' ? video.title.de : video.title.en}
                </h3>
                <p className="text-sm text-gray-600">
                  {language.code === 'de' ? video.description.de : video.description.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Videos;
