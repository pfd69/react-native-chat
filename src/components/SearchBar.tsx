import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme, moderateScale } from '@upv/react-native-ui-core';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = 'Search messages...' }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.inputBackground }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, { color: theme.colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textPlaceholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(20),
    marginVertical: moderateScale(8),
  },
  input: {
    fontSize: moderateScale(14),
  },
});

export default SearchBar;