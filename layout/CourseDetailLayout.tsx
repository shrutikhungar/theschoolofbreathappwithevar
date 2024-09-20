//CourseDetailLayout.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Author, Lesson, Review, Section, Subsection } from '../models/courses';
import { courseThemes, createCourseStyles, ThemeColors } from '../styles/coursesDetails.styles';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';
import { web_app_url } from '../utils/api.config';

interface CourseDetailLayoutProps {
  courseTitle: string;
  courseImage: any;
  sections?: Section[]; // Optional sections
  lessons?: Section[]; // Optional lessons (if no sections)
  reviews: Review[];
  author: Author;
  courseTheme?: keyof typeof courseThemes;
  customTheme?: ThemeColors;
}

type CourseListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VideoPlayer'>;

export const CourseDetailLayout: React.FC<CourseDetailLayoutProps> = ({
  courseTitle,
  courseImage,
  sections,
  lessons,
  reviews,
  author,
  courseTheme = 'default',
  customTheme,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedSubsection, setExpandedSubsection] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'Playlist' | 'Review' | 'Author'>('Playlist');
  const navigation = useNavigation<CourseListScreenNavigationProp>();

  // Toggle sections
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
    setExpandedSubsection(null);
  };

  // Open link in browser
  const _handlePressButtonAsync = async (link: string) => {
    await WebBrowser.openBrowserAsync(link);
  };

  // Toggle subsections
  const toggleSubsection = (subsection: string) => {
    setExpandedSubsection(expandedSubsection === subsection ? null : subsection);
  };

  // Handle lesson press (differentiating between YouTube, PDFs, and other videos)
  const handleLessonPress = async (lesson: Lesson) => {
    if (lesson.type === 'file' && lesson.file) {
      // Open PDF link in browser
      const pdfUrl = encodeURIComponent(lesson.file);
      const webAppUrl = `${web_app_url}/pdfViewer?pdfUrl=${pdfUrl}`;
      await _handlePressButtonAsync(webAppUrl);
    } else if (lesson.videoUrl) {
      // Handle YouTube videos vs non-YouTube videos
      if (lesson.isFromYoutube) {
        navigation.navigate('VideoPlayer', { videoUrl: lesson.videoUrl, fromYoutube: true });
      } else {
        navigation.navigate('VideoPlayer', { videoUrl: lesson.videoUrl, fromYoutube: false });
      }
    } else {
      console.log(`Lesson ${lesson.id} pressed`);
    }
  };

  // Handle tab switching
  const handleTabPress = (tab: 'Playlist' | 'Review' | 'Author') => {
    setSelectedTab(tab);
  };

  // Dynamic styles based on the theme
  const theme = customTheme || courseThemes[courseTheme];
  const styles = createCourseStyles(theme);

  // Render a lesson item
  const renderLesson = ({ item }: { item: Lesson }) => (
    <TouchableOpacity onPress={() => handleLessonPress(item)} style={styles.lessonContainer}>
      <Ionicons name="radio-button-off" size={24} color="#4A90E2" />
      <View style={styles.lessonInfo}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render subsections
  const renderSubsection = (subsection: Subsection) => (
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

  // Render sections
  const renderSection = ({ item }: { item: Section }) => (
    <View key={item.section}>
      <TouchableOpacity style={styles.sectionContainer} onPress={() => toggleSection(item.section)}>
        <Text style={styles.sectionText}>{expandedSection === item.section ? 'ᐁ' : 'ᐅ'} {item.section}</Text>
      </TouchableOpacity>
      {expandedSection === item.section && item.subsections && (
        <View>
          {item.subsections.map((subsection) => renderSubsection(subsection))}
        </View>
      )}
      {expandedSection === item.section && item.lessons && (
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
      {/* Course Information Section */}
      <ImageBackground source={courseImage} style={styles.courseInfoBackground}>
        <View style={styles.courseInfoOverlay}>
          <Text style={styles.courseTitle}>{courseTitle}</Text>
          <View style={styles.instructorContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.instructorText}>4.7 (323 ratings)</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Tab Navigation */}
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

      {/* Playlist Tab */}
      {selectedTab === 'Playlist' && sections && (
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={(item) => item.section}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Reviews Tab */}
      {selectedTab === 'Review' && (
        <FlatList
          data={reviews}
          renderItem={({ item }) => (
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
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Author Tab */}
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
