import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get('window');

// Define breakpoints for phone and tablet
const isTablet = width >= 768;

export const MAIN_COLOR = '#EEDFFE';
export const DARK_COLOR = '#060005';
export const PURPLE_COLOR = '#571CB3';
export const PURPLE_COLOR_SOFT = '#8C66C8';
export const BG_COLOR = MAIN_COLOR;
export const BUTTON_COLOR = DARK_COLOR;

export const playerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: 'transparent', // Ensures the background image is visible
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '110%',
    resizeMode: 'cover',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },

  trackImageContainer: {
    width: width * 0.5, // 50% of screen width
    height: width * 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 90, // Move the image slightly upwards
  },
  trackImage: {
    resizeMode: 'contain', // Base style for track image
  },
  trackImagePhone: {
    marginTop: 150,
    width: 250, // Increase size for phone
    height: 350, // Adjust height proportionally
  },
  trackImageTablet: {
    width: 340, // Keep size unchanged for tablet
    height: 340,
  },
  trackInfoContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    // Separate top margin for phone and tablet
    marginTop: isTablet ? 40 : 150, // Adjust top margin for phone vs tablet
    fontSize: 24,
    fontWeight: 'bold',
    color: DARK_COLOR,
  },
  controlsContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  playPauseButton: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  volumeContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  volumeLabel: {
    marginRight: 10,
    color: DARK_COLOR,
  },
  slider: {
    width: 200,
  },
  stopButton: {
    marginTop: 20,
    color: 'RED',
  },
  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    textAlign: 'center',
  },
  optionText: {
    textAlign: 'center',
    color: DARK_COLOR,
    marginTop: 8,
  },
});

export default playerStyles;
