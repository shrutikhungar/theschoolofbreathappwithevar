import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import categoryService from '../../services/category.service';

export interface CategoryType {
  name: string;
  slug: string;
  type: string;
  _id: string;
}

type CategoryModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSelectCategory: (category: CategoryType) => void;
  selectedCategory: CategoryType | null;
};

export const CategoryModal: React.FC<CategoryModalProps> = ({ isVisible, onClose, onSelectCategory, selectedCategory }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await categoryService.getCategories();
      setCategories(data.filter(item => item.type === 'music'));
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchCategories();
    }
  }, [isVisible]);

  const handleCategoryPress = (category: CategoryType) => {
    onSelectCategory(category);
    onClose();
  };

  const renderCategoryItem = ({ item }: { item: CategoryType }) => (
    <TouchableOpacity
      style={[styles.categoryItem, selectedCategory?._id === item._id && styles.selectedCategory]}
      onPress={() => handleCategoryPress(item)}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>SELECT CATEGORY</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#695c83" />
          ) : (
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.categoryList}
            />
          )}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#dcd0e9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#695c83',
  },
  categoryList: {
    width: '100%',
  },
  categoryItem: {
    width: '100%', // Make all buttons full width
    maxWidth: 400, // Set a maximum width to prevent overly long buttons
    padding: 15,
    backgroundColor: '#695c83',
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'center', // Center the button horizontally within the container
  },
  selectedCategory: {
    borderColor: '#1DB954',
    borderWidth: 2,
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#695c83',
    borderRadius: 15,
    alignItems: 'center',
    width: '100%', // Make close button full width
    maxWidth: 300, // Set a maximum width
    alignSelf: 'center', // Center the button horizontally within the container
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});


