import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme, moderateScale } from '@upv/react-native-ui-core';

const TypingIndicator: React.FC = () => {
  const { theme } = useTheme();

  // Animated dots for typing indicator
  const dot1Opacity = useRef(new Animated.Value(0)).current;
  const dot2Opacity = useRef(new Animated.Value(0)).current;
  const dot3Opacity = useRef(new Animated.Value(0)).current;

  // Animation loop
  useEffect(() => {
    const animateDots = () => {
      Animated.sequence([
        Animated.timing(dot1Opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dot2Opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dot3Opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
        .start(() => {
          // Reset to initial state and loop
          Animated.timing(dot1Opacity, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }).start();
          Animated.timing(dot2Opacity, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }).start();
          Animated.timing(dot3Opacity, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }).start(() => animateDots());
        });
    };

    animateDots();
  }, [dot1Opacity, dot2Opacity, dot3Opacity]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      {/* <Text style={[styles.text, { color: theme.colors.text }]}>Typing</Text> */}
      <View style={styles.dotContainer}>
        <Animated.View style={[styles.dot, { opacity: dot1Opacity, backgroundColor: theme.colors.primary }]} />
        <Animated.View style={[styles.dot, { opacity: dot2Opacity, backgroundColor: theme.colors.primary }]} />
        <Animated.View style={[styles.dot, { opacity: dot3Opacity, backgroundColor: theme.colors.primary }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateScale(8),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(12),
  },
  text: {
    fontSize: moderateScale(14),
    fontStyle: 'italic',
    marginRight: moderateScale(8),
  },
  dotContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    marginHorizontal: moderateScale(2),
  },
});

export default TypingIndicator;