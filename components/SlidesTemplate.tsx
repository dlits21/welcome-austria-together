import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable, Platform, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import * as Speech from 'expo-speech';
import HelpModal from './HelpModal';
import PageNavigation from './PageNavigation';
import AudioPlayerFooter from './AudioPlayerFooter';
import LanguageModal from '../components/LanguageModal';
import VirtualAssistantModal from '../components/VirtualAssistantModal';
import TutorialModal from '../components/TutorialModal';


interface SlideContent {
  number: number;
  text: string;
}

interface Step {
  id: string;
  number: number;
  title: string;
  route: string;
  navigationType?: 'route' | 'slides';
  slideData?: {
    subtitle: string;
    imagePath: any;
    imagePosition?: 'left' | 'right';
    slideContent: SlideContent[];
  };
}

interface Props {
  translationNamespace: string;
  title: string;
  helperText: string;
  steps: Step[];
  imagePath?: any;
  homePath: string;
  audioText: string;
  audioSource?: any;
  tutorialContent?: string;
  colorPalette?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  badgeText?: string;
}

export default function SlidesTemplate({
  translationNamespace,
  title,
  helperText,
  steps,
  imagePath,
  homePath,
  audioText,
  audioSource,
  tutorialContent,
  colorPalette = {
    primary: '#7c3aed',
    secondary: '#a78bfa',
    accent: '#c4b5fd'
  },
  badgeText = 'M1'
}: Props) {
  const { t, i18n } = useTranslation(translationNamespace);
  const router = useRouter();
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [showHelp, setShowHelp] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

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
        // Audio finished playing
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    // Clear existing interval
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    // Set up new interval
    progressInterval.current = setInterval(updateProgress, 100);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [player, audioSource, isPlaying, isSeeking]);

  // Initialize duration when audio source loads
  useEffect(() => {
    if (audioSource && player) {
      setDuration(player.duration || 0);
    }
  }, [audioSource, player]);

  // Apply volume changes immediately
  useEffect(() => {
    if (audioSource && player) {
      player.volume = isMuted ? 0 : 1;
    }
  }, [isMuted, audioSource, player]);

  const handleStepPress = (step: Step) => {
    setCompletedSteps(prev => new Set(prev).add(step.id));
    
    if (step.navigationType === 'slides' && step.slideData) {
      // Navigate to slides view with data passed as route params
      router.push({
        pathname: '/slides-information',
        params: {
          stepNumber: step.number,
          title: step.title,
          subtitle: step.slideData.subtitle,
          imagePath: step.slideData.imagePath,
          imagePosition: step.slideData.imagePosition || 'right',
          slideContent: JSON.stringify(step.slideData.slideContent),
          helperText: helperText,
          translationNamespace: translationNamespace,
          colorPalette: JSON.stringify(colorPalette),
          badgeText: badgeText
        }
      });
    } else {
      // Default route navigation
      router.push(step.route);
    }
  };

  const togglePlayPause = async () => {
    try {
      if (!audioSource) {
        // Using TTS
        setUsingTTS(true);
        if (isPlaying) {
          Speech.stop();
          setIsPlaying(false);
        } else {
          Speech.speak(audioText, {
            volume: isMuted ? 0 : 1,
            onDone: () => {
              setIsPlaying(false);
              setCurrentTime(0);
            },
            onStopped: () => {
              setIsPlaying(false);
            }
          });
          setIsPlaying(true);
          // Simulate duration for TTS (estimate based on word count)
          const wordCount = audioText.split(' ').length;
          setDuration(wordCount * 0.5); // Rough estimate: 0.5 seconds per word

          // Simulate progress for TTS
          let simulatedTime = 0;
          const ttsInterval = setInterval(() => {
            if (isPlaying) {
              simulatedTime += 0.1;
              setCurrentTime(simulatedTime);
              if (simulatedTime >= wordCount * 0.5) {
                clearInterval(ttsInterval);
                setIsPlaying(false);
                setCurrentTime(0);
              }
            } else {
              clearInterval(ttsInterval);
            }
          }, 100);
        }
      } else {
        // Using audio file
        setUsingTTS(false);
        if (player.playing) {
          player.pause();
          setIsPlaying(false);
        } else {
          player.play();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error toggling audio:', error);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (audioSource && player) {
      player.volume = newMuted ? 0 : 1;
    } else if (usingTTS && isPlaying) {
      // For TTS, we need to stop and restart with new volume
      Speech.stop();
      setIsPlaying(false);
      // Restart with new volume after a brief delay
      setTimeout(() => {
        Speech.speak(audioText, {
          volume: newMuted ? 0 : 1,
          onDone: () => {
            setIsPlaying(false);
            setCurrentTime(0);
          },
          onStopped: () => {
            setIsPlaying(false);
          }
        });
        setIsPlaying(true);
      }, 100);
    }
  };

  const replay = () => {
    if (audioSource && player) {
      player.seekTo(0);
      setCurrentTime(0);
      player.play();
      setIsPlaying(true);
    } else {
      // Restart TTS
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
    // Note: TTS doesn't support seeking, so we don't handle that case
  };

  const handleSeekComplete = (value: number) => {
    if (audioSource && player) {
      player.seekTo(value);
      setCurrentTime(value);
      setIsSeeking(false);

      // If we were playing before seeking, continue playing
      if (isPlaying) {
        player.play();
      }
    }
    // Note: TTS doesn't support seeking, so we don't handle that case
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isWeb) {
    // Mobile fallback - simple list view
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.mobileContainer}>
          <Text style={styles.mobileTitle}>{title}</Text>
          {steps.map((step) => (
            <Pressable
              key={step.id}
              style={styles.mobileStepCard}
              onPress={() => handleStepPress(step)}
            >
              <View style={styles.mobileStepHeader}>
                <Text style={styles.mobileStepNumber}>{step.number}</Text>
                <Text style={styles.mobileStepTitle}>{step.title}</Text>
                {completedSteps.has(step.id) && (
                  <MaterialIcons name="check" size={24} color="#1f2937" />
                )}
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Web layout matching the image
  return (
    <SafeAreaView style={styles.safe}>
      {/* Page Navigation */}
      <PageNavigation
        showLanguageModal={() => {}}
        showVirtualAssistant={() => {}}
        showTutorial={() => setShowHelp(true)}
        showBackButton={true}
        title={title}
      />

      <View style={styles.outerContainer}>
        {/* Main content wrapper with white background */}
        <View style={styles.contentWrapper}>
          <View style={styles.webContainer}>
            {/* Background Image - using imagePath */}
            <Image
              source={imagePath}
              style={styles.backgroundImage}
              resizeMode="cover"
            />

            {/* Header with custom shape - only 50% width */}
            <View style={styles.headerContainer}>
              <View style={[styles.homeIconBox, { backgroundColor: colorPalette.accent }]}>
                <Pressable
                  style={styles.homeButton}
                  onPress={() => router.push(homePath)}
                >
                  <MaterialIcons name="home" size={32} color="#fff" />
                </Pressable>
              </View>
              <View style={[styles.headerMain, { backgroundColor: colorPalette.primary }]}>
                <Text style={styles.headerTitle}>{title}</Text>
              </View>
            </View>

            <View style={styles.contentContainer}>
              {/* Steps panel */}
              <View style={styles.leftPanel}>
                <ScrollView contentContainerStyle={styles.stepsContainer}>
                  <View style={styles.helperTextBox}>
                    <Text style={styles.helperText}>{helperText}</Text>
                  </View>

                  <View style={[styles.stepsBox, steps.length > 5 && styles.stepsBoxTwoColumn]}>
                    {steps.map((step) => (
                      <Pressable
                        key={step.id}
                        style={[styles.stepItem, steps.length > 5 && styles.stepItemTwoColumn]}
                        onPress={() => handleStepPress(step)}
                      >
                        <Text style={styles.stepNumber}>{step.number}</Text>
                        <Text style={styles.stepTitle}>{step.title}</Text>
                        {completedSteps.has(step.id) && (
                          <MaterialIcons
                            name="check"
                            size={32}
                            color="#1f2937"
                            style={styles.checkmark}
                          />
                        )}
                      </Pressable>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>

            {/* Footer navigation bar */}
            <View style={styles.footerContainer}>
              <View style={styles.bottomNav}>
                <Pressable
                  style={styles.bottomNavButton}
                  onPress={() => setShowHelp(true)}
                >
                  <MaterialIcons name="help-outline" size={28} color="#fff" />
                </Pressable>
                <View style={{ flex: 1 }} />
                <Pressable
                  style={[styles.bottomNavButton, styles.backButton]}
                  onPress={() => router.back()}
                >
                  <MaterialIcons name="arrow-back" size={28} color="#fff" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* Audio player spanning full width - outside content wrapper */}
        <AudioPlayerFooter
          isPlaying={isPlaying}
          isMuted={isMuted}
          currentTime={currentTime}
          duration={duration}
          usingTTS={usingTTS}
          onTogglePlayPause={togglePlayPause}
          onReplay={replay}
          onToggleMute={toggleMute}
          onSeek={handleSeek}
          onSeekComplete={handleSeekComplete}
        />
      </View>

      <HelpModal
        visible={showHelp}
        onClose={() => setShowHelp(false)}
        content={tutorialContent || t('tutorial', { defaultValue: 'Tutorial content' })}
      />

      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />

      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        tutorialData="ask"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff"
  },
  pageNavigation: {
    flex: 1,
    alignItems: "center",
    width: "95%",
  },
  outerContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center'
  },

  // Mobile styles
  mobileContainer: {
    padding: 16
  },
  mobileTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center"
  },
  mobileStepCard: {
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  mobileStepHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  mobileStepNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    width: 32,
  },
  mobileStepTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    color: "#1f2937"
  },

  // Web layout styles
  webContainer: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    width: "95%",
    alignItems: "left"
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    height: 60,
    zIndex: 10,
    width: "50%",
  },
  homeIconBox: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  homeButton: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  headerMain: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 24,
    clipPath: "polygon(0 0, 90% 0, 85% 100%, 0% 100%)",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    zIndex: 5,
    marginBottom: 60, // Space for bottom navigation bar
  },
  leftPanel: {
    width: "50%",
    backgroundColor: "transparent",
  },
  stepsContainer: {
    padding: 32,
  },
  helperTextBox: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    backdropFilter: "blur(8px)",
  },
  helperText: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#ef4444",
    fontWeight: "600",
  },
  stepsBox: {
    backgroundColor: "rgba(229, 231, 235, 0.85)",
    borderRadius: 12,
    padding: 16,
    gap: 8,
    backdropFilter: "blur(8px)",
  },
  stepsBoxTwoColumn: {
    flexDirection: "column",
    flexWrap: "wrap",
    maxHeight: 360,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(156, 163, 175, 0.9)",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 16,
  },
  stepItemTwoColumn: {
    width: "48%",
  },
  stepNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2937",
    width: 32,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
  },
  checkmark: {
    marginLeft: "auto",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: 108,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#1f2937",
    paddingHorizontal: 24,
    paddingVertical: 10,
    alignItems: "center",
  },
  bottomNavButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginRight: 100, // Space from left edge for forward navigation arrow
  },
});