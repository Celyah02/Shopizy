import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.screen}>
      {/* Settings Content */}
      <View style={styles.content}>
        <Text style={styles.title}>App Settings</Text>
        <Text style={styles.text}>Adjust your preferences here.</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save Settings</Text>
        </TouchableOpacity>
      </View>
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
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#11181C',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2980B9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SettingsScreen;