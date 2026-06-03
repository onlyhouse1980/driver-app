import { Pressable, Text, View } from 'react-native';

import { colors } from '../theme/colors';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success';
  disabled?: boolean;
};

export function PrimaryButton({
  label,
  onPress,
  icon,
  variant = 'primary',
  disabled = false,
}: PrimaryButtonProps) {
  const palette = {
    primary: { background: colors.teal, text: colors.surface, border: colors.teal },
    secondary: { background: colors.surface, text: colors.tealDark, border: colors.border },
    success: { background: colors.green, text: colors.surface, border: colors.green },
  }[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: 'center',
        backgroundColor: disabled ? colors.surfaceMuted : palette.background,
        borderColor: disabled ? colors.border : palette.border,
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        minHeight: 44,
        opacity: pressed ? 0.82 : 1,
        paddingHorizontal: 14,
        paddingVertical: 10,
      })}
    >
      {icon ? <View>{icon}</View> : null}
      <Text
        selectable
        numberOfLines={2}
        style={{
          color: disabled ? colors.subtle : palette.text,
          flexShrink: 1,
          fontSize: 15,
          fontWeight: '800',
          letterSpacing: 0,
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
