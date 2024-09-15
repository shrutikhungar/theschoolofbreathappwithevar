import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../context/AudioContext';
import { convertMusicTrackToTrack } from '../utils/trackConverter';
import { RootStackParamList } from '../App';
import CategoryService, { MusicResponsePremium } from '../services/category.service';
import { MusicTrack } from '../services/sounds.service';
import { CategoryModal, CategoryType } from '../components/modals/CategoryModal';
import { toggleFavorite } from '../services/favorities.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { tracksStyles as styles } from '../styles/tracksBase.styles';
import { MAIN_COLOR } from '../styles/playerScreen.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { FavoritesList } from '../components/tracks/FavoriteList';
import { TrackList } from '../components/tracks/TrackList';

export type MusicTracksScreenNavigationProp = NavigationProp<RootStackParamList, 'MusicTracksBase'>;

export default function MusicTracksScreen() {
  const navigation = useNavigation<MusicTracksScreenNavigationProp>();
  const { loadTrack, setPlaylist } = useAudio();
  const { height, width } = Dimensions.get('window');

  const isTablet = width >= 768;

  // Dynamically set the top image based on the device type
  const topImageSource = isTablet
    ? require('../assets/Button3Ipad.jpg') // Use iPad image
    : require('../assets/Button3.png'); // Use phone image

  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [favoriteError, setFavoriteError] = useState<string | null>(null);
  const [tracksPlayed, setTracksPlayed] = useState(0);
  const [currentTab, setCurrentTab] = useState<'favorites' | 'allTracks'>('allTracks');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getToken = useCallback(async () => {
    return await AsyncStorage.getItem('userToken');
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await getToken();
      setIsAuthenticated(!!token);
    };
    checkAuthStatus();
  }, [getToken]);

  const { data: musics, isLoading, refetch } = useQuery<MusicResponsePremium>({
    queryKey: ['musics', selectedCategory?._id, isAuthenticated],
    queryFn: async () => {
      const token = await getToken();
      if (token) {
        return CategoryService.getMusicByCategory(selectedCategory?._id || '', token);
      } else {
        return CategoryService.getPreviewMusicByCategory(selectedCategory?._id || '');
      }
    },
    refetchOnWindowFocus: false,
  });

  const { data: favoriteMusics, refetch: refetchFavorites } = useQuery<MusicResponsePremium>({
    queryKey: ['favorites', selectedCategory?._id, isAuthenticated],
    queryFn: async () => {
      const token = await getToken();
      if (token) {
        return CategoryService.getFavorites({ category: selectedCategory?._id || '', token });
      }
      return { musicList: [], isPremium: false };
    },
    refetchOnWindowFocus: false,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (musics) {
      musics.isPremium
        ? setPlaylist(musics.musicList.map(convertMusicTrackToTrack))
        : setPlaylist(musics.musicList.filter(music => !music.isPremium).map(convertMusicTrackToTrack));
    }
  }, [musics]);

  const handleTrackPress = (track: MusicTrack) => {
    const convertedTrack = convertMusicTrackToTrack(track);
    loadTrack(convertedTrack);
    navigation.navigate('Player');
    setTracksPlayed(prev => prev + 1);
  };

  const handleToggleFavorite = async (musicId: string) => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
      return;
    }
    setLoadingFavorites(true);
    setFavoriteError(null);
    try {
      const token = await getToken();
      await toggleFavorite(musicId, token || '');
      refetch();
      refetchFavorites();
    } catch (error) {
      setFavoriteError('Error toggling favorite');
      console.error('Error toggling favorite:', error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  const handleClearCategory = () => {
    setSelectedCategory(null);
    refetch();
    refetchFavorites();
  };

  const handleUpgradeNow = () => {
    navigation.navigate('Login');
  };

  const filterTracks = (tracks: MusicTrack[]) => {
    return tracks.filter(
      track =>
        searchQuery
          ? track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            track.description.toLowerCase().includes(searchQuery.toLowerCase())
          : true
    );
  };

  const renderFavorites = () => (
    <FavoritesList
      tracks={filterTracks(favoriteMusics ? favoriteMusics.musicList : [])}
      isLoading={isLoading}
      onTrackPress={handleTrackPress}
      onToggleFavorite={handleToggleFavorite}
      loadingFavorites={loadingFavorites}
      isPremiumUser={musics ? musics.isPremium : false}
      isAuthenticated={isAuthenticated}
    />
  );

  const renderAllTracks = () => (
    <TrackList
      tracks={filterTracks(musics?.musicList ?? [])}
      isLoading={isLoading}
      onTrackPress={handleTrackPress}
      onToggleFavorite={handleToggleFavorite}
      loadingFavorites={loadingFavorites}
      isPremiumUser={musics ? musics.isPremium : false}
      isAuthenticated={isAuthenticated}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <ImageBackground
        source={require('../assets/MusicTracksBaseScreenBacklight.jpg')}
        style={[styles.container, isTablet && styles.containerTablet]} // Adjust container for tablet
      >
        <ImageBackground
          source={topImageSource}
          style={[styles.topImageBackground, isTablet && styles.topImageBackgroundTablet]} // Adjust background size for tablet
          imageStyle={{ resizeMode: 'cover' }} // Ensures the image fits within the container
        >
          {(isAuthenticated && musics?.isPremium) && (
            <View style={[styles.header, { backgroundColor: 'transparent' }]}>
              <View style={{ flex: 1 }} />
              <TouchableOpacity onPress={() => setIsCategoryModalVisible(true)} style={styles.categoryButton}>
                <Ionicons name="filter" size={24} color="#043d49" />
                <Text style={styles.categoryButtonText}>Categories</Text>
              </TouchableOpacity>
              {selectedCategory && (
                <View style={styles.selectedCategoryBadge}>
                  <Text style={styles.selectedCategoryText}>{selectedCategory.name}</Text>
                  <TouchableOpacity onPress={handleClearCategory} style={styles.clearButton}>
                    <Ionicons name="close-circle" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </ImageBackground>
      </ImageBackground>

      <ImageBackground source={require('../assets/MusicBaseBack.png')}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, isTablet && styles.searchInputTablet]} // Adjust input style for tablet
            placeholder="Search tracks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </ImageBackground>

      {favoriteError && <Text style={styles.errorText}>{favoriteError}</Text>}

      <ImageBackground source={require('../assets/MusicBaseBack.png')} style={{ flex: 1 }}>
        <View style={[styles.tabsContainer, { backgroundColor: 'transparent' }]}>
          <TouchableOpacity
            style={[styles.tabButton, currentTab === 'allTracks' && styles.activeTabButton]}
            onPress={() => setCurrentTab('allTracks')}
          >
            <Text style={[styles.tabButtonText, currentTab === 'allTracks' && styles.activeTabButtonText]}>
              All tracks
            </Text>
          </TouchableOpacity>
          {isAuthenticated && (
            <TouchableOpacity
              style={[styles.tabButton, currentTab === 'favorites' && styles.activeTabButton]}
              onPress={() => setCurrentTab('favorites')}
            >
              <Text style={[styles.tabButtonText, currentTab === 'favorites' && styles.activeTabButtonText]}>
                Favorites
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {currentTab === 'favorites' ? renderFavorites() : renderAllTracks()}
      </ImageBackground>

      <CategoryModal
        isVisible={isCategoryModalVisible}
        onClose={() => setIsCategoryModalVisible(false)}
        onSelectCategory={category => {
          setSelectedCategory(category);
          setIsCategoryModalVisible(false);
          refetch();
          refetchFavorites();
        }}
        selectedCategory={selectedCategory}
      />

      <Modal transparent={true} animationType="fade" visible={loadingFavorites} onRequestClose={() => {}}>
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1DB954" />
        </View>
      </Modal>

      {(!isAuthenticated || !musics?.isPremium) && !isLoading && (
        <LinearGradient colors={['transparent', '#a59db4']} style={styles.upgradeButtonContainer}>
          <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgradeNow}>
            <Text style={styles.upgradeButtonText}>Login to Access</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </View>
  );
}
