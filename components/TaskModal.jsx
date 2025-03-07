import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const BottomSheetComponent = () => {
  // Bottom sheet reference
  const bottomSheetModalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Snap points for the bottom sheet
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // Function to open the bottom sheet
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setIsModalOpen(true);
  }, []);

  // Function to track bottom sheet changes
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) setIsModalOpen(false); // Close modal when dismissed
    console.log('Bottom Sheet index:', index);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
      <Modal
  visible={isModalOpen}
  transparent
  animationType="fade"
  onRequestClose={() => setIsModalOpen(false)}
>
  <View style={styles.overlay} />
</Modal>


        {!isModalOpen && (
          <TouchableOpacity style={styles.button} onPress={handlePresentModalPress}>
            <Text style={styles.buttonText}>Open Bottom Sheet</Text>
          </TouchableOpacity>
        )}
        
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={styles.modalBackground}
          onDismiss={() => setIsModalOpen(false)}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.text}>Welcome to the Bottom Sheet 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    backgroundColor: '#fff',
    borderRadius: 20,
    zIndex: 9999,  // Ensure it's above everything
  },
  
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default BottomSheetComponent;
