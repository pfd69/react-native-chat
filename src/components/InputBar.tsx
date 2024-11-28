import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, useTheme, moderateScale } from '@upv/react-native-ui-core';

interface InputBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isSending: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ value, onChangeText, onSend, isSending }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, { backgroundColor: theme.colors.inputBackground }]}
        placeholder="Type a message..."
        placeholderTextColor={theme.colors.textPlaceholder}
      />
      <Button
        title={isSending ? '...' : 'Send'}
        onPress={onSend}
        disabled={isSending || !value.trim()}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(10),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(20),
    fontSize: moderateScale(14),
    marginRight: moderateScale(8),
  },
  button: {
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(10),
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: moderateScale(14),
    color: '#fff',
  },
});

export default InputBar;