import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, useDerivedValue } from 'react-native-reanimated';

const TEXT_LINES = [
    "Innovative care solutions.",
    "Committed to your wellness.",
    "Your health, our priority."
];

const AnimatedText = () => {
    const index = useSharedValue(0);  // Track which text is visible

    useEffect(() => {
        let interval = setInterval(() => {
            index.value = (index.value + 1) % TEXT_LINES.length;
        }, 2000); // Change text every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            {TEXT_LINES.map((text, i) => {
                const opacity = useDerivedValue(() => {
                    return index.value === i ? withTiming(1, { duration: 500 }) : withTiming(0, { duration: 500 });
                });

                const translateY = useDerivedValue(() => {
                    return index.value === i ? withTiming(0, { duration: 500 }) : withTiming(-10, { duration: 500 });
                });

                const animatedStyle = useAnimatedStyle(() => ({
                    opacity: opacity.value,
                    transform: [{ translateY: translateY.value }],
                }));

                return (
                    <Animated.Text key={i} style={[styles.text, animatedStyle]}>
                        {text}
                    </Animated.Text>
                );
            })}
        </View>
    );
};

export default AnimatedText;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,  // Set height to avoid layout shifts
        overflow: 'hidden',
    },
    text: {
        // fontSize: 18,
        // fontWeight: 'bold',
        // color: '#333',
        // position: 'absolute', // Stack texts on top of each other
    },
});
