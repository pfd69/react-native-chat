import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme, moderateScale } from '@upv/react-native-ui-core';

import SessionListScreen from '../screens/SessionListScreen';
import ChatScreen from '../screens/ChatScreen';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';

export type TutorStackParamList = {
  SessionList: undefined; // List of all sessions
  Chat: { sessionId: string }; // Chat for a specific session
  SessionDetails: { sessionId: string }; // Detailed view of a session
};

const Stack = createStackNavigator<TutorStackParamList>();

const TutorNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: moderateScale(56),
          },
          headerTintColor: theme.colors.onPrimary,
          headerTitleStyle: {
            fontSize: moderateScale(18),
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="SessionList"
          component={SessionListScreen}
          options={{ title: 'Your Sessions' }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({ route }) => ({
            title: `Chat - ${route.params.sessionId}`,
          })}
        />
        <Stack.Screen
          name="SessionDetails"
          component={SessionDetailsScreen}
          options={{ title: 'Session Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default TutorNavigator;