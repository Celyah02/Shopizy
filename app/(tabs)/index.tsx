import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity, Modal, ScrollView, Platform } from 'react-native';
import { useCart } from '../../contexts/CartContext';

type Product = {
  name: string;
  price: string;
  delivery: string;
};

const HomeScreen = () => {
  const [products] = useState<Product[]>([
    { name: 'Product 1', price: '$10.00', delivery: 'Free Delivery' },
    { name: 'Product 2', price: '$15.00', delivery: 'Free Delivery' },
    { name: 'Product 3', price: '$20.00', delivery: 'Fast Delivery' },
    { name: 'Product 4', price: '$30.00', delivery: 'Free Delivery' },
    { name: 'Product 5', price: '$50.00', delivery: 'Fast Delivery' },
    { name: 'Product 6', price: '$100.00', delivery: 'Free Delivery' },
    { name: 'Product 7', price: '$158.00', delivery: 'Free Delivery' },
    { name: 'Product 8', price: '$202.00', delivery: 'Fast Delivery' },
    { name: 'Product 9', price: '$309.00', delivery: 'Free Delivery' },
    { name: 'Product 10', price: '$150.00', delivery: 'Fast Delivery' },
    { name: 'Product 11', price: '$180.00', delivery: 'Free Delivery' },
    { name: 'Product 12', price: '$158.00', delivery: 'Free Delivery' },
    { name: 'Product 13', price: '$200.00', delivery: 'Fast Delivery' },
    { name: 'Product 14', price: '$300.00', delivery: 'Free Delivery' },
    { name: 'Product 15', price: '$500.00', delivery: 'Fast Delivery' },
  ]);

  const { cart, addToCart, isCartVisible, setIsCartVisible } = useCart();

  const handlePress = (item: Product) => {
    addToCart(item);
    Alert.alert('Added to Cart', `${item.name} has been added to your cart!`);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Text style={styles.rowText}>{item.name}</Text>
      <Text style={styles.priceText}>{item.price}</Text>
      <Text style={styles.deliveryText}>{item.delivery}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handlePress(item)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHorizontalItem = ({ item }: { item: Product }) => (
    <View style={styles.featuredCard}>
      <Text style={styles.featuredName}>{item.name}</Text>
      <Text style={styles.featuredPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.featuredButton} onPress={() => handlePress(item)}>
        <Text style={styles.featuredButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screen}>

      {/* Featured (Horizontal) */}
      <View style={styles.featuredSection}>
        <Text style={styles.featuredTitle}>Featured</Text>
        <FlatList
          data={products}
          horizontal
          renderItem={renderHorizontalItem}
          keyExtractor={(item) => `h-${item.name}`}
          contentContainerStyle={styles.featuredList}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Product Grid */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />

      {/* Cart Modal */}
      <Modal visible={isCartVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>🛒 Your Cart</Text>
          {cart.length === 0 ? (
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
          ) : (
            <ScrollView>
              {cart.map((item: Product, index: number) => (
                <View key={index} style={styles.cartItem}>
                  <Text style={styles.cartItemText}>
                    {item.name} - {item.price}
                  </Text>
                </View>
              ))}
            </ScrollView>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsCartVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close Cart</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#216694ff',
    alignItems: 'center',
  },
  featuredSection: {
    paddingTop: 10,
    paddingBottom: 6,
  },
  featuredTitle: {
    paddingHorizontal: 12,
    paddingBottom: 6,
    fontSize: 16,
    fontWeight: '700',
    color: '#11181C',
  },
  featuredList: {
    paddingHorizontal: 10,
  },
  featuredCard: {
    width: 200,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  featuredName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#11181C',
  },
  featuredPrice: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  featuredButton: {
    marginTop: 10,
    backgroundColor: '#11181C',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  featuredButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  cartBadge: {
    backgroundColor: '#E74C3C',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cartBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  productCard: {
    flex: 1,
    margin: 8,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  rowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#27AE60',
    marginVertical: 4,
  },
  deliveryText: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2980B9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },
  cartItem: {
    padding: 12,
    backgroundColor: '#fff',
    marginVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cartItemText: {
    fontSize: 16,
    color: '#333',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: '#2980B9',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default HomeScreen;