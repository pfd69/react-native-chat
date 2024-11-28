import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, useTheme, moderateScale } from '@upv/react-native-ui-core';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TutorStackParamList } from '../navigation/TutorNavigator';
import { useFetchSessionsQuery } from '../services';

const SessionListScreen: React.FC = () => {
  const { theme } = useTheme();
  
  // Specify the navigation type
  const navigation = useNavigation<NavigationProp<TutorStackParamList>>();
  
  const { data, isLoading, error, ...other } = useFetchSessionsQuery();
    // Debug log
    useEffect(() => {
        console.log('useFetchSessionsQuery - Debug Info:', {
        data,
        isLoading,
        error,
        other
        });
    }, [data, isLoading, error, other]);

    
  const handleSessionPress = (sessionId: string) => {
    navigation.navigate('Chat', { sessionId }); // Type-safe navigation
  };

  if (isLoading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.error}>Error loading sessions</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={data?.data || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.title}
            onPress={() => handleSessionPress(item.id)}
            style={styles.button}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
  },
  button: {
    marginVertical: moderateScale(8),
  },
  loading: {
    textAlign: 'center',
    marginTop: moderateScale(16),
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: moderateScale(16),
  },
});

export default SessionListScreen;