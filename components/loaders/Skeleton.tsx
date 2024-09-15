// SkeletonLoader.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

const SkeletonLoader: React.FC = () => (
  <ContentLoader
    speed={1.5}
    width={300}
    height={200}
    viewBox="0 0 300 60"
    backgroundColor="#571CB3"
    foregroundColor="#ecebeb"
    style={styles.container}
  >
    <Circle cx="30" cy="30" r="30" />
    <Rect x="70" y="10" rx="4" ry="4" width="180" height="10" />
    <Rect x="70" y="30" rx="4" ry="4" width="140" height="10" />
  </ContentLoader>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default SkeletonLoader;
