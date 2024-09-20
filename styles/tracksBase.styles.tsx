//tracksBase.styles.tsx
import { StyleSheet } from "react-native";
import { DARK_COLOR } from "./playerScreen.styles";

export const tracksStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 290,
  },
  topImageBackground: {
    width: '100%',
    height: 290,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 21,
    paddingTop: 50, // Reduce padding to move the button up
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#49405b',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.4)',
    padding: 2,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    marginTop: -40
  },
  categoryButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedCategoryBadge: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,.4)',
    borderRadius: 10,
    padding: 5,
    marginLeft: 10,
    marginTop: -40,
    borderWidth: 2,
    borderColor: '#ddd'
  },
  selectedCategoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  clearButton: {
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b8afc7',
    borderRadius: 20,
    margin: 2,
    marginBottom:9,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#825d85',
    shadowColor: '#000',
  },
  searchIcon: {
    marginRight: 10,
    color: '#ffff',
    
  },
  searchInput: {
    flex: 1,
    height: 30,
    fontSize: 15,
    color: '#ffff'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackList: {
    paddingHorizontal: 0,
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  upgradeButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeButton: {
    backgroundColor: '#72616d',  // Updated to match the gradient's start color
    padding: 10,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#e8cfb1',
    shadowColor: '#000',
  },
  upgradeButtonText: {
    color: '#e8cfb1', // Light text color for contrast
    fontSize: 16,
    fontWeight: 'bold',
  }, 
  trackListContainer: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 4,
    borderRadius: 20,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#a593a4',  // Updated to match the gradient color
    borderWidth: 3,
    borderColor: '#ddd',
    shadowColor: '#000',
  },
  activeTabButton: {
    backgroundColor: '#72616d',  // Updated to match the gradient's start color
  },
  tabButtonText: {
    fontSize: 16,
    color: '#fff',  // White color to contrast with the button background
  },
  activeTabButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
