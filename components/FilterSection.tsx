import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getGlobalText, getAskLegalText } from '../utils/languageUtils';

interface FilterGroup {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
  displayLabels?: { [key: string]: string };
}

interface FilterSectionProps {
  visible: boolean;
  title: string;
  languageCode: string;
  filterGroups: FilterGroup[];
  additionalFilters?: React.ReactNode;
  onClearFilters: () => void;
  scrollable?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  visible,
  title,
  languageCode,
  filterGroups,
  additionalFilters,
  onClearFilters,
  scrollable = false
}) => {
  if (!visible) return null;

  const FilterContent = () => (
    <View style={styles.filterSection}>
      <Text style={styles.filterSectionTitle}>{title}</Text>
      
      {filterGroups.map((group, index) => (
        <View key={index}>
          <Text style={styles.filterGroupTitle}>{group.title}</Text>
          <View style={styles.filterChips}>
            {group.items.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.filterChip,
                  group.selectedItems.includes(item) && styles.activeFilterChip
                ]}
                onPress={() => group.onToggle(item)}
              >
                <Text style={[
                  styles.filterChipText,
                  group.selectedItems.includes(item) && styles.activeFilterChipText
                ]}>
                  {getAskLegalText(group.displayLabels?.[item], languageCode) || getGlobalText(item.replace(" ","").toLowerCase(), languageCode)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
      
      {additionalFilters}
      
      <TouchableOpacity
        style={styles.clearFiltersButton}
        onPress={onClearFilters}
      >
        <Text style={styles.clearFiltersText}>
          {getGlobalText('clearFilters', languageCode)}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView 
        style={styles.scrollableContainer}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
      >
        <FilterContent />
      </ScrollView>
    );
  }

  return <FilterContent />;
};

const styles = StyleSheet.create({
  scrollableContainer: {
    maxHeight: 400, // Increased from 300 to 400
    minHeight: 200, // Increased from 300 to 400
    marginBottom: 16,
  },
  filterSection: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    minHeight: 200, // Added minimum height to make it bigger
  },
  filterSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  filterGroupTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 4,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  filterChip: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilterChip: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterChipText: {
    fontSize: 12,
    color: '#64748b',
  },
  activeFilterChipText: {
    color: '#fff',
  },
  clearFiltersButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  clearFiltersText: {
    color: '#64748b',
    fontSize: 14,
  },
});

export default FilterSection;
