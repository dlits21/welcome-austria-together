
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HoverTooltipProps {
  hoverLanguage: any | null;
  hoverPosition: { x: number; y: number };
  hoverMessages: Record<string, string>;
}

const HoverTooltip: React.FC<HoverTooltipProps> = ({
  hoverLanguage,
  hoverPosition,
  hoverMessages
}) => {
  if (!hoverLanguage) return null;

  return (
    <View 
      style={[
        styles.hoverTooltip,
        {
          left: hoverPosition.x,
          top: hoverPosition.y,
        }
      ]}
    >
      <Text style={styles.hoverText}>
        {hoverMessages[hoverLanguage.code] || hoverMessages.en}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  hoverTooltip: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 5,
    maxWidth: 200,
    zIndex: 1000,
  },
  hoverText: {
    color: "#fff",
    fontSize: 12,
  },
});

export default HoverTooltip;
