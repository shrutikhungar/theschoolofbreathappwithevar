import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

interface FrequencyControlProps {
  name: string;
  volume: number;
  isActive: boolean;
  onToggle: () => void;
  onVolumeChange: (value: number) => void;
  playSound: () => void;
  stopSound: () => void;
}

export const FrequencyControl: React.FC<FrequencyControlProps> = ({
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
    paddingHorizontal: 5, // Reduce padding for a smaller container
    paddingVertical: 5,   // Reduce vertical padding
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#ddd',
    padding: 8, // Smaller padding
    borderRadius: 15,
    marginRight: 5,
    minWidth: 60, // Smaller minimum width
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'black',
    fontSize: 12, // Smaller font size
  },
  slider: {
    flex: 1,
    marginHorizontal: 5, // Reduce horizontal margin
  },
  playStopButton: {
    marginLeft: 5, // Reduce margin between slider and button
    color: 'blue',
    fontSize: 12, // Smaller font size
  },
});
