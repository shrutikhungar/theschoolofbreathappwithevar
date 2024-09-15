
import React from 'react';
import { View, Text,TouchableOpacity,StyleSheet} from 'react-native';

export const ErrorMessage: React.FC<{ message: string, onDismiss: () => void }> = ({ message, onDismiss }) => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
      <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
        <Text style={styles.dismissButtonText}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
  const styles = StyleSheet.create({
    // ... existing styles remain the same
    errorContainer: {
      backgroundColor: '#ffcccb',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    errorText: {
      color: '#d8000c',
      flex: 1,
    },
    dismissButton: {
      backgroundColor: '#d8000c',
      padding: 5,
      borderRadius: 5,
    },
    dismissButtonText: {
      color: 'white',
    },
  });