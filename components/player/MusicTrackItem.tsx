import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MusicTrack } from '../../services/sounds.service';
import { toggleFavorite as toggleFavoriteService } from '../../services/favorities.service';
import { useAuth } from '../../context/AuthContext';

type MusicItemProps = {
  track: MusicTrack;
  hasFavorite: boolean;
  handleSelectBackground: (track: MusicTrack) => void;
  onDataRefetch: () => void;
  isPremium: string;
};

export const MusicItem: React.FC<MusicItemProps> = ({ track, hasFavorite, handleSelectBackground, onDataRefetch, isPremium }) => {
  const { user } = useAuth();
  const [isMutating, setIsMutating] = React.useState(false);

  const handleToggleFavorite = async () => {
    if (!user?.token) {
      console.error('No token found');
      return;
    }
    setIsMutating(true);
    try {
      await toggleFavoriteService(track._id, user.token);
      onDataRefetch();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <View style={styles.trackItem}>
      {track.isPremium && isPremium === 'false' && (
        <View style={styles.lockOverlay}>
          <Ionicons name="lock-open" size={35} color="#fff" />
          <Text style={styles.lockText}>Unlock Full Library</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.trackImageContainer}
        onPress={() => handleSelectBackground(track)}
        disabled={track.isPremium && isPremium === 'false'}
      >
        <Image source={{ uri: track.imageFilename }} style={styles.trackImage} />
      </TouchableOpacity>
      <Text style={styles.trackDescription}>{track.description}</Text>
      <TouchableOpacity style={styles.favoriteButton} onPress={handleToggleFavorite} disabled={isMutating}>
        {isMutating ? (
          <ActivityIndicator size="small" color="#FF0000" />
        ) : (
          <Ionicons name={hasFavorite ? "heart" : "heart-outline"} size={24} color="#FF0000" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    position: 'relative',
  },
  lockOverlay: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  lockText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  trackImageContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  trackDescription: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  favoriteButton: {
    padding: 10,
  },
});
