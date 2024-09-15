// RestfulSleepCourseScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Data structure for lessons and modules
const modules = [
  {
    module: 'Sleep Mastery Course',
    lessons: [
      { id: '2', title: 'Start here', videoUrl: 'https://storage.googleapis.com/theschoolofbreath/videos/video_2/output.m3u8' },
    ],
  },
  {
    module: 'Module 1 - Lectures',
    lessons: [
      { id: '3', title: 'Lecture 1: The Effect of Light on Circadian Rhythms and Sleep', videoUrl: 'https://www.youtube.com/watch?v=Bo3qaVd47bk' },
      { id: '4', title: 'Lecture 2: The Effect of Sounds on Circadian Rhythms and Sleep', videoUrl: 'https://d1yei2z3i6k35z.cloudfront.net/3208501/6448f13dd4d23_Lesson2Sound4.26.mp4' },
      { id: '5', title: 'Lecture 3: Nose Breathing: Solution to Sleep Apnea and Snoring', videoUrl: 'https://d1yei2z3i6k35z.cloudfront.net/3208501/640d9d5da5356_Lesson4NosevsMouthFinal3.11.23.mp4' },
      { id: '6', title: 'Lecture 4: Intuitive Breathing Techniques for Effortless Sleep', videoUrl: 'https://d1yei2z3i6k35z.cloudfront.net/3208501/63fc57ae298ba_Lesson4IntuitiveBreathingFinal2.27.23.mp4' },
    ],
  },
  {
    module: 'Module 2 - Lectures',
    lessons: [
      { id: '7', title: 'Lecture 5: A Journey into the Sleep Cycles', videoUrl: 'https://d1yei2z3i6k35z.cloudfront.net/3208501/64004f8319ca0_Lesson5SleepCyclesFinal2.28.23.mp4' },
      { id: '8', title: 'Lecture 6: Transform your sleep with humming bee breath', videoUrl: 'https://d1yei2z3i6k35z.cloudfront.net/3208501/640c5140dbba7_Brahmari.mp4' },
      { id: '9', title: 'Lecture 7: Maximize Digestion for Cellular Renewal and Better Sleep', videoUrl: 'https://d1yei2z3i6k35z.cloudfront.net/3208501/63fadd05a008b_Lesson7FoodandDigestion.mp4' },
      { id: '10', title: 'Lecture 8: Elevate your bedtime routine for effortless sleep', videoUrl: 'https://d1yei2z3i6k35z.cloudfront.net/3208501/63fd8830945a6_Lecture8BedtimeroutineFinal2.27.23.mp4' },
    ],
  },
  {
    module: 'Module 3 - Practice',
    lessons: [
      { id: '11', title: 'Morning wake up meditation', videoUrl: 'https://d1yei2z3i6k35z.cloudfront.net/3208501/640f0666ae90b_WakeUpMeditation.mp4' },
      { id: '12', title: 'Trataka: Candle Gazing Meditation', videoUrl: 'https://d1yei2z3i6k35z.cloudfront.net/3208501/640f2bcb4758f_TratakaSleepCourse.mp4' },
      { id: '13', title: 'Yoga Nidra 1: Sleep meditation before bed', videoUrl: 'https://d1yei2z3i6k35z.cloudfront.net/3208501/63fd9a98c02e5_YogaNidra1Feb28th.mp4' },
      { id: '14', title: 'Yoga Nidra 2: Sleep meditation before bed', videoUrl: 'https://d1yei2z3i6k35z.cloudfront.net/3208501/63fdcd8e4e0b2_YogaNidraSleepCourse2.mp4' },
      { id: '15', title: 'Black screen sleep music with healing solfeggio frequencies', videoUrl: 'https://www.youtube.com/watch?v=IPAnovsaMTw&t=1s' },
      { id: '16', title: 'Yoga before bed: sleep-promoting yoga poses', videoUrl: 'https://youtu.be/6PIqJRavPzA' },
    ],
  }
];

const CourseDetailScreen: React.FC = () => {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'Playlist' | 'Review' | 'Author'>('Playlist');
  const navigation = useNavigation();

  const toggleModule = (module: string) => {
    setExpandedModule(expandedModule === module ? null : module);
  };

  const handleLessonPress = (lesson) => {
    if (lesson.videoUrl) {
      navigation.navigate('VideoPlayer', { videoUrl: lesson.videoUrl });
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

  const renderModule = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.dayContainer} onPress={() => toggleModule(item.module)}>
        <Text style={styles.dayText}>{expandedModule === item.module ? 'ᐁ' : 'ᐅ'} {item.module}</Text>
      </TouchableOpacity>
      {expandedModule === item.module && (
        <FlatList
          data={item.lessons}
          renderItem={renderLesson}
          keyExtractor={(lesson) => lesson.id}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/SleepCourse.jpg')} style={styles.courseInfoBackground}>
        <View style={styles.courseInfoOverlay}>
          <Text style={styles.courseTitle}>Restful Sleep Course</Text>
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
          data={modules}
          renderItem={renderModule}
          keyExtractor={(item) => item.module}
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
    shadowOpacity: 0.9,
    shadowRadius: 10,
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
    padding: 10, // Set padding for consistent spacing
    backgroundColor: '#e8eff6',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: '100%', // Make sure the width of the container is consistent
    height: 80, // Set a fixed height for consistency
  },
  lessonInfo: {
    marginLeft: 10,
    flex: 1,
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
