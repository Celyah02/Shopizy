import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../utils/api';

const AddProductScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!name.trim() || !description.trim()) {
      return Alert.alert('Error', 'Please enter name and description');
    }
    setIsSubmitting(true);
    try {
      await api.createProduct({ name: name.trim(), description: description.trim() });
      Alert.alert('Success', 'Product added');
      router.back();
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Product description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={isSubmitting}>
        <Text style={styles.buttonText}>{isSubmitting ? 'Submitting...' : 'Add Product'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16,
    color: '#11181C',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#11181C',
    marginBottom: 12,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#216694ff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AddProductScreen;


