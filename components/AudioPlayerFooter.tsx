import React, { useState, useEffect} from "react";
import { View, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

// https://ttsmaker.com
// https://www.kurdishtts.com

interface AudioPlayerFooterProps {
  player: any;
  status: any;
}

export default function AudioPlayerFooter({
  player,
  status,
}: AudioPlayerFooterProps) {

  const [isSeeking, setIsSeeking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Apply volume changes immediately
  useEffect(() => {
    player.volume = isMuted ? 0 : 1;
  }, [isMuted, player]);

  const togglePlayPause = async () => {
    try {
      // Using audio file
      if (status.playing) {
        player.pause();
      } else {
        player.play();
      }
    } catch (error) {
      console.error('Error toggling audio:', error);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    player.volume = newMuted ? 1. : 0.;
  };

  const replay = () => {
    player.seekTo(0);
    player.play();
  };

  const handleSeek = (value: number) => {
    setIsSeeking(true);
  };

  const handleSeekComplete = (value: number) => {
    player.seekTo(value);
    setIsSeeking(false);

    // If we were playing before seeking, continue playing
    if (status.playing) {
      player.play();
    }
  };

  return (
    <View style={styles.audioPlayer}>
      <Pressable onPress={togglePlayPause} style={styles.audioButton}>
        <MaterialIcons
          name={status.playing ? "pause" : "play-arrow"}
          size={28}
          color="#333"
        />
      </Pressable>

      <Pressable onPress={replay} style={styles.audioButton}>
        <MaterialIcons name="replay" size={24} color="#333" />
      </Pressable>

      <View style={styles.progressContainer}>
        <Slider
          style={styles.progressSlider}
          minimumValue={0}
          maximumValue={status.duration - 1 || 1}
          value={status.currentTime}
          onValueChange={handleSeek}
          onSlidingComplete={handleSeekComplete}
          minimumTrackTintColor="#333"
          maximumTrackTintColor="#e5e7eb"
          thumbTintColor="#333"
        />
      </View>

      <Pressable onPress={toggleMute} style={styles.audioButton}>
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
    paddingVertical: 20,
    gap: 16,
    borderTopWidth: 0,
    borderTopColor: "#e5e7eb",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  audioButton: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    flex: 1,
  },
  progressSlider: {
    width: '100%',
    height: 20,
  },
});
