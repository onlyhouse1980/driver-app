import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { CheckCircle2 } from 'lucide-react-native';
import { FlatList, Text, View } from 'react-native';

import { EmptyState } from '../components/empty-state';
import { JobCard } from '../components/job-card';
import { useJobs } from '../context/job-context';
import { colors } from '../theme/colors';
import { DeliveryJob } from '../types/job';
import { RootStackParamList } from '../navigation/types';

export function JobFeedScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { availableJobs, myJobs, acceptJob } = useJobs();

  const openJob = (job: DeliveryJob) => {
    navigation.navigate('JobDetail', { jobId: job.id });
  };

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={availableJobs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <JobCard
          job={item}
          onPress={() => openJob(item)}
          actionLabel="Accept Job"
          onAction={() => acceptJob(item.id)}
        />
      )}
      ListEmptyComponent={
        <EmptyState
          title="No available orders"
          message="Accepted orders move to My Jobs. New dispatch offers will appear here."
        />
      }
      ListHeaderComponent={
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <SummaryPill label="Available" value={availableJobs.length} />
            <SummaryPill label="My Jobs" value={myJobs.length} />
          </View>
          <Text
            selectable
            style={{
              color: colors.muted,
              fontSize: 14,
              letterSpacing: 0,
              lineHeight: 20,
            }}
          >
            Review pickup and drop-off details before accepting a delivery.
          </Text>
        </View>
      }
      contentContainerStyle={{
        gap: 14,
        padding: 16,
        paddingBottom: 28,
      }}
    />
  );
}

function SummaryPill({ label, value }: { label: string; value: number }) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 9,
      }}
    >
      <CheckCircle2 color={colors.teal} size={16} />
      <Text
        selectable
        style={{
          color: colors.ink,
          fontSize: 14,
          fontWeight: '800',
          letterSpacing: 0,
        }}
      >
        {value}
      </Text>
      <Text
        selectable
        style={{
          color: colors.muted,
          fontSize: 14,
          letterSpacing: 0,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
