import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SwaraYogaCourseScreen: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedSubsection, setExpandedSubsection] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'Playlist' | 'Review' | 'Author'>('Playlist');
  const navigation = useNavigation();
};

export default SwaraYogaCourseScreen;
