import React from 'react';
import { SafeAreaView, I18nManager } from 'react-native';
import { Switch } from './library/Switch';

I18nManager.forceRTL(false);

export default function App() {
  return (
    <SafeAreaView>
      <Switch checked />
    </SafeAreaView>
  );
}
