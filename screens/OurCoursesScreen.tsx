import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type OurCoursesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OurCoursesScreen'>;

export default function OurCoursesScreen() {
  const navigation = useNavigation<OurCoursesScreenNavigationProp>();

  return (
    <View style={{ flex: 1 }}>
      {/* WebView to load the courses page */}
      <WebView
        source={{ uri: 'https://www.meditatewithabhi.com/courses' }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#72616d',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    paddingRight: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
