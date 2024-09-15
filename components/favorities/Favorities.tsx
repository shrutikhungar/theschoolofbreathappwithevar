import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { MusicTrack } from '../../services/sounds.service';
import categoryService, { MusicResponsePremium } from '../../services/category.service';
import { toggleFavorite } from '../../services/favorities.service';
import { TrackItem } from '../tracks/TrackItem';
import {PURPLE_COLOR } from '../../styles/playerScreen.styles';

interface FavoritesComponentProps {
  onTrackPress: (track: MusicTrack) => void;

  refetchList:() => void;
  isLoadingAgain:boolean
}

const FavoritesComponent: React.FC<FavoritesComponentProps> = ({ onTrackPress, refetchList ,isLoadingAgain}) => {
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [favoriteError, setFavoriteError] = useState<string | null>(null);
  const navigation = useNavigation();

  const getToken = async () => {
    return await AsyncStorage.getItem('userToken');
  };

  const { data: musics, isLoading, refetch } = useQuery<MusicResponsePremium>({
    queryKey: ['favorites'],
    queryFn: async () => {
      const token = await getToken();
      return categoryService.getFavorites({ category: '', token: token || '' });
    },
    refetchOnWindowFocus: false,
  });


  const handleToggleFavorite = async (musicId: string) => {
    setLoadingFavorites(true);
    setFavoriteError(null);
    try {
      const token = await getToken();
      await toggleFavorite(musicId, token || '');
      refetch();
      refetchList()
    } catch (error) {
      setFavoriteError('Error toggling favorite');
      console.error('Error toggling favorite:', error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  useEffect(()=>{
    refetch()
  },[isLoadingAgain])

  if (favoriteError) {
    return <Text style={styles.errorText}>{favoriteError}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Favorites</Text>
      <FlatList
        data={musics?.musicList || []}
        renderItem={({ item, index }) => (
          <TrackItem
            item={item}
            index={index}
            onTrackPress={onTrackPress}
            onToggleFavorite={handleToggleFavorite}
            loadingFavorites={isLoading}
            isFavorite
            isPremiumUser={musics ? musics.isPremium : false} // Assuming favorites are only available for premium users
         
          />
        )}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.favoritesContainer}
      />
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 12,
    color:PURPLE_COLOR
  },
  favoritesContainer: {
    paddingLeft: 10,
  },
  viewAllText: {
    color: '#1DB954',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 8,
  },
});

export default FavoritesComponent;
