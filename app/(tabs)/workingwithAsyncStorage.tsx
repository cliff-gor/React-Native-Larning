import * as Network from 'expo-network';

import { Button, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkingWithAsyncStorage: React.FC = () => {
  const [youAreConnected, setYouAreConnected] = useState<boolean |undefined| null>(null);
  const [youHaveLastChecked, setYouHaveLastChecked] = useState<string | null>(null);

  useEffect(() => {
    loadYouHaveLastChecked();
    checkNetworkStatus();
  }, []);

  const loadYouHaveLastChecked = async () => {
    try {
      const value = await AsyncStorage.getItem('@youHave_LastChecked');
      if (value !== null) {
        setYouHaveLastChecked(value);
      }
    } catch (e) {
      console.error("Failed to load youHaveLastChecked", e);
    }
  };

  const saveYouHaveLastChecked = async () => {
    try {
      const now = new Date().toISOString();
      await AsyncStorage.setItem('@youHave_LastChecked', now);
      setYouHaveLastChecked(now);
    } catch (e) {
      console.error("Failed to save youHaveLastChecked", e);
    }
  };

  const checkNetworkStatus = async () => {
    const status = await Network.getNetworkStateAsync();
    setYouAreConnected(status.isConnected);
    saveYouHaveLastChecked();
  };

  return (
    <View>
      <Text>Working with AsyncStorage</Text>
      <Text>
        Network Status: {youAreConnected === null ? 'Unknown' : youAreConnected ? 'Connected' : 'Disconnected'}
      </Text>
      {youHaveLastChecked && (
        <Text>Last Checked: {new Date(youHaveLastChecked).toLocaleString()}</Text>
      )}
      <Button title="Check Network Status" onPress={checkNetworkStatus} />
    </View>
  );
};

export default WorkingWithAsyncStorage;