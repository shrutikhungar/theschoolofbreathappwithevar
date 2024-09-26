// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the "X" icon

// interface CustomAlertProps {
//   message: string;
//   type: 'success' | 'error';
//   onClose: () => void;
// }

// export const CustomAlert: React.FC<CustomAlertProps> = ({ message, type, onClose }) => {
//   return (
//     <View style={[styles.container, type === 'success' ? styles.success : styles.error]}>
//       <Text style={[styles.message, type === 'success' ? styles.successText : styles.errorText]}>
//         {message}
//       </Text>
//       <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//         <Ionicons 
//           name="close" 
//           size={20} 
//           color={type === 'success' ? '#155724' : '#721c24'} // Change icon color based on type
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 10,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   success: {
//     backgroundColor: '#D4EDDA',
//     borderColor: '#C3E6CB',
//   },
//   error: {
//     backgroundColor: '#F8D7DA',
//     borderColor: '#F5C6CB',
//   },
//   message: {
//     fontSize: 16,
//     flex: 1,
//     paddingRight: 10, // Add padding to avoid overlap with close button
//   },
//   successText: {
//     color: '#155724',
//   },
//   errorText: {
//     color: '#721c24',
//   },
//   closeButton: {
//     padding: 5,
//     borderRadius: 5,
//   },
// });


