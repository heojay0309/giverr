import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const GiftBox = () => {
  // Shared value for the animation
  const posY = useSharedValue(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      posY.value = withSpring(posY.value === 0 ? -50 : 0, {
        stiffness: 100,
        damping: 10,
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  // Animated style for the hopping effect
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: posY.value }],
    };
  });

  // // Start the hopping animation
  // posY.value = withSpring(posY.value === 0 ? -20 : 0, {
  //   stiffness: 100,
  //   damping: 10,
  // });

  return (
    <Animated.View style={[styles.box, animatedStyle]}>
      <View style={styles.ribbonHorizontal} />
      <View style={styles.ribbonVertical} />
      <View style={styles.bowLeft} />
      <View style={styles.bowRight} />
      <View style={styles.bowCenter} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 300,
    height: 300,
    borderRadius: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ribbonHorizontal: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    height: 10,
    backgroundColor: 'limegreen',
    transform: [{ translateY: -5 }],
  },
  ribbonVertical: {
    position: 'absolute',
    left: '50%',
    height: '100%',
    width: 10,
    backgroundColor: 'limegreen',
    transform: [{ translateX: -5 }],
  },
  bowLeft: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 20,
    height: 20,
    backgroundColor: 'limegreen',
    transform: [{ translateX: -15 }, { translateY: -15 }, { rotate: '45deg' }],
  },
  bowRight: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 20,
    height: 20,
    backgroundColor: 'limegreen',
    transform: [{ translateX: -5 }, { translateY: -15 }, { rotate: '-45deg' }],
  },
  bowCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 10,
    height: 10,
    backgroundColor: 'limegreen',
    borderRadius: 5,
    transform: [{ translateX: -5 }, { translateY: -5 }],
  },
});

export default GiftBox;
