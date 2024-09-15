// FavoritesList.tsx
import React from 'react';
import { View, FlatList,Text } from 'react-native';

import { tracksStyles as styles } from '../../styles/tracksBase.styles';
import SkeletonLoader from '../loaders/Skeleton';
import { TrackItem } from './TrackItem';
import { MusicTrack } from '../../services/sounds.service';
interface FavoritesListProps {
  tracks: MusicTrack[];
  isLoading: boolean;
  onTrackPress: (track: MusicTrack) => void;
  onToggleFavorite: (musicId: string) => void;
  loadingFavorites: boolean;
  isPremiumUser: boolean;
  isAuthenticated: boolean; 
  
}

export const FavoritesList: React.FC<FavoritesListProps> = ({
  tracks,
  isLoading,
  onTrackPress,
  onToggleFavorite,
  loadingFavorites,
  isPremiumUser,
  isAuthenticated
}) => {
  return (
    <View style={styles.trackListContainer}>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
       <>
         {tracks.length === 0 && <Text >Tracks no found</Text>}
         {tracks.length > 0 &&<FlatList
          data={tracks}
          renderItem={({ item, index }) => (
            <TrackItem
              item={item}
              index={index}
              onTrackPress={onTrackPress}
              onToggleFavorite={onToggleFavorite}
              loadingFavorites={loadingFavorites}
              isPremiumUser={isPremiumUser}
              isFavorite={true}
              isAuthenticated={ isAuthenticated}
            />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.trackList}
        />}
       </>
       
      )}
    </View>
  );
};



