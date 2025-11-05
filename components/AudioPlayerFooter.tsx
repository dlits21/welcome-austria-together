import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

interface AudioPlayerFooterProps {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  usingTTS: boolean;
  onTogglePlayPause: () => void;
  onReplay: () => void;
  onToggleMute: () => void;
  onSeek: (value: number) => void;
  onSeekComplete: (value: number) => void;
}

export default function AudioPlayerFooter({
  isPlaying,
  isMuted,
  currentTime,
  duration,
  usingTTS,
  onTogglePlayPause,
  onReplay,
  onToggleMute,
  onSeek,
  onSeekComplete,
}: AudioPlayerFooterProps) {
  return (
    <View style={styles.audioPlayer}>
      <Pressable onPress={onTogglePlayPause} style={styles.audioButton}>
        <MaterialIcons
          name={isPlaying ? "pause" : "play-arrow"}
          size={28}
          color="#333"
        />
      </Pressable>

      <Pressable onPress={onReplay} style={styles.audioButton}>
        <MaterialIcons name="replay" size={24} color="#333" />
      </Pressable>

      <View style={styles.progressContainer}>
        <Slider
          style={styles.progressSlider}
          minimumValue={0}
          maximumValue={duration || 1}
          value={currentTime}
          onValueChange={onSeek}
          onSlidingComplete={onSeekComplete}
          minimumTrackTintColor="#3b82f6"
          maximumTrackTintColor="#e5e7eb"
          thumbTintColor="#3b82f6"
          disabled={usingTTS}
        />
      </View>

      <Pressable onPress={onToggleMute} style={styles.audioButton}>
        <MaterialIcons
          name={isMuted ? "volume-off" : "volume-up"}
          size={24}
          color="#333"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  audioPlayer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 8,
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
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
  progressSlider: {
    width: '100%',
    height: 40,
  },
});
