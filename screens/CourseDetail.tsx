// CourseDetailScreen.tsx
import React from 'react';
import { useRoute } from '@react-navigation/native';

import { courses } from '../data/courses';
import { Text,ScrollView,StyleSheet } from 'react-native';
import { CourseDetailLayout } from '../layout/CourseDetailLayout';


const CourseDetailScreen: React.FC = () => {
  const route = useRoute();
  const { courseId } = route.params as { courseId: string };

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return <Text>Course not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <CourseDetailLayout
        courseTitle={course.title}
        courseImage={course.image}
        sections={course.sections}
        lessons={course.lessons}
        reviews={course.reviews}
        author={course.author}
        courseTheme={course.courseTheme}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30, // Space at the bottom to allow smooth scrolling
  },
});

export default CourseDetailScreen;
