import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { WebView } from 'react-native-webview';  // WebView for YouTube videos
import { Ionicons } from '@expo/vector-icons';  // For rotation and volume controls
import * as ScreenOrientation from 'expo-screen-orientation';  // To control screen orientation
import { VideoPlayerV } from "../components/BufferPlayerVideo"; // Your existing video player for non-YouTube videos
import { usePreventScreenCapture } from 'expo-screen-capture';

// Define your navigation stack parameter list
type RootStackParamList = {
  VideoPlayer: { videoUrl: string, fromYoutube: boolean };
};

// Define the prop type for the screen
type VideoPlayerScreenRouteProp = RouteProp<RootStackParamList, 'VideoPlayer'>;

interface VideoPlayerScreenProps {
  route: VideoPlayerScreenRouteProp;
}

// Utility function to convert YouTube URL to embeddable version
const getEmbeddableYoutubeUrl = (videoUrl: string) => {
  let videoId;

  if (videoUrl.includes('youtube.com/watch?v=')) {
    videoId = videoUrl.split('v=')[1];
  } else if (videoUrl.includes('youtu.be/')) {
    videoId = videoUrl.split('youtu.be/')[1];
  } else if (videoUrl.includes('youtube.com/embed/')) {
    return videoUrl; // It's already in embeddable format
  }

  // Remove any additional parameters after the video ID
  if (videoId && videoId.includes('&')) {
    videoId = videoId.split('&')[0];
  }

  return `https://www.youtube.com/embed/${videoId}`;
};

const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({ route }) => {
  usePreventScreenCapture();
  const { videoUrl, fromYoutube } = route.params;
  const [isLandscape, setIsLandscape] = useState(false);

  // Lock the app in portrait mode initially and unlock it when unmounted
  useEffect(() => {
    const lockToPortrait = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
    lockToPortrait();

    return () => {
      ScreenOrientation.unlockAsync();  // Ensure app unlocks any remaining orientation locks when component unmounts
    };
  }, []);

  // Toggle the video player's orientation (only for video, not the entire app)
  const toggleVideoOrientation = async () => {
    if (!isLandscape) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);  // Switch to landscape mode
      setIsLandscape(true);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);  // Switch back to portrait
      setIsLandscape(false);
    }
  };

  // Screen width and height calculations to maintain the 16:9 aspect ratio
  const screenWidth = Dimensions.get('window').width;
  const videoHeight = (screenWidth * 9) / 16;  // Maintain 16:9 aspect ratio

  return (
    <View style={styles.container}>
      {/* Video Player */}
      {fromYoutube ? (
        <WebView
          style={{ width: screenWidth, height: videoHeight }}  // Apply 16:9 aspect ratio
          source={{ uri: getEmbeddableYoutubeUrl(videoUrl) }}
          allowsFullscreenVideo={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#fff" />
            </View>
          )}
        />
      ) : (
        <VideoPlayerV videoUrl={videoUrl} />
      )}

      {/* Rotation Control */}
      <View style={styles.controlsContainer}>
        {/* Toggle between portrait and landscape */}
        <TouchableOpacity onPress={toggleVideoOrientation} style={styles.controlButton}>
          <Ionicons name={isLandscape ? "phone-portrait-outline" : "phone-landscape-outline"} size={24} color="white" />
          <Text style={styles.controlText}>{isLandscape ? 'Portrait' : 'Landscape'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Semi-transparent background
  },
  controlButton: {
    alignItems: 'center',
  },
  controlText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});

export default VideoPlayerScreen;
