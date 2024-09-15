// TrackItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import SkeletonLoader from '../loaders/Skeleton';
import { MusicTrack } from '../../services/sounds.service';

type TrackItemProps = {
  item: MusicTrack;
  onTrackPress: (track: MusicTrack) => void;
  onToggleFavorite: (musicId: string) => void;
  loadingFavorites: boolean;
  index: number;
  isPremiumUser: boolean;
  isFavorite: boolean;
  isAuthenticated: boolean; // Add this prop
};
const imageMapping: { [key: string]: any } = {
  'sleep music deep healing': require('../../assets/SleepMusic1.png'),
  'anxiety relief sleep music': require('../../assets/SleepMusic2.png'),
  'chakra balance sleep music': require('../../assets/SleepMusic3.png'),
  'reduce anxiety': require('../../assets/SleepMusic21.png'),
  'delta body healing': require('../../assets/SleepMusic4.png'),
  'full body healing': require('../../assets/SleepMusic6.png'),
  'fall asleep fast': require('../../assets/SleepMusic7.png'),
  'body healing': require('../../assets/SleepMusic22.png'),
  'deep healing': require('../../assets/SleepMusic19.png'),
  'yoga nidra body scan': require('../../assets/SleepMusic21.png'),
  'yoga nidra': require('../../assets/SleepMusic10.png'),
  'echoes of serenity: fall asleep fast': require('../../assets/SleepMusic11.png'),
  'full body healing 432 hz': require('../../assets/SleepMusic12.png'),
  'deep sleep healing': require('../../assets/SleepMusic13.png'),
  'sleep music anxiety relief 432 hz': require('../../assets/SleepMusic14.png'),
  'sleep music deep sleep': require('../../assets/SleepMusic15.png'),
  'full body healing ☯ all 9 solfeggio frequencies': require('../../assets/SleepMusic16.png'),
  'sleep music deep sleep ☯ all 9 solfeggio frequencies': require('../../assets/SleepMusic17.png'),
  'deep sleep delta': require('../../assets/SleepMusic20.png'),
};
export const TrackItem: React.FC<TrackItemProps> = ({
  item,
  index,
  onTrackPress,
  onToggleFavorite,
  loadingFavorites,
  isPremiumUser,
  isFavorite,
  isAuthenticated, // Add this prop
}) => {
  const { user } = useAuth();

  const normalizedItemName = item.name.toLowerCase().trim();
  const trackImage = imageMapping[normalizedItemName] || require('../../assets/SleepMusic11.png');

  if (loadingFavorites) {
    return <SkeletonLoader />;
  }

  return (
    <Animated.View
      key={index}
      entering={FadeIn.delay(index * 100)}
      exiting={FadeOut}
      style={[
        styles.trackContainer,
        item.isPremium && !isPremiumUser && styles.premiumTrackContainer,
        isFavorite && { marginHorizontal: 10 },
      ]}
    >
      <LinearGradient
        colors={item.isPremium ? ['#49405b', '#72616d'] : ['#6a5c83', '#a593a4']}
        style={styles.gradientContainer}
      >
        <View style={styles.trackItem}>
          {item.isPremium && !isPremiumUser && (
            <View style={styles.lockOverlay}>
              <Ionicons name="lock-closed" size={20} color="#d2ced9" />
            </View>
          )}
          <TouchableOpacity
            onPress={() => onTrackPress(item)}
            disabled={item.isPremium && !isPremiumUser}
            style={styles.trackPressContainer}
          >
            <Image source={{ uri: item.imageFilename }} style={styles.trackImage} />
            <Text style={styles.trackTitle}>{item.name}</Text>
          </TouchableOpacity>

          <View style={styles.actions}>
            {isAuthenticated && ( // Only show the like button if authenticated
              <TouchableOpacity
                onPress={() => onToggleFavorite(item._id)}
                disabled={loadingFavorites || (item.isPremium && !isPremiumUser)}
              >
                <Ionicons
                  name={item.favorites.includes(user?.id || '') ? 'heart' : 'heart-outline'}
                  size={28}
                  color="#d2ced9"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  trackContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#dccfeb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 9,
  },
  gradientContainer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  premiumTrackContainer: {
   
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  trackItem: {
    flex: 9,
    flexDirection: 'row',
    alignItems: 'center',
   position:'relative',
    height: 90,
    borderRadius: 51,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 90,
    elevation: 9,
  },
  trackPressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding:6
  },
  trackImage: {
    width: 90,
    height: 90,
  },
  trackTitle: {
    fontSize: 16,
    color: '#fff',
    flex: 2,
    paddingLeft: 9,
    paddingTop: 9,
    letterSpacing: 2, // Increased letter spacing
  },
  actions: {},
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    zIndex:10
  },
});