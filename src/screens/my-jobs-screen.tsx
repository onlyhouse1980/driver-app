import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, View } from 'react-native';

import { EmptyState } from '../components/empty-state';
import { JobCard } from '../components/job-card';
import { useJobs } from '../context/job-context';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { DeliveryJob } from '../types/job';

export function MyJobsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { myJobs, advanceJobStatus, getNextActionLabel } = useJobs();

  const openJob = (job: DeliveryJob) => {
    navigation.navigate('JobDetail', { jobId: job.id });
  };

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={myJobs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const actionLabel = getNextActionLabel(item);

        return (
          <JobCard
            job={item}
            onPress={() => openJob(item)}
            actionLabel={actionLabel}
            onAction={actionLabel ? () => advanceJobStatus(item.id) : undefined}
            showStatus
          />
        );
      }}
      ListEmptyComponent={
        <EmptyState
          title="No active deliveries"
          message="Accept a job from Available Orders to start tracking pickup and delivery status."
        />
      }
      ListHeaderComponent={
        <View style={{ gap: 6 }}>
          <Text
            selectable
            style={{
              color: colors.muted,
              fontSize: 14,
              letterSpacing: 0,
              lineHeight: 20,
            }}
          >
            Advance each accepted job through Accepted, Picked Up, and Delivered.
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
