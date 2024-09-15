import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useAudioEffects } from '../../context/AudioEffectsContext';
import { modalStyles } from '../../styles/modal.styles';
import { EFFECT_SOUNDS } from '../../data/__mock__';

type EffectsModalProps = {
  visible: boolean;
  onClose: () => void;
};

export const EffectsModal: React.FC<EffectsModalProps> = ({ visible, onClose }) => {
  const {
    activeEffects,
    effectVolumes,
    toggleEffect,
    changeEffectVolume,
  } = useAudioEffects();

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContainer}>
          <Text style={modalStyles.modalTitle}>Effects</Text>
          {Object.keys(effectVolumes).map((effectName,key) => (
            <View key={effectName} style={modalStyles.modalItem}>
              <Text style={styles.effectText}>{EFFECT_SOUNDS[key].icon}{effectName}</Text>
              <View style={styles.controlRow}>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={effectVolumes[effectName]}
                  onValueChange={(value) => changeEffectVolume(effectName, value)}
                  minimumTrackTintColor="#695786" // Updated color
                  maximumTrackTintColor="#ddd"
                  thumbTintColor="#695786" // Updated color
                />
                <TouchableOpacity onPress={() => toggleEffect(effectName)}>
                  <Ionicons
                    name={activeEffects.includes(effectName) ? "volume-high" : "volume-mute"}
                    size={24}
                    color={activeEffects.includes(effectName) ? "#695786" : "#888"} // Updated color
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
  
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  effectText: {
    fontSize: 14,
    color: 'black',
    
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