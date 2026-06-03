import { Check } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { DeliveryStatus } from '../types/job';

const steps: Array<{ status: DeliveryStatus; label: string }> = [
  { status: 'accepted', label: 'Accepted' },
  { status: 'pickedUp', label: 'Picked Up' },
  { status: 'delivered', label: 'Delivered' },
];

const stepIndexByStatus: Record<DeliveryStatus, number> = {
  available: -1,
  accepted: 0,
  pickedUp: 1,
  delivered: 2,
};

export function StatusProgress({ status }: { status: DeliveryStatus }) {
  const currentStep = stepIndexByStatus[status];

  return (
    <View style={{ gap: 10 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {steps.map((step, index) => {
          const isComplete = index <= currentStep;
          const isCurrent = index === currentStep;

          return (
            <View key={step.status} style={{ alignItems: 'center', flex: 1, gap: 8 }}>
              <View style={{ alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    backgroundColor: isComplete ? colors.teal : colors.surface,
                    borderColor: isComplete ? colors.teal : colors.border,
                    borderRadius: 999,
                    borderWidth: 2,
                    height: 28,
                    width: 28,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isComplete ? <Check color={colors.surface} size={16} /> : null}
                </View>
                {index < steps.length - 1 ? (
                  <View
                    style={{
                      backgroundColor: index < currentStep ? colors.teal : colors.border,
                      flex: 1,
                      height: 2,
                    }}
                  />
                ) : null}
              </View>
              <Text
                selectable
                numberOfLines={2}
                style={{
                  color: isCurrent ? colors.ink : colors.muted,
                  fontSize: 12,
                  fontWeight: isCurrent ? '800' : '600',
                  letterSpacing: 0,
                  textAlign: 'center',
                }}
              >
                {step.label}
              </Text>
            </View>
          );
        })}
      </View>
      {status === 'available' ? (
        <Text
          selectable
          style={{
            color: colors.muted,
            fontSize: 13,
            letterSpacing: 0,
            lineHeight: 18,
          }}
        >
          This order has not been accepted yet. Accept it to start the delivery flow.
        </Text>
      ) : null}
    </View>
  );
}
