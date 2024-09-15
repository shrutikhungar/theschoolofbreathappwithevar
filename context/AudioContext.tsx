import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import debounce from 'lodash.debounce';

export type Track = {
  id: string;
  url: string;
  title: string;
  image:string;
};

type AudioContextType = {
  currentTrack: Track | null;
  playlist: Track[];
  isPlaying: boolean;
  mainVolume: number;
  loading: boolean;
  loadTrack: (track: Track) => void;
  playPause: () => void;
  stop: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  setPlaylist: (tracks: Track[]) => void;
  unloadAll: () => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mainVolume, setMainVolume] = useState(1.0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setupAudio = async () => {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
      });
    };

    setupAudio();
  }, []);

  const loadTrack = async (track: Track) => {
    setLoading(true);
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: track.url },
        { shouldPlay: true, volume: mainVolume }
      );
      setSound(newSound);
      setCurrentTrack(track);
      setIsPlaying(true);
    } catch (error) {
      console.error("Error loading track:", error);
    } finally {
      setLoading(false);
    }
  };

  const playPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stop = async () => {
    if (sound && isPlaying) {
      try {
        await sound.stopAsync();
        setIsPlaying(false);
      } catch (error) {
        console.error("Error stopping sound:", error);
      }
    }
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

  const unloadAll = async () => {
    if (sound) {
      try {
        await sound.unloadAsync();
        setSound(null);
        setCurrentTrack(null);
        setIsPlaying(false);
      } catch (error) {
        console.error("Error unloading sound:", error);
      }
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        playlist,
        isPlaying,
        mainVolume,
        loading,
        loadTrack,
        playPause,
        stop,
        nextTrack,
        previousTrack,
        setVolume: debouncedChangeVolume,
        setPlaylist,
        unloadAll,
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