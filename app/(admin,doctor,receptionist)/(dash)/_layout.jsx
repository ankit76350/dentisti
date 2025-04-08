import React from 'react';
import { Tabs } from 'expo-router';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
export default function _layout() {

  return (
    <BottomSheetModalProvider>
    <Tabs
      screenOptions={{
        tabBarStyle: { display: "none" } ,
        headerShown: false,
        tabBarShowLabel: false, 
      }}
    />
    </BottomSheetModalProvider>
  );
}
