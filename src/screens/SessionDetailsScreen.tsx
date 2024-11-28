import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme, moderateScale } from '@upv/react-native-ui-core';
import { RouteProp, useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { TutorStackParamList } from '../navigation/TutorNavigator';

type SessionDetailsScreenRouteProp = RouteProp<TutorStackParamList, 'SessionDetails'>;

const SessionDetailsScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute<SessionDetailsScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<TutorStackParamList>>();
  const { sessionId } = route.params;

  const handleChatPress = () => {
    navigation.navigate('Chat', { sessionId });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title}>Session Details</Text>
      <Text style={styles.detail}>Session ID: {sessionId}</Text>
      <Button
        title="Go to Chat"
        onPress={handleChatPress}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: moderateScale(16),
  },
  detail: {
    fontSize: moderateScale(16),
    marginBottom: moderateScale(16),
  },
  button: {
    marginTop: moderateScale(16),
  },
});

export default SessionDetailsScreen;