import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Image, ImageBackground, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import { GestureDetector, GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAudio } from '../context/AudioContext';
import { useAudioEffects } from '../context/AudioEffectsContext';
import { EffectsModal } from '../components/modals/EffectsModal';
import { FrequenciesModal } from '../components/modals/FrequencyModal';
import { BUTTON_COLOR, DARK_COLOR, PURPLE_COLOR, PURPLE_COLOR_SOFT, playerStyles as styles } from '../styles/playerScreen.styles';

const SWIPE_THRESHOLD = 100;

const PlayerScreen = () => {
  const navigation = useNavigation();
  const { height, width } = Dimensions.get('window');

  // Detect if the device is a tablet
  const isTablet = width >= 768;

  const {
    currentTrack,
    isPlaying,
    mainVolume,
    playPause,
    nextTrack,
    previousTrack,
    setVolume,
    loading,
  } = useAudio();

  const {
    activeEffects,
    activeFrequencies,
    toggleEffect,
    toggleFrequency,
  } = useAudioEffects();

  const [effectsModalVisible, setEffectsModalVisible] = useState(false);
  const [frequenciesModalVisible, setFrequenciesModalVisible] = useState(false);

  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        runOnJS(previousTrack)();
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        runOnJS(nextTrack)();
      }
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const playerImageSource = isTablet
    ? require('../assets/MusicPlayerGifIpad.gif')
    : require('../assets/MusicPlayerGif.gif'); // Dynamically load based on device

  const playerImageBackSource = isTablet
    ? require('../assets/profileImageBackIpad.jpg')
    : require('../assets/profileImageBack.png'); // Dynamically load based on device

  return (
    <ImageBackground
      source={playerImageBackSource}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <GestureHandlerRootView style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#1DB954" />
          ) : (
            currentTrack && (
              <>
                <GestureDetector gesture={panGesture}>
                  <View style={[styles.trackImageContainer, isTablet && styles.trackImageContainerTablet]}>
                    {/* Dynamically adjust the style for phone (increased size) and keep it unchanged on iPad */}
                    <Image
                      source={playerImageSource}
                      style={[
                        styles.trackImage,
                        isTablet ? styles.trackImageTablet : styles.trackImagePhone // Adjust based on device type
                      ]}
                    />
                  </View>
                </GestureDetector>

                <View style={[styles.trackInfoContainer, isTablet && styles.trackInfoContainerTablet]}>
                  <Text style={[styles.title, isTablet && styles.titleTablet]}>{currentTrack.title}</Text>
                </View>

                <View style={[styles.volumeContainer, isTablet && styles.volumeContainerTablet]}>
                  <Ionicons
                    style={styles.volumeLabel}
                    name={'volume-high'}
                    size={24}
                    color={DARK_COLOR}
                  />
                  <Slider
                    style={[styles.slider, isTablet && styles.sliderTablet]}
                    minimumValue={0}
                    maximumValue={1}
                    value={mainVolume}
                    onValueChange={setVolume}
                    minimumTrackTintColor={PURPLE_COLOR}
                    thumbTintColor={DARK_COLOR}
                    maximumTrackTintColor={PURPLE_COLOR_SOFT}
                  />
                </View>

                <Animated.View style={[styles.controlsContainer, animatedStyle, { marginTop: 30 }]}>
                  <View style={[styles.controls, isTablet && styles.controlsTablet]}>
                    <TouchableOpacity onPress={previousTrack}>
                      <Ionicons name="play-skip-back" size={32} color={DARK_COLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={playPause} style={[styles.playPauseButton, isTablet && styles.playPauseButtonTablet]}>
                      <Ionicons name={isPlaying ? 'pause' : 'play'} size={48} color="#001725" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={nextTrack}>
                      <Ionicons name="play-skip-forward" size={32} color={DARK_COLOR} />
                    </TouchableOpacity>
                  </View>
                </Animated.View>

                <View style={[styles.optionsContainer, isTablet && styles.optionsContainerTablet]}>
                  <TouchableOpacity
                    style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => setEffectsModalVisible(true)}
                  >
                    <Ionicons name="musical-notes" size={24} color={DARK_COLOR} />
                    <Text style={[styles.optionText, isTablet && styles.optionTextTablet]}>Effects</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => setFrequenciesModalVisible(true)}
                  >
                    <Ionicons name="options" size={24} color={DARK_COLOR} />
                    <Text style={[styles.optionText, isTablet && styles.optionTextTablet]}>Frequencies</Text>
                  </TouchableOpacity>
                </View>

                <EffectsModal visible={effectsModalVisible} onClose={() => setEffectsModalVisible(false)} />
                <FrequenciesModal
                  visible={frequenciesModalVisible}
                  onClose={() => setFrequenciesModalVisible(false)}
                />
              </>
            )
          )}
        </GestureHandlerRootView>
      </ScrollView>
    </ImageBackground>
  );
};

export default PlayerScreen;
