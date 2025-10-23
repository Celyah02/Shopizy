import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

const DrawerContent = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const menuItems = [
    { name: 'Home', icon: 'home', route: '/(tabs)/' },
    { name: 'Explore', icon: 'paperplane', route: '/(tabs)/explore' },
    { name: 'Profile', icon: 'person', route: '/(tabs)/Profile' },
    { name: 'Settings', icon: 'settings', route: '/(tabs)/Settings' },
    { name: 'About', icon: 'information-circle', route: null },
    { name: 'Help', icon: 'help-circle', route: null },
  ];

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => {
            signOut();
            router.replace('/welcome');
            onClose();
          }
        }
      ]
    );
  };

  const handleNavigation = (route: string | null) => {
    if (route) {
      router.push(route as any);
    }
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛍️ My Shop</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* User Info */}
      {user && (
        <View style={styles.userInfo}>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitial}>
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
      )}
      
      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleNavigation(item.route)}
          >
            <Ionicons name={item.icon as any} size={24} color="#2980B9" />
            <Text style={styles.menuText}>{item.name}</Text>
            <Ionicons name="chevron-forward" size={20} color="#7F8C8D" />
          </TouchableOpacity>
        ))}
        
        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutItem}
          onPress={handleSignOut}
        >
          <Ionicons name="log-out" size={24} color="#E74C3C" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#216694ff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  closeButton: {
    padding: 5,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#11181C',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerText: {
    textAlign: 'center',
    color: '#7F8C8D',
    fontSize: 14,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#216694ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  userInitial: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  signOutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 10,
  },
  signOutText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#E74C3C',
    fontWeight: '500',
  },
});

export default DrawerContent;
