import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Placeholder data based on the provided screenshot
const lessons = [
  {
    day: 'Day 1 - Energy',
    lessons: [
      { id: '1', title: 'Learn - Kapalbhati and Bhastrika Pranayama', videoUrl: 'https://d1yei2z3i6k35z.cloudfront.net/3208501/6409a3c2e2f0f_IntroductionSleepCourse.mp4' },
    ],
  },
];

const reviews = [
  {
    id: '1',
    reviewer: 'Phillip Mouton',
    rating: 4,
    text: 'The Knowledge , clarity and more energy ... the instructions was clear and easy to follow.',
  },
  {
    id: '2',
    reviewer: 'Sabina',
    rating: 5,
    text: 'My self awareness has improved, I can meditate better because of improved concentration on my breath',
  },
  // Add more reviews as needed
];

const author = {
  name: 'Abhi Duggal, your breathwork coach.',
  bio: 'Abhi Duggal, a renowned holistic health expert and certified yoga and meditation teacher, is the founder of popular YouTube channels. Meditate with Abhi and The School of Breath. With over 25 years of experience, Abhi blends ancient yogic wisdom with modern neuroscience to offer transformative practices in yoga, pranayama breathing, meditation, and sleep mastery, reaching a wide audience with his trusted and insightful teachings.',
  profileImage: require('../assets/courses/Abhi.jpg'), // replace with actual path to the profile image
};

const CourseDetailScreen: React.FC = () => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'Playlist' | 'Review' | 'Author'>('Playlist');
  const navigation = useNavigation();

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const handleLessonPress = (lesson) => {
    if (lesson.videoUrl) {
      navigation.navigate('VideoPlayer', { videoUrl: lesson.videoUrl,fromYoutube:true });
    } else {
      console.log(`Lesson ${lesson.id} pressed`);
    }
  };

  const handleTabPress = (tab: 'Playlist' | 'Review' | 'Author') => {
    setSelectedTab(tab);
    console.log(`Tab ${tab} pressed`);
  };

  const renderLesson = ({ item }) => (
    <TouchableOpacity onPress={() => handleLessonPress(item)} style={styles.lessonContainer}>
      <Ionicons name="radio-button-off" size={24} color="#4A90E2" />
      <View style={styles.lessonInfo}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDay = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.dayContainer} onPress={() => toggleDay(item.day)}>
        <Text style={styles.dayText}>{expandedDay === item.day ? 'ᐁ' : 'ᐅ'} {item.day}</Text>
      </TouchableOpacity>
      {expandedDay === item.day && (
        <FlatList
          data={item.lessons}
          renderItem={renderLesson}
          keyExtractor={(lesson) => lesson.id}
        />
      )}
    </View>
  );

  const renderReview = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Ionicons name="person-circle" size={24} color="#4A90E2" />
      <View style={styles.reviewInfo}>
        <Text style={styles.reviewerName}>{item.reviewer}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(item.rating)].map((_, index) => (
            <Ionicons key={index} name="star" size={16} color="#FFD700" />
          ))}
        </View>
        <Text style={styles.reviewText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/Breathwork.jpg')} style={styles.courseInfoBackground}>
        <View style={styles.courseInfoOverlay}>
          <Text style={styles.courseTitle}>9-Day Breathwork Challenge for Energy, Health & Vitality</Text>
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
      {selectedTab === 'Playlist' && (
        <FlatList
          data={lessons}
          renderItem={renderDay}
          keyExtractor={(item) => item.day}
          contentContainerStyle={styles.listContainer}
        />
      )}
      {selectedTab === 'Review' && (
        <FlatList
          data={reviews}
          renderItem={renderReview}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
      {selectedTab === 'Author' && (
        <ScrollView contentContainerStyle={styles.authorContainer}>
          <Image source={author.profileImage} style={styles.authorImage} />
          <Text style={styles.authorName}>{author.name}</Text>
          <Text style={styles.authorBio}>{author.bio}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  courseInfoBackground: {
    width: '100%',
    height: 490,
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
    fontSize: 20,
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
    backgroundColor: '#CCFFFF',
  },
  tabText: {
    fontSize: 16,
    color: '#4A90E2',
  },
  activeTabText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  listContainer: {
    padding: 20,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#F0FFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lessonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  lessonInfo: {
    marginLeft: 10,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonDescription: {
    fontSize: 14,
    color: '#888',
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewInfo: {
    marginLeft: 10,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    fontSize: 14,
    color: '#888',
  },
  authorContainer: {
    alignItems: 'center',
    padding: 20,
  },
  authorImage: {
    width: 160,
    height: 180,
    borderRadius: 1,
    marginBottom: 30,
  },
  authorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorBio: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CourseDetailScreen;
