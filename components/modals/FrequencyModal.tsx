import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useAudioEffects } from '../../context/AudioEffectsContext';

type FrequenciesModalProps = {
  visible: boolean;
  onClose: () => void;
};

export const FrequenciesModal: React.FC<FrequenciesModalProps> = ({ visible, onClose }) => {
  const {
    activeFrequencies,
    frequencyVolumes,
    toggleFrequency,
    changeFrequencyVolume,
  } = useAudioEffects();

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Frequencies</Text>
          {Object.keys(frequencyVolumes).map((freqName) => (
            <View key={freqName} style={styles.modalItem}>
              <Text style={styles.frequencyText}>{freqName}</Text>
              <View style={styles.controlRow}>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={frequencyVolumes[freqName]}
                  onValueChange={(value) => changeFrequencyVolume(freqName, value)}
                  minimumTrackTintColor="#695786" // Updated color
                  maximumTrackTintColor="#ddd"
                  thumbTintColor="#695786" // Updated color
                />
                <TouchableOpacity onPress={() => toggleFrequency(freqName)}>
                  <Ionicons
                    name={activeFrequencies.includes(freqName) ? "volume-high" : "volume-mute"}
                    size={24}
                    color={activeFrequencies.includes(freqName) ? "#695786" : "#888"} // Updated color
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns the modal at the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%', // Full width to align with the screen's bottom
    backgroundColor: '#e9dffc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#352c44',
  },
  modalItem: {
    marginBottom: 15,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  frequencyText: {
    fontSize: 14,
    color: '#352c44',
    
  },
  slider: {
    flex: 1,
    marginHorizontal: 5,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#352c44',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});