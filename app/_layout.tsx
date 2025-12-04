import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useEffect } from 'react';

import { useColorScheme } from '../hooks/use-color-scheme';
import { CartProvider } from '../contexts/CartContext';
import { AuthProvider } from '../contexts/AuthContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

// 👇 Required: Notification behavior handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,  // Required in latest Expo
    shouldShowList: true,    // Required in latest Expo
  }),
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // 👇 Ask permission & prepare notifications
  useEffect(() => {
    const registerForPush = async () => {
      if (!Device.isDevice) return; // Do nothing in simulators

      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission needed to show notifications!');
        return;
      }

      await Notifications.getExpoPushTokenAsync();

      // Optional: Define behavior on app foreground notifications
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });
    };

    registerForPush();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: 'modal', title: 'Modal' }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}
