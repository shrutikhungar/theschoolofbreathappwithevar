import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import debounce from 'lodash.debounce';

export type Track = {
  id: string;
  url: string;
  title: string;
};

type AudioContextType = {
  currentTrack: Track | null;
  playlist: Track[];
  isPlaying: boolean;
  mainVolume: number;
  loadTrack: (track: Track) => void;
  playPause: () => void;
  stop: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  setPlaylist: (tracks: Track[]) => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mainVolume, setMainVolume] = useState(1.0);

  useEffect(() => {
    const setupAudio = async () => {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers, // Change as you like
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers, // Change as you like
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
      });
    };

    setupAudio();
  }, []);

  const loadTrack = async (track: Track) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: track.url },
      { shouldPlay: true, volume: mainVolume }
    );
    setSound(newSound);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const playPause = async () => {
    if (isPlaying) {
      await sound?.pauseAsync();
    } else {
      await sound?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const stop = async () => {
    await sound?.stopAsync();
    setIsPlaying(false);
  };

  const nextTrack = async () => {
    const currentIndex = playlist.findIndex(track => track.id === currentTrack?.id);
    if (currentIndex >= 0 && currentIndex < playlist.length - 1) {
      await loadTrack(playlist[currentIndex + 1]);
    }
  };

  const previousTrack = async () => {
    const currentIndex = playlist.findIndex(track => track.id === currentTrack?.id);
    if (currentIndex > 0) {
      await loadTrack(playlist[currentIndex - 1]);
    }
  };

  const changeVolume = async (volume: number) => {
    setMainVolume(volume);
    if (sound) {
      await sound.setVolumeAsync(volume);
    }
  };

  const debouncedChangeVolume = debounce(changeVolume, 200);

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        playlist,
        isPlaying,
        mainVolume,
        loadTrack,
        playPause,
        stop,
        nextTrack,
        previousTrack,
        setVolume: debouncedChangeVolume,
        setPlaylist,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
