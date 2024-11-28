import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';

interface MediaBubbleProps {
  mediaUrl: string;
  caption?: string;
}

const MediaBubble: React.FC<MediaBubbleProps> = ({ mediaUrl, caption }) => {
  return (
    <>
      <Image source={{ uri: mediaUrl }} style={styles.image} />
      {caption && <Text style={styles.caption}>{caption}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  caption: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default MediaBubble;