import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { TrackItem } from './TrackItem';
import { tracksStyles as styles } from '../../styles/tracksBase.styles';
import { MusicTrack } from '../../services/sounds.service';

interface TrackListProps {
  tracks: MusicTrack[];
  isLoading: boolean;
  onTrackPress: (track: MusicTrack) => void;
  onToggleFavorite: (musicId: string) => void;
  loadingFavorites: boolean;
  isPremiumUser: boolean;
  isAuthenticated: boolean; // Add this prop
}

export const TrackList: React.FC<TrackListProps> = React.memo(({
  tracks,
  isLoading,
  onTrackPress,
  onToggleFavorite,
  loadingFavorites,
  isPremiumUser,
  isAuthenticated, // Add this prop
}) => {

  const renderTrackItem = React.useCallback(({ item, index }: { item: MusicTrack; index: number }) => (
    <TrackItem
      item={item}
      index={index}
      onTrackPress={onTrackPress}
      onToggleFavorite={onToggleFavorite}
      loadingFavorites={loadingFavorites}
      isPremiumUser={isPremiumUser}
      isFavorite={true} // You can update this logic based on your favorite tracking method
      isAuthenticated={isAuthenticated} // Pass this prop
    />
  ), [onTrackPress, onToggleFavorite, loadingFavorites, isPremiumUser, isAuthenticated]);

  return (
    <View style={styles.trackListContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#1DB954" />
      ) : (
        <FlatList
          data={tracks}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.trackList}
          initialNumToRender={10} // Adjust to balance performance
          maxToRenderPerBatch={10} // Adjust to balance performance
          removeClippedSubviews={true} // Improves memory management for large lists
        />
      )}
    </View>
  );
});
