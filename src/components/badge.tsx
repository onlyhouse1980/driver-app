import { Text, View } from 'react-native';

type BadgeProps = {
  label: string;
  backgroundColor: string;
  color: string;
};

export function Badge({ label, backgroundColor, color }: BadgeProps) {
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <Text
        selectable
        style={{
          color,
          fontSize: 12,
          fontWeight: '800',
          letterSpacing: 0,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
