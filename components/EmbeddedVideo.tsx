import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Dimensions,
} from "react-native";
import { useEvent } from 'expo';
import YoutubePlayer from "react-native-youtube-iframe";
import { asyl_process } from './Video/videoSources';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useTranslation } from "react-i18next";

const EmbeddedVideo: React.FC<{videoId: string}> = ({videoId}) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const width = Math.min(Dimensions.get("window").width * 0.9, 840);
  const height = Math.floor(width * (9 / 16));
  const [playing, setPlaying] = useState(false);
  const videoIds = videoId.split('.');
  const isYoutube = videoIds[0] == 'youtube';
  const isLocal = videoIds[0] == 'local';

  const videoSources: {[key: string]: {[key: string]: string}} = {
    "asyl_process": {
      "de": 'https://integrationsbox.at/GV/images/Videos/DE/asyl_recht/DE_Asylverfahren.mp4',
      "en": 'https://integrationsbox.at/GV/images/Videos/EN/asyl_recht/EN_Asylverfahren.mp4',
    },
    "frauenrechte": {
      "de": 'https://integrationsbox.at/GV/images/Videos/DE/asyl_recht/DE_Frauenrechte.mp4',
      "en": 'https://integrationsbox.at/GV/images/Videos/EN/asyl_recht/EN_Frauenrechte.mp4',
    }
  }

  const videoKey = videoIds[1]
  const sourceEntry = videoSources[videoKey];
  const videoSource = sourceEntry ? (sourceEntry[currentLanguage] || sourceEntry['de']) : null;

  const videoKey = videoIds[1]
  const sourceEntry = videoSources[videoKey];
  const videoSource = sourceEntry ? (sourceEntry[currentLanguage] || sourceEntry['de']) : null;

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <View style={styles.videoWrap}>
    {isYoutube && (
      <YoutubePlayer width={width} height={height} play={playing} videoId={videoIds[1]} />
    )}

    {isLocal && videoSource && (
      <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
    )}
    </View>
  );
};

const styles = StyleSheet.create({

    videoWrap: { alignItems: "center", marginBottom: 12 },
    video: {
      width: 350,
      height: 640,
    },

});

export default EmbeddedVideo;