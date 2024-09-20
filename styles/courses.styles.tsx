import { StyleSheet } from "react-native";

export const coursesStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Full background to remove any white space
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  header: {
    width: '100%',
    height: 410,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 8,
    borderRadius: 20,
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 0, // Remove horizontal padding to eliminate left and right space
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  courseInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: 'row',
    padding: 10,
    minHeight: 120,
    width: '100%', // Ensure full width of the card
  },
  cardImage: {
    width: 120,
    height: 150,
    borderRadius: 20,
    margin: 10,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  cardTime: {
    fontSize: 14,
    color: '#888',
  },
  cardDescription: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    marginBottom: 5,
  },
  accessButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 6,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  accessButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedContainer: {
    marginTop: 12,
    flexDirection: 'row',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedText: {
    marginLeft: 4,
  },
  upgradeButtonContainer: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeButton: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  upgradeButtonText: {
    color: '#000',
    fontSize: 12,
  },
  floatingButton: {
    position: 'absolute',  // Ensure the button is floating
    bottom: 770,            // Adjust the vertical position to be 20px from the bottom
    right: 20,             // Adjust the horizontal position from the right
    width: 60,             // Set button size
    height: 60,
    borderRadius: 30,      // Make it circular
    backgroundColor: '#008fd8',  // Give it a visible color
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,          // Ensure it is above other elements
    shadowColor: '#000',   // Add shadow for visibility
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
