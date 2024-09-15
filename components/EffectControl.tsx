import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

interface EffectControlProps {
  name: string;
  volume: number;
  isActive: boolean;
  onToggle: () => void;
  onVolumeChange: (value: number) => void;
  playSound: () => void;
  stopSound: () => void;
}

export const EffectControl: React.FC<EffectControlProps> = ({
  name,
  volume,
  isActive,
  onToggle,
  onVolumeChange,
  playSound,
  stopSound,
}) => {
  const handleToggle = async () => {
    if (isActive) {
      await stopSound();
    } else {
      await playSound();
    }
    onToggle();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isActive && styles.activeButton]}
        onPress={handleToggle}
      >
        <Text style={styles.buttonText}>{name}</Text>
      </TouchableOpacity>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        onValueChange={onVolumeChange}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#000000"
      />
      <TouchableOpacity onPress={handleToggle}>
        <Text style={styles.playStopButton}>{isActive ? 'Stop' : 'Play'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'black',
  },
  slider: {
    flex: 1,
  },
  playStopButton: {
    marginLeft: 10,
    color: 'blue',
  },
});
