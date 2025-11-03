import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable, Platform, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
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
  imagePath: any;
  homePath: string;
  audioText: string;
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
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleStepPress = (step: Step) => {
    setCompletedSteps(prev => new Set(prev).add(step.id));
    router.push(step.route);
  };

  const playAudio = async () => {
    // In a real implementation, you would generate or fetch audio based on audioText and language
    // For now, this is a placeholder implementation
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (sound) {
      sound.setVolumeAsync(isMuted ? 1.0 : 0.0);
    }
    setIsMuted(!isMuted);
  };

  const replay = () => {
    if (sound) {
      sound.replayAsync();
      setIsPlaying(true);
    }
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
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colorPalette.primary }]}>
          <Pressable 
            style={[styles.homeButton, { backgroundColor: colorPalette.accent }]}
            onPress={() => router.push(homePath)}
          >
            <MaterialIcons name="home" size={28} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Left side - Steps */}
          <View style={styles.leftPanel}>
            <ScrollView contentContainerStyle={styles.stepsContainer}>
              <Text style={styles.helperText}>{helperText}</Text>
              
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
                        color="#fff" 
                        style={styles.checkmark}
                      />
                    )}
                  </Pressable>
                ))}
              </View>
            </ScrollView>

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
              <Pressable onPress={playAudio} style={styles.audioButton}>
                <MaterialIcons 
                  name={isPlaying ? "pause" : "play-arrow"} 
                  size={24} 
                  color="#333" 
                />
              </Pressable>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[styles.progressFill, { width: `${progress}%` }]} 
                  />
                </View>
              </View>

              <Pressable onPress={replay} style={styles.audioButton}>
                <MaterialIcons name="replay" size={24} color="#333" />
              </Pressable>

              <Pressable onPress={toggleMute} style={styles.audioButton}>
                <MaterialIcons 
                  name={isMuted ? "volume-off" : "volume-up"} 
                  size={24} 
                  color="#333" 
                />
              </Pressable>
            </View>
          </View>

          {/* Right side - Image */}
          <View style={styles.rightPanel}>
            <Image 
              source={imagePath} 
              style={styles.mainImage}
              resizeMode="cover"
            />
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
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
  homeButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
  },
  badge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#581c87",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
  },
  leftPanel: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  stepsContainer: {
    padding: 32,
  },
  helperText: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#ef4444",
    marginBottom: 24,
  },
  stepsBox: {
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9ca3af",
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
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
  },
  progressBar: {
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
  },
  rightPanel: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
});
