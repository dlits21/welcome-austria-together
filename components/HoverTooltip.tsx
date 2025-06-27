
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
          left: Math.max(10, hoverPosition.x - 100), // Center tooltip around touch point
          top: hoverPosition.y - 60, // Show above the touch point
        }
      ]}
    >
      <Text style={styles.hoverText}>
        {hoverMessages[hoverLanguage.code] || hoverMessages.en}
      </Text>
      <View style={styles.tooltipArrow} />
    </View>
  );
};

const styles = StyleSheet.create({
  hoverTooltip: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 12,
    borderRadius: 8,
    maxWidth: 200,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hoverText: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    marginLeft: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(0,0,0,0.8)',
  },
});

export default HoverTooltip;
