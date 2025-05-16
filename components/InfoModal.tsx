
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal 
} from 'react-native';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.infoModalView}>
          <Text style={styles.infoTitle}>Language Selection</Text>
          <Text style={styles.infoText}>
            Please select your preferred language. This app supports 12 languages
            to help you navigate easily in your native language. You can always
            change the language later from the settings menu.
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  infoModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    maxWidth: "80%",
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoText: {
    marginBottom: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default InfoModal;
