import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    container: {
      flex: 1,
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '50%',
      resizeMode: 'cover',
    },
    welcomeText: {
      fontSize: 24,
      color: '#000000',
      fontFamily: 'Julius Sans One',
      marginVertical: 20,
    },
    input: {
      width: '80%',
      height: 40,
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      paddingHorizontal: 10,
      marginVertical: 10,
      borderColor: '#000',
      borderWidth: 1,
    },
    forgotPassword: {
      color: '#000000',
      marginVertical: 10,
      textDecorationLine: 'underline',
    },
    submitButton: {
      width: '80%',
      height: 40,
      backgroundColor: '#96A08D',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
      borderColor: '#FFFFFF',
      borderWidth: 1, // Add border for white color
    },
    registerButton: {
      width: '80%',
      height: 40,
      backgroundColor: '#96A08D',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
      borderColor: '#FFFFFF',
      borderWidth: 1, // Add border for white color
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
  });