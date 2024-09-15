import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, ImageBackground, Linking, Modal, Image } from 'react-native';
import { useAuth } from '../context/AuthContext'; 
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MusicTracksScreenNavigationProp } from './MusicTracksBaseScreen';
import { useQuery } from '@tanstack/react-query';
import { fetchUserTags } from '../services/tags.service';
import { fullAccessMemberTags, limitedAccessTags } from '../data/accessRules';
import { LinearGradient } from 'expo-linear-gradient';

const UserInfoScreen = () => {
  const navigation = useNavigation<MusicTracksScreenNavigationProp>();
  const { user, logout } = useAuth();
  const { data: userTags, isLoading } = useQuery<string[], Error>({
    queryKey: ['userTags', user?.email],
    queryFn: () => fetchUserTags(user?.email ?? ''),
  });

  const [shareModalVisible, setShareModalVisible] = useState(false);

  const userHasFullAccess = userTags?.some(tag => fullAccessMemberTags.includes(tag));
  const userHasLimitedAccess = userTags?.some(tag => limitedAccessTags.includes(tag));

  const membershipStatus = useMemo(() => {
    return userHasFullAccess ? 'Premium Membership' : userHasLimitedAccess ? 'Limited Access' : 'No Membership';
  }, [userHasFullAccess, userHasLimitedAccess]);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('BaseHome');
  };

  const handleUpgradeNow = () => {
    Linking.openURL('https://www.meditatewithabhi.com/holistic-membership');
  };

  const handleShare = () => {
    setShareModalVisible(true);
  };

  const closeModal = () => {
    setShareModalVisible(false);
  };

  const handleChatSupport = () => {
    Linking.openURL(`whatsapp://send?phone=+919253392845&text=Hello, I need support!`);
  };

  const shareMessage = "I am using this app and recommend it to you too. Url: https://play.google.com/store/apps/details?id=com.example.app";

  const handleWhatsAppShare = () => {
    Linking.openURL(`whatsapp://send?text=${encodeURIComponent(shareMessage)}`);
  };

  const handleTelegramShare = () => {
    Linking.openURL(`tg://msg?text=${encodeURIComponent(shareMessage)}`);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <LinearGradient colors={['#ccc9da', '#72616d', '#a593a4', '#a593a4', '#ccc9da']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Install</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#5FC3A4" />
          </View>
        ) : (
          <View style={styles.listContainer}>
            <View style={styles.listItem} />
            <View style={styles.listItem} />
            <View style={styles.listItem} />
            <View style={styles.listItem} />
            <View style={styles.listItem} />
          </View>
        )}

        {!user ? (
          <>
            <TouchableOpacity onPress={handleLogin} style={styles.authButton}>
              <LinearGradient colors={['#ccc9da', '#72616d', '#a593a4', '#a593a4', '#ccc9da']} style={styles.buttonBackground}>
                <Ionicons name="log-in" size={20} color="white" />
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpgradeNow} style={styles.upgradeButton}>
              <LinearGradient colors={['#ccc9da', '#72616d', '#a593a4', '#a593a4', '#ccc9da']} style={styles.buttonBackground}>
                <Ionicons name="star-outline" size={20} color="white" />
                <Text style={styles.buttonText}>Upgrade to Premium</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={handleLogout} style={[styles.authButton, { marginTop: 10 }]}>
            <LinearGradient colors={['#ccc9da', '#72616d', '#a593a4', '#a593a4', '#ccc9da']} style={styles.buttonBackground}>
              <Ionicons name="log-out" size={20} color="white" />
              <Text style={styles.buttonText}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Floating Share Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleShare}>
        <Ionicons name="share-social" size={28} color="white" />
      </TouchableOpacity>

      {/* Floating Chat Support Button */}
      <TouchableOpacity style={styles.floatingChatButton} onPress={handleChatSupport}>
        <Ionicons name="logo-whatsapp" size={28} color="white" />
      </TouchableOpacity>

      {/* Share Modal */}
      <Modal
        visible={shareModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Profile image in the modal */}
            <View style={styles.modalHeader}>
              <Image
                source={require('../assets/Abhi.jpg')}
                style={styles.modalProfileImage}
              />
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <Text style={styles.shareText}>I am using this app and recommend it to you too.</Text>
            <Text style={styles.appUrl}>Url: https://play.google.com/store/apps/details?id=com.example.app</Text>

            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleWhatsAppShare} style={styles.iconButton}>
                <FontAwesome name="whatsapp" size={40} color="#25D366" />
                <Text style={styles.iconText}>WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleTelegramShare} style={styles.iconButton}>
                <FontAwesome name="telegram" size={40} color="#0088cc" />
                <Text style={styles.iconText}>Telegram</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 150,
    justifyContent: 'flex-end',
  },
  headerContent: {
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollViewContainer: {
    paddingVertical: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  listItem: {
    height: 50,
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
    borderRadius: 8,
  },
  authButton: {
    marginTop: 20,
    width: '100%',
  },
  upgradeButton: {
    marginTop: 10,
    width: '100%',
  },
  buttonBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
  floatingButton: {
    position: 'absolute',
    top: 63, 
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#72616d',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, 
    shadowColor: '#000', 
    shadowOpacity: 0.3, 
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
  },
  floatingChatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#25D366', // WhatsApp green color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, 
    shadowColor: '#000', 
    shadowOpacity: 0.3, 
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#dcd0e9', // Background color for the modal content
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalProfileImage: {
    width: 90,
    height: 90,
    borderRadius: 25,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  shareText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  appUrl: {
    fontSize: 16,
    color: '#007aff',
    textAlign: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
});

export default UserInfoScreen;
