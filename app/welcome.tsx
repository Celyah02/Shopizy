import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>🛍️ Welcome to My Shop</Text>
        <Text style={styles.subtitle}>Your one-stop destination for amazing products</Text>
      </View>

      {/* Illustration Section */}
      <View style={styles.illustrationContainer}>
        <View style={styles.shoppingIcon}>
          <Text style={styles.shoppingEmoji}>🛒</Text>
        </View>
        <Text style={styles.illustrationText}>Discover amazing products</Text>
        <Text style={styles.illustrationSubtext}>Browse through our curated collection</Text>
      </View>

      {/* Features Section */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🚚</Text>
          <Text style={styles.featureText}>Fast Delivery</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>💳</Text>
          <Text style={styles.featureText}>Secure Payment</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>⭐</Text>
          <Text style={styles.featureText}>Quality Products</Text>
        </View>
      </View>

      {/* Action Section */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        <Text style={styles.loginText}>
          Already have an account? 
          <Text style={styles.loginLink}> Sign In</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.1,
    marginBottom: height * 0.05,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#11181C',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 24,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: height * 0.08,
  },
  shoppingIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  shoppingEmoji: {
    fontSize: 60,
  },
  illustrationText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 8,
  },
  illustrationSubtext: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: height * 0.08,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#11181C',
    fontWeight: '500',
    textAlign: 'center',
  },
  actionContainer: {
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#216694ff',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  loginLink: {
    color: '#216694ff',
    fontWeight: '600',
  },
});

export default WelcomeScreen;
