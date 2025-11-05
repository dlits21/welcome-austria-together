import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable, Platform, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import * as Speech from 'expo-speech';
import HelpModal from './HelpModal';
import AudioPlayerFooter from './AudioPlayerFooter';

interface SlideContent {
  number: number;
  text: string;
}

interface Props {
  translationNamespace: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  imagePath: any;
  imagePosition?: 'left' | 'right';
  slideContent: SlideContent[];
  helperText: string;
  audioText: string;
  audioSource?: any;
  colorPalette?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  badgeText?: string;
  onBack?: () => void;
}

export default function SlidesInformation({
  translationNamespace,
  stepNumber,
  title,
  subtitle,
  imagePath,
  imagePosition = 'right',
  slideContent,
  helperText,
  audioText,
  audioSource,
  colorPalette = {
    primary: '#7c3aed',
    secondary: '#a78bfa',
    accent: '#c4b5fd'
  },
  badgeText = 'M2',
  onBack
}: Props) {
  const { t, i18n } = useTranslation(translationNamespace);
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [usingTTS, setUsingTTS] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const player = useAudioPlayer(audioSource);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const isWeb = Platform.OS === 'web';

  // Update audio player progress
  useEffect(() => {
    if (!audioSource) return;
    const updateProgress = () => {
      if (player.playing && !isSeeking) {
        setCurrentTime(player.currentTime || 0);
        setDuration(player.duration || 0);
        setIsPlaying(true);
      } else if (isPlaying && player.currentTime === 0 && !isSeeking) {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    progressInterval.current = setInterval(updateProgress, 100);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [audioSource, player]);

  // Apply volume changes immediately
  useEffect(() => {
    if (audioSource && player) {
      player.volume = isMuted ? 0 : 1;
    }
  }, [isMuted, audioSource, player]);

  const togglePlayPause = async () => {
    try {
      if (!audioSource) {
        setUsingTTS(true);
        if (isPlaying) {
          Speech.stop();
          setIsPlaying(false);
        } else {
          await Speech.speak(audioText, {
            language: i18n.language,
            onStart: () => setIsPlaying(true),
            onDone: () => setIsPlaying(false),
            onStopped: () => setIsPlaying(false)
          });
        }
      } else {
        if (player.playing) {
          player.pause();
          setIsPlaying(false);
        } else {
          player.play();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const replay = () => {
    if (audioSource && player) {
      player.seekTo(0);
      setCurrentTime(0);
      player.play();
      setIsPlaying(true);
    } else {
      Speech.stop();
      setCurrentTime(0);
      setIsPlaying(false);
      setTimeout(() => togglePlayPause(), 100);
    }
  };

  const handleSeek = (value: number) => {
    if (audioSource && player) {
      setIsSeeking(true);
      setCurrentTime(value);
    }
  };

  const handleSeekComplete = (value: number) => {
    if (audioSource && player) {
      player.seekTo(value);
      setCurrentTime(value);
      setIsSeeking(false);

      if (isPlaying) {
        player.play();
      }
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  // Mobile fallback
  if (!isWeb) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.mobileContainer}>
          <Text style={styles.mobileTitle}>{title}</Text>
          <Text style={styles.mobileSubtitle}>{subtitle}</Text>
          <Image source={imagePath} style={styles.mobileImage} resizeMode="cover" />
          <View style={styles.mobileContentList}>
            {slideContent.map((item) => (
              <View key={item.number} style={styles.mobileContentItem}>
                <Text style={styles.mobileContentNumber}>{item.number}</Text>
                <Text style={styles.mobileContentText}>{item.text}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colorPalette.primary }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.stepBadge, { backgroundColor: colorPalette.accent }]}>
            <Text style={styles.stepBadgeText}>{stepNumber}</Text>
          </View>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={[styles.subtitleBadge, { backgroundColor: colorPalette.secondary }]}>
            <Text style={styles.subtitleText}>{subtitle}</Text>
          </View>
        </View>
        <View style={[styles.badge, { backgroundColor: colorPalette.primary }]}>
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={[
          styles.splitContainer,
          imagePosition === 'left' && styles.splitContainerReverse
        ]}>
          {/* Content Side */}
          <View style={styles.contentSide}>
            <ScrollView 
              style={styles.contentScroll}
              contentContainerStyle={styles.contentScrollInner}
            >
              <Text style={styles.instructionText}>Click the numbers.</Text>
              <View style={styles.contentList}>
                {slideContent.map((item) => (
                  <Pressable 
                    key={item.number} 
                    style={styles.contentItem}
                  >
                    <View style={[styles.contentNumber, { backgroundColor: colorPalette.accent }]}>
                      <Text style={styles.contentNumberText}>{item.number}</Text>
                    </View>
                    <Text style={styles.contentText}>{item.text}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Image Side */}
          <View style={styles.imageSide}>
            <Image 
              source={imagePath} 
              style={styles.slideImage} 
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      {/* Footer with Helper and Navigation */}
      <View style={styles.footerContainer}>
        <Pressable 
          style={styles.backButton}
          onPress={handleBack}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <View style={styles.spacer} />
        <Pressable 
          style={styles.helpButton}
          onPress={() => setShowHelp(true)}
        >
          <MaterialIcons name="help-outline" size={24} color="#fff" />
        </Pressable>
      </View>

      {/* Audio Player Footer */}
      <AudioPlayerFooter
        isPlaying={isPlaying}
        isMuted={isMuted}
        currentTime={currentTime}
        duration={duration}
        usingTTS={usingTTS}
        onTogglePlayPause={togglePlayPause}
        onReplay={replay}
        onToggleMute={() => setIsMuted(!isMuted)}
        onSeek={handleSeek}
        onSeekComplete={handleSeekComplete}
      />

      {/* Help Modal */}
      <HelpModal
        isVisible={showHelp}
        onClose={() => setShowHelp(false)}
        content={helperText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  safe: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 20,
    height: 100,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  stepBadge: {
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
  },
  subtitleBadge: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  badge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  mainContent: {
    flex: 1,
    marginBottom: 114,
  },
  splitContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  splitContainerReverse: {
    flexDirection: 'row-reverse',
  },
  contentSide: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    padding: 40,
  },
  contentScroll: {
    flex: 1,
  },
  contentScrollInner: {
    gap: 24,
  },
  instructionText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#ef4444',
    marginBottom: 8,
  },
  contentList: {
    gap: 16,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  contentNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  contentNumberText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  contentText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#1f2937',
    paddingTop: 12,
  },
  imageSide: {
    flex: 1,
    backgroundColor: '#d1d5db',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    height: 54,
    backgroundColor: '#1f2937',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    flex: 1,
  },
  helpButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Mobile styles
  mobileContainer: {
    padding: 20,
    gap: 20,
  },
  mobileTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  mobileSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
  },
  mobileImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  mobileContentList: {
    gap: 16,
  },
  mobileContentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  mobileContentNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7c3aed',
  },
  mobileContentText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#1f2937',
  },
});
