
import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  languageCode: string;
  selectedLevels: string[];
  selectedLocations: string[];
  onlineOnly: boolean;
  freeOnly: boolean;
  locations: string[];
  onToggleLevel: (level: string) => void;
  onToggleLocation: (location: string) => void;
  onToggleOnlineOnly: () => void;
  onToggleFreeOnly: () => void;
  onClearFilters: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  languageCode,
  selectedLevels,
  selectedLocations,
  onlineOnly,
  freeOnly,
  locations,
  onToggleLevel,
  onToggleLocation,
  onToggleOnlineOnly,
  onToggleFreeOnly,
  onClearFilters,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {languageCode === 'de' ? 'Filter' : 'Filters'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.filterScrollView}>
            {/* Level filters */}
            <Text style={styles.filterSectionTitle}>
              {languageCode === 'de' ? 'Niveau' : 'Level'}
            </Text>
            {['A0', 'A1', 'A2', 'B1', 'B2', 'C1'].map(level => (
              <TouchableOpacity 
                key={level}
                style={styles.checkboxRow} 
                onPress={() => onToggleLevel(level)}
              >
                <View style={[styles.checkbox, selectedLevels.includes(level) && styles.checkboxChecked]}>
                  {selectedLevels.includes(level) && (
                    <MaterialIcons name="check" size={16} color="#fff" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>{level}</Text>
              </TouchableOpacity>
            ))}

            {/* Location filters */}
            <Text style={styles.filterSectionTitle}>
              {languageCode === 'de' ? 'Standort' : 'Location'}
            </Text>
            {locations.map(location => (
              <TouchableOpacity 
                key={location}
                style={styles.checkboxRow} 
                onPress={() => onToggleLocation(location)}
              >
                <View style={[styles.checkbox, selectedLocations.includes(location) && styles.checkboxChecked]}>
                  {selectedLocations.includes(location) && (
                    <MaterialIcons name="check" size={16} color="#fff" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>{location}</Text>
              </TouchableOpacity>
            ))}

            {/* Additional filters */}
            <Text style={styles.filterSectionTitle}>
              {languageCode === 'de' ? 'Weitere Filter' : 'Additional Filters'}
            </Text>
            
            <TouchableOpacity style={styles.checkboxRow} onPress={onToggleOnlineOnly}>
              <View style={[styles.checkbox, onlineOnly && styles.checkboxChecked]}>
                {onlineOnly && <MaterialIcons name="check" size={16} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>
                {languageCode === 'de' ? 'Nur online' : 'Online only'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.checkboxRow} onPress={onToggleFreeOnly}>
              <View style={[styles.checkbox, freeOnly && styles.checkboxChecked]}>
                {freeOnly && <MaterialIcons name="check" size={16} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>
                {languageCode === 'de' ? 'Nur kostenlos' : 'Free only'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.clearButton} onPress={onClearFilters}>
              <Text style={styles.clearButtonText}>
                {languageCode === 'de' ? 'Zurücksetzen' : 'Clear'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={onClose}>
              <Text style={styles.applyButtonText}>
                {languageCode === 'de' ? 'Anwenden' : 'Apply'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterScrollView: {
    padding: 16,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#0f172a',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#334155',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    marginRight: 8,
  },
  clearButtonText: {
    color: '#64748b',
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default FilterModal;
