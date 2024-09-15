// styles/courseStyles.ts

import { StyleSheet } from 'react-native';

export interface ThemeColors {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  headerColor: string;
  courseTitleColor: string;
  instructorTextColor: string;
  tabBackgroundColor: string;
  dayBackgroundColor: string;
  sectionBackgroundColor: string;
  subsectionBackgroundColor: string;
  lessonBackgroundColor: string;
  reviewBackgroundColor: string;
  descriptionColor: string;
}

export const courseThemes: { [key: string]: ThemeColors } = {
  default: {
    primaryColor: '#4A90E2',
    secondaryColor: '#CCFFFF',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    accentColor: '#FFD700',
    headerColor: '#4A90E2',
    courseTitleColor: '#FFFFFF',
    instructorTextColor: '#FFFFFF',
    tabBackgroundColor: '#CCFFFF',
    dayBackgroundColor: '#F0FFFF',
    sectionBackgroundColor: '#F0FFFF',
    subsectionBackgroundColor: '#FFFFFF',
    lessonBackgroundColor: '#FFFFFF',
    reviewBackgroundColor: '#F8F8F8',
    descriptionColor: '#888888',
  },
  swaraYoga: {
    primaryColor: '#8e7f7d',
    secondaryColor: '#d6c6c2',
    backgroundColor: '#f9f2f2',
    textColor: '#8e7f7d',
    accentColor: '#f1e2e0',
    headerColor: '#8e7f7d',
    courseTitleColor: '#d6c6c2',
    instructorTextColor: '#f7ebea',
    tabBackgroundColor: '#d6c6c2',
    dayBackgroundColor: '#f1e2e0',
    sectionBackgroundColor: '#f1e2e0',
    subsectionBackgroundColor: '#f8eeed',
    lessonBackgroundColor: '#f8eeed',
    reviewBackgroundColor: '#f8eeed',
    descriptionColor: '#888',
  },
  meditation: {
    primaryColor: '#4A90E2',
    secondaryColor: '#CCFFFF',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    accentColor: '#F0FFFF',
    headerColor: '#4A90E2',
    courseTitleColor: '#FFFFFF',
    instructorTextColor: '#FFFFFF',
    tabBackgroundColor: '#CCFFFF',
    dayBackgroundColor: '#F0FFFF',
    sectionBackgroundColor: '#F0FFFF',
    subsectionBackgroundColor: '#FFFFFF',
    lessonBackgroundColor: '#FFFFFF',
    reviewBackgroundColor: '#e0fffe',
    descriptionColor: '#888888',
  },
  restfulSleep: {
    primaryColor: '#4A90E2',
    secondaryColor: '#CCFFFF',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    accentColor: '#F0FFFF',
    headerColor: '#4A90E2',
    courseTitleColor: '#FFFFFF',
    instructorTextColor: '#FFFFFF',
    tabBackgroundColor: '#CCFFFF',
    dayBackgroundColor: '#F0FFFF',
    sectionBackgroundColor: '#F0FFFF',
    subsectionBackgroundColor: '#e8eff6',
    lessonBackgroundColor: '#e8eff6',
    reviewBackgroundColor: '#f8f8f8',
    descriptionColor: '#888888',
  },
  breathwork: {
    primaryColor: '#4A90E2',
    secondaryColor: '#CCFFFF',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    accentColor: '#F0FFFF',
    headerColor: '#4A90E2',
    courseTitleColor: '#FFFFFF',
    instructorTextColor: '#FFFFFF',
    tabBackgroundColor: '#CCFFFF',
    dayBackgroundColor: '#F0FFFF',
    sectionBackgroundColor: '#F0FFFF',
    subsectionBackgroundColor: '#FFFFFF',
    lessonBackgroundColor: '#FFFFFF',
    reviewBackgroundColor: '#f8f8f8',
    descriptionColor: '#888888',
  },
  blissCourse: {
    primaryColor: '#bd9028',
    secondaryColor: '#efe1c0',
    backgroundColor: '#f9f2f2',
    textColor: '#bd9028',
    accentColor: '#faf5e9',
    headerColor: '#bd9028',
    courseTitleColor: '#efe1c0',
    instructorTextColor: '#efe1c0',
    tabBackgroundColor: '#efe1c0',
    dayBackgroundColor: '#efe1c0',
    sectionBackgroundColor: '#efe1c0',
    subsectionBackgroundColor: '#faf5e9',
    lessonBackgroundColor: '#faf5e9',
    reviewBackgroundColor: '#faf5e9',
    descriptionColor: '#888',
  },
};

export const createCourseStyles = (theme: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  header: {
    backgroundColor: theme.headerColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: theme.backgroundColor,
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
    fontSize: 21,
    fontWeight: 'bold',
    color: theme.courseTitleColor,
    marginBottom: 5,
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorText: {
    marginLeft: 5,
    fontSize: 14,
    color: theme.instructorTextColor,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: theme.tabBackgroundColor,
  },
  tabText: {
    fontSize: 16,
    color: theme.primaryColor,
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
    backgroundColor: theme.dayBackgroundColor,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: '100%', // Ensure day container takes up the full width of its parent
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.textColor,
  },
  sectionContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: theme.sectionBackgroundColor,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: '100%', // Ensure section container takes up the full width of its parent
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.textColor,
  },
  subsectionContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: theme.subsectionBackgroundColor,
    borderRadius: 10,
    width: '100%', // Ensure subsection container takes up the full width of its parent
  },
  subsectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.textColor,
  },
  lessonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 20,
    padding: 12, // Increased padding for thickness
    backgroundColor: theme.lessonBackgroundColor,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: '100%', // Ensure the container takes up the full width of its parent
  },
  lessonInfo: {
    marginLeft: 10,
    flex: 1, // Ensure text takes up remaining space
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.textColor,
  },
  lessonDescription: {
    fontSize: 14,
    color: theme.descriptionColor,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: theme.reviewBackgroundColor,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: '100%', // Ensure review container takes up the full width of its parent
  },
  reviewInfo: {
    marginLeft: 10,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.textColor,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    fontSize: 14,
    color: theme.descriptionColor,
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
    color: theme.textColor,
  },
  authorBio: {
    fontSize: 14,
    color: theme.descriptionColor,
    textAlign: 'center',
    marginTop: 10,
  },
  pdfContainer: {
    paddingHorizontal: 30,
    marginTop: 10,
    paddingBottom:20
  },
  pdfTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pdfItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pdfText: {
    marginLeft: 10,
    fontSize: 14,
    color: theme.primaryColor || '#4A90E2',
  },
});

