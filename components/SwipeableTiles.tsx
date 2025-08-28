import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import CategoryCard from './CategoryCard';

interface SwipeableTilesProps {
  topics: Array<{
    key: string;
    icon: string;
    color: string;
    route: string;
  }>;
  onTilePress: (route: string) => void;
  onTileLongPress: (text: string) => void;
  getText: (key: string) => string;
  containerStyle?: any;
}

const SwipeableTiles: React.FC<SwipeableTilesProps> = ({
  topics,
  onTilePress,
  onTileLongPress,
  getText,
  containerStyle,
}) => {
  const { width } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate how many tiles fit on screen (3 on mobile, more on larger screens)
  const tilesPerView = width < 600 ? 3 : width < 900 ? 4 : 5;
  const tileWidth = (width - 80) / tilesPerView; // Account for padding and gaps
  const maxIndex = Math.max(0, topics.length - tilesPerView);

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current && index >= 0 && index <= maxIndex) {
      const scrollX = index * tileWidth;
      scrollViewRef.current.scrollTo({ x: scrollX, animated: true });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    scrollToIndex(Math.max(0, currentIndex - 1));
  };

  const scrollRight = () => {
    scrollToIndex(Math.min(maxIndex, currentIndex + 1));
  };

  const renderTile = (topic: any) => {
    const title = getText(`topics.${topic.key}.title`);
    const subtitle = getText(`topics.${topic.key}.subtitle`);
    
    return (
      <View key={topic.key} style={[styles.tileContainer, { width: tileWidth }]}>
        <Pressable
          onPress={() => onTilePress(topic.route)}
          onLongPress={() => onTileLongPress(`${title}. ${subtitle}`)}
          style={styles.tileWrapper}
          accessibilityRole="button"
          accessibilityLabel={`${title}. ${subtitle}`}
        >
          <CategoryCard
            title={title}
            subtitle={subtitle}
            icon={topic.icon}
            color={topic.color}
            onPress={() => onTilePress(topic.route)}
            onLongPress={() => onTileLongPress(`${title}. ${subtitle}`)}
            padding={12}
            width={tileWidth - 20}
            columns={1}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Navigation arrows */}
      <View style={styles.navigationContainer}>
        <Pressable
          style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
          onPress={scrollLeft}
          disabled={currentIndex === 0}
        >
          <Text style={[styles.navButtonText, currentIndex === 0 && styles.navButtonTextDisabled]}>
            ‹
          </Text>
        </Pressable>

        <View style={styles.scrollContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={tileWidth}
            snapToAlignment="start"
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(event.nativeEvent.contentOffset.x / tileWidth);
              setCurrentIndex(Math.max(0, Math.min(maxIndex, newIndex)));
            }}
          >
            {topics.map(renderTile)}
          </ScrollView>
        </View>

        <Pressable
          style={[styles.navButton, currentIndex === maxIndex && styles.navButtonDisabled]}
          onPress={scrollRight}
          disabled={currentIndex === maxIndex}
        >
          <Text style={[styles.navButtonText, currentIndex === maxIndex && styles.navButtonTextDisabled]}>
            ›
          </Text>
        </Pressable>
      </View>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBF4FF',
    borderRadius: 16,
    padding: 24,
    paddingVertical: 32,
    marginVertical: 16,
    minHeight: 280,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  navButtonTextDisabled: {
    color: '#9CA3AF',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  tileContainer: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3B82F6',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 180,
    maxHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  paginationDotActive: {
    backgroundColor: '#3B82F6',
    width: 20,
  },
});

export default SwipeableTiles;