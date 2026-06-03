import { Text, View } from 'react-native';
import { Inbox } from 'lucide-react-native';

import { colors } from '../theme/colors';

type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: 8,
        borderWidth: 1,
        gap: 10,
        padding: 24,
      }}
    >
      <Inbox color={colors.teal} size={30} />
      <Text
        selectable
        style={{
          color: colors.ink,
          fontSize: 18,
          fontWeight: '800',
          letterSpacing: 0,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      <Text
        selectable
        style={{
          color: colors.muted,
          fontSize: 14,
          letterSpacing: 0,
          lineHeight: 20,
          textAlign: 'center',
        }}
      >
        {message}
      </Text>
    </View>
  );
}
