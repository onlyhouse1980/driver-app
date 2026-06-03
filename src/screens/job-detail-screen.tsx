import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Navigation,
  Package,
  Route,
  Scale,
  Truck,
  UserRound,
} from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';

import { Badge } from '../components/badge';
import { EmptyState } from '../components/empty-state';
import { PrimaryButton } from '../components/primary-button';
import { StatusProgress } from '../components/status-progress';
import { useJobs } from '../context/job-context';
import { RootStackParamList } from '../navigation/types';
import { colors, priorityTone, statusTone } from '../theme/colors';
import { DeliveryJob, StopLocation } from '../types/job';

type Props = NativeStackScreenProps<RootStackParamList, 'JobDetail'>;

const statusLabel = {
  available: 'Available',
  accepted: 'Accepted',
  pickedUp: 'Picked Up',
  delivered: 'Delivered',
};

export function JobDetailScreen({ route }: Props) {
  const { getJobById, acceptJob, advanceJobStatus, getNextActionLabel } = useJobs();
  const job = getJobById(route.params.jobId);

  if (!job) {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 16 }}
      >
        <EmptyState title="Job not found" message="This order is no longer available." />
      </ScrollView>
    );
  }

  const actionLabel = getNextActionLabel(job);
  const priority = priorityTone[job.priority];
  const status = statusTone[job.status];

  const handleAction = () => {
    if (job.status === 'available') {
      acceptJob(job.id);
      return;
    }

    advanceJobStatus(job.id);
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ gap: 14, padding: 16, paddingBottom: 32 }}
    >
      <Section>
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
                fontSize: 24,
                fontWeight: '900',
                letterSpacing: 0,
                lineHeight: 30,
              }}
            >
              {job.pickup.city} to {job.dropoff.city}
            </Text>
            <Text
              selectable
              style={{
                color: colors.muted,
                fontSize: 14,
                letterSpacing: 0,
                lineHeight: 20,
              }}
            >
              {job.shipper}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Badge label={job.priority} backgroundColor={priority.background} color={priority.text} />
          <Badge label={statusLabel[job.status]} backgroundColor={status.background} color={status.text} />
        </View>
      </Section>

      <Section title="Status">
        <StatusProgress status={job.status} />
        {actionLabel ? (
          <PrimaryButton
            label={actionLabel}
            onPress={handleAction}
            variant={job.status === 'pickedUp' ? 'success' : 'primary'}
            icon={
              job.status === 'pickedUp' ? (
                <CheckCircle2 color={colors.surface} size={18} />
              ) : (
                <Truck color={colors.surface} size={18} />
              )
            }
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              backgroundColor: colors.greenSoft,
              borderRadius: 8,
              flexDirection: 'row',
              gap: 8,
              padding: 12,
            }}
          >
            <CheckCircle2 color={colors.green} size={18} />
            <Text
              selectable
              style={{
                color: colors.green,
                flex: 1,
                fontSize: 14,
                fontWeight: '800',
                letterSpacing: 0,
                lineHeight: 20,
              }}
            >
              Delivery completed
            </Text>
          </View>
        )}
      </Section>

      <Section title="Route Preview">
        <RoutePreview job={job} />
      </Section>

      <Section title="Pickup">
        <StopDetails icon={<MapPin color={colors.teal} size={20} />} stop={job.pickup} />
      </Section>

      <Section title="Drop-off">
        <StopDetails icon={<Navigation color={colors.green} size={20} />} stop={job.dropoff} />
      </Section>

      <Section title="Order Details">
        <DetailRow
          icon={<Clock color={colors.muted} size={18} />}
          label="Distance and duration"
          value={`${job.estimatedDistanceMiles} miles / ${job.estimatedDurationMinutes} minutes`}
        />
        <DetailRow
          icon={<DollarSign color={colors.muted} size={18} />}
          label="Payout"
          value={`$${job.payoutUsd}`}
        />
        <DetailRow
          icon={<Package color={colors.muted} size={18} />}
          label="Cargo"
          value={job.cargo}
        />
        <DetailRow
          icon={<Scale color={colors.muted} size={18} />}
          label="Weight"
          value={`${job.weightLbs} lb`}
        />
        <DetailRow icon={<Route color={colors.muted} size={18} />} label="Notes" value={job.notes} />
      </Section>
    </ScrollView>
  );
}

function Section({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
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
      {title ? (
        <Text
          selectable
          style={{
            color: colors.ink,
            fontSize: 16,
            fontWeight: '900',
            letterSpacing: 0,
          }}
        >
          {title}
        </Text>
      ) : null}
      {children}
    </View>
  );
}

function StopDetails({ icon, stop }: { icon: React.ReactNode; stop: StopLocation }) {
  return (
    <View style={{ gap: 12 }}>
      <DetailRow icon={icon} label="Address" value={`${stop.address}, ${stop.city}`} />
      <DetailRow icon={<Clock color={colors.muted} size={18} />} label="Window" value={stop.window} />
      <DetailRow icon={<UserRound color={colors.muted} size={18} />} label="Contact" value={stop.contact} />
      <DetailRow icon={<Truck color={colors.muted} size={18} />} label="Phone" value={stop.phone} />
    </View>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
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
            letterSpacing: 0,
            lineHeight: 21,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

function RoutePreview({ job }: { job: DeliveryJob }) {
  return (
    <View
      style={{
        backgroundColor: colors.surfaceMuted,
        borderColor: colors.border,
        borderRadius: 8,
        borderWidth: 1,
        gap: 14,
        minHeight: 190,
        overflow: 'hidden',
        padding: 16,
      }}
    >
      <View
        style={{
          left: 48,
          position: 'absolute',
          top: 52,
          bottom: 52,
          width: 3,
          backgroundColor: colors.border,
        }}
      />
      <PreviewStop
        color={colors.teal}
        label="Pickup"
        city={job.pickup.city}
        address={job.pickup.address}
      />
      <View style={{ paddingLeft: 48 }}>
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: 8,
            borderWidth: 1,
            flexDirection: 'row',
            gap: 8,
            paddingHorizontal: 10,
            paddingVertical: 7,
          }}
        >
          <Route color={colors.muted} size={15} />
          <Text
            selectable
            style={{
              color: colors.muted,
              fontSize: 12,
              fontWeight: '800',
              letterSpacing: 0,
            }}
          >
            {job.estimatedDistanceMiles} mi / {job.estimatedDurationMinutes} min
          </Text>
        </View>
      </View>
      <PreviewStop
        color={colors.green}
        label="Drop-off"
        city={job.dropoff.city}
        address={job.dropoff.address}
      />
    </View>
  );
}

function PreviewStop({
  color,
  label,
  city,
  address,
}: {
  color: string;
  label: string;
  city: string;
  address: string;
}) {
  return (
    <View style={{ alignItems: 'flex-start', flexDirection: 'row', gap: 12 }}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: color,
          borderColor: colors.surface,
          borderRadius: 999,
          borderWidth: 3,
          height: 28,
          justifyContent: 'center',
          width: 28,
          zIndex: 1,
        }}
      />
      <View
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: 8,
          borderWidth: 1,
          flex: 1,
          gap: 3,
          padding: 10,
        }}
      >
        <Text
          selectable
          style={{
            color,
            fontSize: 12,
            fontWeight: '900',
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
          }}
        >
          {city}
        </Text>
        <Text
          selectable
          style={{
            color: colors.muted,
            fontSize: 13,
            letterSpacing: 0,
            lineHeight: 18,
          }}
        >
          {address}
        </Text>
      </View>
    </View>
  );
}
