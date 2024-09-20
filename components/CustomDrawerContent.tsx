import React, { useState, useMemo } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Modal, Linking, Dimensions, Alert } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useQuery } from '@tanstack/react-query';
import { fetchUserTags } from '../services/tags.service';
import { fullAccessMemberTags, limitedAccessTags } from '../data/accessRules';
import { PaymentRequest } from 'react-native-payments'; // Import PaymentRequest from react-native-payments
import { MERCHANT_IDENTIFIER, SUPPORTED_NETWORKS, COUNTRY_CODE, CURRENCY_CODE, SUBSCRIPTION_LABEL, SUBSCRIPTION_AMOUNT } from '@env';  // Import sensitive data from env

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
      return 'Basic Membership'; // Display "Basic Membership" if not logged in
    }
    return userHasFullAccess ? 'Premium Membership' : userHasLimitedAccess ? 'Limited Access' : 'Basic Membership';
  }, [user, userHasFullAccess, userHasLimitedAccess]);

  const handleShare = () => {
    setShareModalVisible(true);
  };

  const closeModal = () => {
    setShareModalVisible(false);
  };

  const handleUpgrade = () => {
    const paymentRequest = new PaymentRequest(
      // Payment method configuration (Apple Pay)
      [{
        supportedMethods: ['apple-pay'],
        data: {
          merchantIdentifier: MERCHANT_IDENTIFIER,  // Loaded from .env
          supportedNetworks: SUPPORTED_NETWORKS.split(','),  // Loaded from .env
          countryCode: COUNTRY_CODE,  // Loaded from .env
          currencyCode: CURRENCY_CODE,  // Loaded from .env
        }
      }],
      // Transaction details
      {
        total: {
          label: SUBSCRIPTION_LABEL,  // Loaded from .env
          amount: SUBSCRIPTION_AMOUNT,  // Loaded from .env
        },
        displayItems: [
          {
            label: '1 Year Subscription',
            amount: SUBSCRIPTION_AMOUNT,  // Loaded from .env
          }
        ]
      }
    );

    // Checking whether Apple Pay is available
    paymentRequest.canMakePayments().then((canMakePayment: boolean) => {
      if (canMakePayment) {
        paymentRequest.show().then((paymentResponse: any) => {
          paymentResponse.complete('success'); // Complete the payment
          Alert.alert('Payment Successful', 'Your membership has been upgraded!');
        }).catch((error: any) => {
          Alert.alert('Payment Failed', 'Apple Pay could not complete the payment.');
          console.error('Apple Pay Error:', error);
        });
      } else {
        Alert.alert('Apple Pay Not Available', 'Apple Pay is not supported on this device.');
      }
    }).catch((error: any) => {
      console.error('Error checking Apple Pay:', error);
    });
  };

  // ** This is the function that was missing **
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
                {/* Conditionally render the Upgrade button */}
                {/* {(membershipStatus === 'Basic Membership' || membershipStatus === 'Limited Access') && (
                  <TouchableOpacity style={[styles.upgradeButton, { borderColor: styles.drawerButton.borderColor }]} onPress={handleUpgrade}>
                    <Text style={styles.upgradeButtonText}>Upgrade</Text>
                  </TouchableOpacity>
                )} */}
              </>
            )}
          </View>
        </View>

        <View style={styles.drawerItemListContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('BaseHome')}
            style={styles.drawerButton}
          >
            <Ionicons name="home" size={20} color="#f5e6a0" />
            <Text style={styles.drawerButtonText}>Home</Text>
          </TouchableOpacity>

          {!user && (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}
              style={styles.drawerButton}
            >
              <Ionicons name="log-in" size={20} color="#f5e6a0" />
              <Text style={styles.drawerButtonText}>Login</Text>
            </TouchableOpacity>
          )}

          {user && (
            <TouchableOpacity onPress={handleLogout} style={styles.drawerButton}>
              <Ionicons name="log-out" size={20} color="#f5e6a0" />
              <Text style={styles.drawerButtonText}>Logout</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => props.navigation.navigate('PrivacyPolicy')} style={styles.drawerButton}>
            <Ionicons name="book" size={20} color="#f5e6a0" />
            <Text style={styles.drawerButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* Floating Share and Chat Buttons */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleShare}>
        <Ionicons name="share-social" size={28} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.floatingChatButton, { right: isTablet ? 90 : 20 }]}
        onPress={handleWhatsAppShare} // Call the WhatsApp Share function
      >
        <Ionicons name="logo-whatsapp" size={28} color="white" />
      </TouchableOpacity>

      {/* Share Modal */}
      <Modal visible={shareModalVisible} transparent={true} animationType="slide" onRequestClose={closeModal}>
        {/* Modal content */}
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
    paddingBottom: 20, // Allow space for smaller screens
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
  upgradeButton: {
    backgroundColor: '#f5e6a0',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 3,
  },
  upgradeButtonText: {
    color: '#72616d',
    fontSize: 16,
    fontWeight: 'bold',
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
  },
});