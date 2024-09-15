import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import { Video, ResizeMode, VideoFullscreenUpdate } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { CustomAlert } from './CustomAlert';

interface VideoPlayerProps {
  videoUrl: string;
}

export const  VideoPlayerV: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const [isBuffering, setIsBuffering] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoSize, setVideoSize] = useState({
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').width * 9) / 16, // 16:9 aspect ratio
  });
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    const setupOrientation = async () => {
      await ScreenOrientation.unlockAsync();
      ScreenOrientation.addOrientationChangeListener(handleOrientationChange);
    };

    setupOrientation();

    const dimensionsListener = Dimensions.addEventListener('change', updateVideoSize);

    return () => {
      ScreenOrientation.removeOrientationChangeListeners();
      dimensionsListener.remove();
    };
  }, []);

  const updateVideoSize = () => {
    const { width, height } = Dimensions.get('window');
    const isLandscape = width > height;
    setVideoSize({
      width: isLandscape ? width : width,
      height: isLandscape ? height : (width * 9) / 16,
    });
  };

  const handleOrientationChange = async (event: ScreenOrientation.OrientationChangeEvent) => {
    const { orientation } = event.orientationInfo;
    if (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
      await videoRef.current?.presentFullscreenPlayer();
    }
    updateVideoSize();
  };

  const onFullscreenUpdate = async ({ fullscreenUpdate }: { fullscreenUpdate: VideoFullscreenUpdate }) => {
    if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_DISMISS) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      updateVideoSize();
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    setIsBuffering(status.isBuffering);
    if (!status.isLoaded && status.error) {
      setError("Video playback error occurred.");
    }
  };

  const onError = (error: any) => {
    setError("Video playback error occurred.");
  };

  const handleAlertClose = () => {
    setError(null);
  };

  return (
    <View style={styles.container}>
      {isBuffering && (
        <View style={styles.bufferingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <CustomAlert
            message={error}
            type="error"
            onClose={handleAlertClose}
          />
        </View>
      )}
      <Video
        ref={videoRef}
        source={{ uri: videoUrl }}
        style={[styles.video, { width: videoSize.width, height: videoSize.height }]}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        onError={onError}
        onFullscreenUpdate={onFullscreenUpdate}
        shouldPlay
        useNativeControls
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    flex: 1,
  },
  bufferingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  errorContainer: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    zIndex: 2,
  },
});