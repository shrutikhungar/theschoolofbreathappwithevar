import React, { useState, useMemo } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Modal, Linking, Dimensions, Alert } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { fetchUserTags } from '../services/tags.service';
import { fullAccessMemberTags, limitedAccessTags } from '../data/accessRules';

export default function CustomDrawerContent(props) {
  const { user, logout } = useAuth();
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  const { data: userTags, isLoading } = useQuery<string[], Error>({
    queryKey: ['userTags', user?.email],
    queryFn: () => fetchUserTags(user?.email ?? ''),
  });

  const userHasFullAccess = userTags?.some(tag => fullAccessMemberTags.includes(tag));
  const userHasLimitedAccess = userTags?.some(tag => limitedAccessTags.includes(tag));

  const membershipStatus = useMemo(() => {
    if (!user) {
      return 'Basic Membership';
    }
    return userHasFullAccess ? 'Premium Membership' : userHasLimitedAccess ? 'Limited Access' : 'Basic Membership';
  }, [user, userHasFullAccess, userHasLimitedAccess]);

  const handleShare = () => {
    setShareModalVisible(true);
  };

  const closeModal = () => {
    setShareModalVisible(false);
  };

  const handleWhatsAppShare = () => {
    Linking.canOpenURL('whatsapp://send').then(supported => {
      if (!supported) {
        Alert.alert('WhatsApp not installed', 'WhatsApp is not installed on this device.');
      } else {
        Linking.openURL(`whatsapp://send?text=Check out this app!`);
      }
    }).catch(err => console.error('Error opening WhatsApp:', err));
  };

  const handleLogout = () => {
    logout();
    props.navigation.navigate('BaseHome');
  };

  return (
    <ImageBackground
      source={require('../assets/CustomDrawerContentback.jpg')}
      style={styles.background}
    >
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <ImageBackground style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user ? user.name : 'Guest User'}</Text>
            <Text style={styles.userEmail}>{user ? user.email : 'guest@domain.com'}</Text>
            {!isLoading && (
              <>
                <Text
                  style={[
                    styles.membershipStatus,
                    membershipStatus === 'Basic Membership' && styles.noMembershipStatus,
                    membershipStatus === 'Limited Access' && styles.limitedAccessStatus,
                    membershipStatus === 'Premium Membership' && styles.premiumMembershipStatus
                  ]}
                >
                  {membershipStatus}
                </Text>
  
                {/* Conditionally Render the Upgrade Button */}
                {(membershipStatus === 'Basic Membership' || membershipStatus === 'Limited Access') && (
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Subscription')} // Navigate to the upgrade screen
                    style={styles.upgradeButton}
                  >
                    <Text style={styles.upgradeButtonText}>Upgrade Membership</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </View>
  
        <View style={styles.drawerItemListContainer}>
          {/* Home Button */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('BaseHome')}
            style={styles.drawerButton}
          >
            <Ionicons name="home" size={20} color="#f5e6a0" />
            <Text style={styles.drawerButtonText}>Home</Text>
          </TouchableOpacity>
  
          {/* Login Button (conditionally rendered if user is not logged in) */}
          {!user && (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}
              style={styles.drawerButton}
            >
              <Ionicons name="log-in" size={20} color="#f5e6a0" />
              <Text style={styles.drawerButtonText}>Login</Text>
            </TouchableOpacity>
          )}
  
          {/* Logout Button (conditionally rendered if user is logged in) */}
          {user && (
            <TouchableOpacity onPress={handleLogout} style={styles.drawerButton}>
              <Ionicons name="log-out" size={20} color="#f5e6a0" />
              <Text style={styles.drawerButtonText}>Logout</Text>
            </TouchableOpacity>
          )}
  
          {/* Privacy Policy Button */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('PrivacyPolicy')}
            style={styles.drawerButton}
          >
            <Ionicons name="book" size={20} color="#f5e6a0" />
            <Text style={styles.drawerButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
  
      {/* Floating Share and Chat Buttons */}
      <TouchableOpacity style={[styles.floatingButton, { zIndex: 100 }]} onPress={handleShare}>
        <Ionicons name="share-social" size={28} color="white" />
      </TouchableOpacity>
  
      <TouchableOpacity
        style={[styles.floatingChatButton, { right: isTablet ? 90 : 20, zIndex: 100 }]}
        onPress={handleWhatsAppShare}
      >
        <Ionicons name="logo-whatsapp" size={28} color="white" />
      </TouchableOpacity>
  
      {/* Simplified Share Modal */}
      <Modal
        visible={shareModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Share this app</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeModalButton}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
  
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, 
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 55,
  },
  userInfo: {
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#917d8c',
    marginTop: 5,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 14,
    color: '#917d8c',
    textAlign: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  membershipStatus: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  noMembershipStatus: {
    color: '#f5e6a0',
    backgroundColor: '#72616d',
    padding: 5,
    borderRadius: 10,
  },
  limitedAccessStatus: {
    color: '#f5e6a0',
    backgroundColor: '#72616d',
    padding: 5,
    borderRadius: 10,
  },
  premiumMembershipStatus: {
    color: '#f5e6a0',
    backgroundColor: '#72616d',
    padding: 5,
    borderRadius: 10,
  },
  drawerItemListContainer: {
    paddingTop: 30,
  },
  drawerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: '#72616d',
    borderColor: '#d1bc94',
    borderWidth: 3,
  },
  drawerButtonText: {
    fontSize: 16,
    color: '#f5e6a0',
    marginLeft: 15,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#72616d',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#f1e08a',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    borderWidth: 3,
    borderColor: '#d1bc94',
    zIndex: 100,
  },
  floatingChatButton: {
    position: 'absolute',
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#f1e08a',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    borderWidth: 3,
    borderColor: '#d1bc94',
    zIndex: 100,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  closeModalButton: {
    backgroundColor: '#72616d',
    padding: 10,
    borderRadius: 10,
  },
  closeModalText: {
    color: 'white',
    fontWeight: 'bold',
  },
  upgradeButton: {
    marginTop: 10,
    backgroundColor: '#f5e6a0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  upgradeButtonText: {
    color: '#72616d',
    fontSize: 16,
    fontWeight: 'bold',
  }  
});
