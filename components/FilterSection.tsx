
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
}

const FilterSection: React.FC<FilterSectionProps> = ({
  visible,
  title,
  languageCode,
  filterGroups,
  additionalFilters,
  onClearFilters
}) => {
  if (!visible) return null;

  return (
    <View style={styles.filterSection}>
      <Text style={styles.filterSectionTitle}>{title}</Text>
      
      {filterGroups.map((group, index) => (
        <View key={index}>
          <Text style={styles.filterGroupTitle}>{group.title}</Text>
          <View style={styles.filterChips}>
            {group.items.map(item => (
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
                  {group.displayLabels?.[item] || item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {additionalFilters}

      <TouchableOpacity style={styles.clearFiltersButton} onPress={onClearFilters}>
        <Text style={styles.clearFiltersText}>
          {languageCode === 'de' ? 'Filter löschen' : 'Clear Filters'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterSection: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  filterGroupTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 12,
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
