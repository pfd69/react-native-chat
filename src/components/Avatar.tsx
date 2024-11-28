import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme, moderateScale } from '@upv/react-native-ui-core';

interface AvatarProps {
  name: string;
  avatarUrl?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name, avatarUrl, size = 40 }) => {
  const { theme } = useTheme();

  if (avatarUrl) {
    return (
      <Image
        source={{ uri: avatarUrl }}
        style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
      />
    );
  }

  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: theme.colors.primary },
      ]}
    >
      <Text style={styles.initials}>{name.charAt(0).toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default Avatar;