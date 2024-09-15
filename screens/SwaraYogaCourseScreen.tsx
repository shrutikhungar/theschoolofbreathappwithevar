import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SwaraYogaCourseScreen: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedSubsection, setExpandedSubsection] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'Playlist' | 'Review' | 'Author'>('Playlist');
  const navigation = useNavigation();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
    setExpandedSubsection(null); // Reset subsection expansion when section is toggled
  };

  const toggleSubsection = (subsection: string) => {
    setExpandedSubsection(expandedSubsection === subsection ? null : subsection);
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
  };

  const renderLesson = ({ item }) => (
    <TouchableOpacity onPress={() => handleLessonPress(item)} style={styles.lessonContainer}>
      <Ionicons name="radio-button-off" size={24} color="#4A90E2" />
      <View style={styles.lessonInfo}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSubsection = (subsection) => (
    <View key={subsection.title}>
      {subsection.title ? (
        <TouchableOpacity style={styles.subsectionContainer} onPress={() => toggleSubsection(subsection.title)}>
          <Text style={styles.subsectionText}>{expandedSubsection === subsection.title ? 'ᐁ' : 'ᐅ'} {subsection.title}</Text>
        </TouchableOpacity>
      ) : null}
      {(expandedSubsection === subsection.title || !subsection.title) && (
        <FlatList
          data={subsection.lessons}
          renderItem={renderLesson}
          keyExtractor={(lesson) => lesson.id}
        />
      )}
    </View>
  );

  const renderSection = ({ item }) => (
    <View key={item.section}>
      <TouchableOpacity style={styles.sectionContainer} onPress={() => toggleSection(item.section)}>
        <Text style={styles.sectionText}>{expandedSection === item.section ? 'ᐁ' : 'ᐅ'} {item.section}</Text>
      </TouchableOpacity>
      {expandedSection === item.section && (
        <View>
          {item.subsections.map((subsection) => renderSubsection(subsection))}
        </View>
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
      <ImageBackground source={require('../assets/SwaraYogaCourseImage.png')} style={styles.courseInfoBackground}>
        <View style={styles.courseInfoOverlay}>
          <Text style={styles.courseTitle}>Swara Yoga Course</Text>
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
          renderItem={renderSection}
          keyExtractor={(item) => item.section}
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
        <View style={styles.authorContainer}>
          <Image source={author.profileImage} style={styles.authorImage} />
          <Text style={styles.authorName}>{author.name}</Text>
          <Text style={styles.authorBio}>{author.bio}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f2f2',
  },
  courseInfoBackground: {
    width: '100%',
    height: 450,
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
    fontSize: 21,
    fontWeight: 'bold',
    color: '#d6c6c2',
    marginBottom: 5,
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#f7ebea',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#d6c6c2',
  },
  tabText: {
    fontSize: 16,
    color: '#8e7f7d',
  },
  activeTabText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  listContainer: {
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f1e2e0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8e7f7d',
  },
  subsectionContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8eeed',
    borderRadius: 10,
  },
  subsectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8e7f7d',
  },
  lessonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 20,
    backgroundColor: '#f8eeed',
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
    fontSize: 18,
    color: '#8e7f7d',
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8eeed',
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
    borderRadius: 10,
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

export default SwaraYogaCourseScreen;
