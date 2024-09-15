import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CourseDetailScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Playlist');

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={{ uri: 'https://your-banner-image-url.jpg' }}
        style={styles.banner}
      >
        <View style={styles.courseInfoOverlay}>
          <Text style={styles.courseTitle}>9-Day Meditation Course</Text>
          <View style={styles.instructorContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.instructorText}>4.7 (323 ratings)</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => handleTabPress('Playlist')}>
          <Text style={[styles.tabText, selectedTab === 'Playlist' && styles.activeTabText]}>Playlist</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Review')}>
          <Text style={[styles.tabText, selectedTab === 'Review' && styles.activeTabText]}>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Author')}>
          <Text style={[styles.tabText, selectedTab === 'Author' && styles.activeTabText]}>Author</Text>
        </TouchableOpacity>
      </View>
      {selectedTab === 'Author' && (
        <View style={styles.authorSection}>
          <Image
            source={{ uri: 'https://your-author-image-url.jpg' }}
            style={styles.authorImage}
          />
          <Text style={styles.authorName}>Abhi Duggal, your breathwork coach.</Text>
          <Text style={styles.authorBio}>
            Abhi Duggal, a renowned holistic health expert and certified yoga and meditation teacher, is the founder of popular YouTube channels. Meditate with Abhi and The School of Breath. With over 25 years of experience, Abhi blends ancient yogic wisdom with modern neuroscience to offer transformative practices in yoga, pranayama breathing, meditation, and sleep mastery, reaching a wide audience with his trusted and insightful teachings.
          </Text>
        </View>
      )}
      {/* Additional components for Playlist and Review tabs can be added similarly */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  courseInfoOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#E0F7FA',
  },
  tabText: {
    fontSize: 16,
    color: '#00796B',
  },
  activeTabText: {
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#00796B',
  },
  authorSection: {
    alignItems: 'center',
    padding: 20,
  },
  authorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  authorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  authorBio: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginHorizontal: 20,
  },
});

export default CourseDetailScreen;
