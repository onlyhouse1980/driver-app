import { ArrowRight, Clock, DollarSign, MapPin, Navigation, Package } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { colors, priorityTone, statusTone } from '../theme/colors';
import { DeliveryJob } from '../types/job';
import { Badge } from './badge';
import { PrimaryButton } from './primary-button';

type JobCardProps = {
  job: DeliveryJob;
  onPress: () => void;
  actionLabel?: string;
  onAction?: () => void;
  showStatus?: boolean;
};

const statusLabel = {
  available: 'Available',
  accepted: 'Accepted',
  pickedUp: 'Picked Up',
  delivered: 'Delivered',
};

export function JobCard({
  job,
  onPress,
  actionLabel,
  onAction,
  showStatus = false,
}: JobCardProps) {
  const priority = priorityTone[job.priority];
  const status = statusTone[job.status];

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: 8,
        borderWidth: 1,
        gap: 14,
        padding: 16,
      }}
    >
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => ({
          gap: 14,
          opacity: pressed ? 0.72 : 1,
        })}
      >
        <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
          <View style={{ flex: 1, gap: 5 }}>
            <Text
              selectable
              style={{
                color: colors.muted,
                fontSize: 12,
                fontWeight: '800',
                letterSpacing: 0,
                textTransform: 'uppercase',
              }}
            >
              {job.orderNumber}
            </Text>
            <Text
              selectable
              style={{
                color: colors.ink,
                fontSize: 18,
                fontWeight: '800',
                letterSpacing: 0,
                lineHeight: 24,
              }}
            >
              {job.pickup.city} to {job.dropoff.city}
            </Text>
          </View>
          <ArrowRight color={colors.subtle} size={22} />
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Badge label={job.priority} backgroundColor={priority.background} color={priority.text} />
          {showStatus ? (
            <Badge label={statusLabel[job.status]} backgroundColor={status.background} color={status.text} />
          ) : null}
        </View>

        <View style={{ gap: 12 }}>
          <LocationRow
            icon={<MapPin color={colors.teal} size={18} />}
            label="Pickup"
            city={job.pickup.city}
            address={job.pickup.address}
          />
          <LocationRow
            icon={<Navigation color={colors.green} size={18} />}
            label="Drop-off"
            city={job.dropoff.city}
            address={job.dropoff.address}
          />
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <MetaItem
            icon={<Clock color={colors.muted} size={15} />}
            label={`${job.estimatedDistanceMiles} mi`}
            detail={`${job.estimatedDurationMinutes} min`}
          />
          <MetaItem
            icon={<DollarSign color={colors.muted} size={15} />}
            label={`$${job.payoutUsd}`}
            detail="payout"
          />
          <MetaItem
            icon={<Package color={colors.muted} size={15} />}
            label={job.cargo}
            detail={`${job.weightLbs} lb`}
          />
        </View>
      </Pressable>

      {actionLabel && onAction ? (
        <PrimaryButton label={actionLabel} onPress={onAction} />
      ) : null}
    </View>
  );
}

function LocationRow({
  icon,
  label,
  city,
  address,
}: {
  icon: React.ReactNode;
  label: string;
  city: string;
  address: string;
}) {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <View style={{ paddingTop: 3 }}>{icon}</View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          selectable
          style={{
            color: colors.muted,
            fontSize: 12,
            fontWeight: '800',
            letterSpacing: 0,
            textTransform: 'uppercase',
          }}
        >
          {label}
        </Text>
        <Text
          selectable
          style={{
            color: colors.ink,
            fontSize: 15,
            fontWeight: '800',
            letterSpacing: 0,
            lineHeight: 20,
          }}
        >
          {city}
        </Text>
        <Text
          selectable
          style={{
            color: colors.muted,
            fontSize: 14,
            letterSpacing: 0,
            lineHeight: 19,
          }}
        >
          {address}
        </Text>
      </View>
    </View>
  );
}

function MetaItem({
  icon,
  label,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  detail: string;
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: colors.surfaceMuted,
        borderRadius: 8,
        flexDirection: 'row',
        gap: 6,
        maxWidth: '100%',
        paddingHorizontal: 9,
        paddingVertical: 7,
      }}
    >
      {icon}
      <Text
        selectable
        numberOfLines={1}
        style={{
          color: colors.ink,
          flexShrink: 1,
          fontSize: 12,
          fontWeight: '800',
          letterSpacing: 0,
        }}
      >
        {label}
      </Text>
      <Text
        selectable
        numberOfLines={1}
        style={{
          color: colors.muted,
          flexShrink: 1,
          fontSize: 12,
          letterSpacing: 0,
        }}
      >
        {detail}
      </Text>
    </View>
  );
}
