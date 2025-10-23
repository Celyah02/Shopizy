import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '../../components/haptic-tab';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';
import { useCart } from '../../contexts/CartContext';
import ModalDrawer from '../../components/ModalDrawer';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { cartCount, setIsCartVisible } = useCart();

  const HeaderRight = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
      <TouchableOpacity 
        onPress={() => setIsCartVisible(true)} 
        style={{
          backgroundColor: '#E74C3C',
          borderRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 5,
          marginRight: 10,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>{cartCount}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#216694ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '700',
          },
          headerLeft: () => (
            <TouchableOpacity 
              style={{ marginLeft: 15 }}
              onPress={() => setDrawerVisible(true)}
            >
              <Ionicons
                name="menu"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
          ),
          headerRight: HeaderRight,
          tabBarButton: HapticTab,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'My Shop',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="Settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear.fill" color={color} />,
          }}
        />
      </Tabs>
      
      <ModalDrawer 
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)} 
      />
    </>
  );
}
