import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable, Platform, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import * as Speech from 'expo-speech';
import Slider from '@react-native-community/slider';
import HelpModal from './HelpModal';

interface Step {
  id: string;
  number: number;
  title: string;
  route: string;
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

export default function StepPageTemplate({
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
  
  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [usingTTS, setUsingTTS] = useState(false);
  const player = useAudioPlayer(audioSource);

  const isWeb = Platform.OS === 'web';

  // Update audio player progress
  useEffect(() => {
    if (!audioSource) return;
    
    const interval = setInterval(() => {
      if (player.playing) {
        setCurrentTime(player.currentTime);
        setDuration(player.duration);
        setIsPlaying(true);
      } else if (isPlaying) {
        setIsPlaying(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [player, audioSource, isPlaying]);

  // Apply volume changes
  useEffect(() => {
    if (audioSource && player) {
      player.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted, audioSource, player]);

  const handleStepPress = (step: Step) => {
    setCompletedSteps(prev => new Set(prev).add(step.id));
    router.push(step.route);
  };

  const togglePlayPause = async () => {
    try {
      if (!audioSource) {
        // Using TTS
        setUsingTTS(true);
        if (isPlaying) {
          Speech.stop();
          setIsPlaying(false);
          setCurrentTime(0);
        } else {
          Speech.speak(audioText, {
            volume: isMuted ? 0 : volume / 100,
            onDone: () => {
              setIsPlaying(false);
              setCurrentTime(0);
            },
            onStopped: () => {
              setIsPlaying(false);
            }
          });
          setIsPlaying(true);
          // Simulate duration for TTS (estimate)
          setDuration(audioText.length * 0.05); // Rough estimate
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
    setIsMuted(!isMuted);
    if (audioSource && player) {
      player.volume = !isMuted ? 0 : volume / 100;
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (audioSource && player) {
      player.volume = isMuted ? 0 : value / 100;
    }
  };

  const replay = () => {
    if (audioSource && player) {
      player.seekTo(0);
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
                  <MaterialIcons name="check" size={24} color="#10B981" />
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
              
              <View style={styles.stepsBox}>
                {steps.map((step) => (
                  <Pressable
                    key={step.id}
                    style={styles.stepItem}
                    onPress={() => handleStepPress(step)}
                  >
                    <Text style={styles.stepNumber}>{step.number}</Text>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    {completedSteps.has(step.id) && (
                      <MaterialIcons 
                        name="check" 
                        size={32} 
                        color="#10B981" 
                        style={styles.checkmark}
                      />
                    )}
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Footer spanning entire page */}
        <View style={styles.footerContainer}>
          {/* Bottom navigation bar */}
          <View style={styles.bottomNav}>
            <Pressable 
              style={styles.bottomNavButton}
              onPress={() => setShowHelp(true)}
            >
              <MaterialIcons name="help-outline" size={28} color="#fff" />
            </Pressable>
            <View style={{ flex: 1 }} />
            <Pressable 
              style={styles.bottomNavButton}
              onPress={() => router.back()}
            >
              <MaterialIcons name="arrow-back" size={28} color="#fff" />
            </Pressable>
          </View>

          {/* Audio player */}
          <View style={styles.audioPlayer}>
            <Pressable onPress={togglePlayPause} style={styles.audioButton}>
              <MaterialIcons 
                name={isPlaying ? "pause" : "play-arrow"} 
                size={28} 
                color="#333" 
              />
            </Pressable>

            <View style={styles.progressContainer}>
              <View style={styles.timeDisplay}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[styles.progressFill, { 
                    width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' 
                  }]} 
                />
              </View>
            </View>

            <Pressable onPress={replay} style={styles.audioButton}>
              <MaterialIcons name="replay" size={24} color="#333" />
            </Pressable>

            <View style={styles.volumeContainer}>
              <Pressable onPress={toggleMute} style={styles.audioButton}>
                <MaterialIcons 
                  name={isMuted ? "volume-off" : "volume-up"} 
                  size={24} 
                  color="#333" 
                />
              </Pressable>
              <Slider
                style={styles.volumeSlider}
                minimumValue={0}
                maximumValue={100}
                value={volume}
                onValueChange={handleVolumeChange}
                minimumTrackTintColor="#3b82f6"
                maximumTrackTintColor="#e5e7eb"
                thumbTintColor="#3b82f6"
                disabled={isMuted}
              />
              <Text style={styles.volumeText}>{Math.round(volume)}</Text>
            </View>
          </View>
        </View>
      </View>

      <HelpModal
        visible={showHelp}
        onClose={() => setShowHelp(false)}
        content={tutorialContent || t('tutorial', { defaultValue: 'Tutorial content' })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: "#fff" 
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
    height: 80,
    zIndex: 10,
    width: "50%",
  },
  homeIconBox: {
    width: 80,
    height: 80,
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
    clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    zIndex: 5,
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
    gap: 12,
    backdropFilter: "blur(8px)",
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(156, 163, 175, 0.9)",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 16,
  },
  stepNumber: {
    fontSize: 24,
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
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#1f2937",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  bottomNavButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  audioPlayer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  audioButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    flex: 1,
    gap: 4,
  },
  timeDisplay: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  timeText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 3,
  },
  volumeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  volumeSlider: {
    width: 120,
    height: 40,
  },
  volumeText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
    width: 30,
    textAlign: "right",
  },
});
