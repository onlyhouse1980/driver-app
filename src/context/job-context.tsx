import React from 'react';

import { mockJobs } from '../data/mock-jobs';
import { DeliveryJob, DeliveryStatus } from '../types/job';

type JobContextValue = {
  availableJobs: DeliveryJob[];
  myJobs: DeliveryJob[];
  allJobs: DeliveryJob[];
  acceptJob: (jobId: string) => void;
  advanceJobStatus: (jobId: string) => void;
  getJobById: (jobId: string) => DeliveryJob | undefined;
  getNextActionLabel: (job: DeliveryJob) => string | undefined;
};

const JobContext = React.createContext<JobContextValue | undefined>(undefined);

const nextStatus: Partial<Record<DeliveryStatus, DeliveryStatus>> = {
  available: 'accepted',
  accepted: 'pickedUp',
  pickedUp: 'delivered',
};

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = React.useState<DeliveryJob[]>(mockJobs);

  const availableJobs = React.useMemo(
    () => jobs.filter((job) => job.status === 'available'),
    [jobs],
  );

  const myJobs = React.useMemo(
    () => jobs.filter((job) => job.status !== 'available'),
    [jobs],
  );

  const updateJobStatus = React.useCallback((jobId: string, status: DeliveryStatus) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) => (job.id === jobId ? { ...job, status } : job)),
    );
  }, []);

  const acceptJob = React.useCallback(
    (jobId: string) => {
      updateJobStatus(jobId, 'accepted');
    },
    [updateJobStatus],
  );

  const advanceJobStatus = React.useCallback((jobId: string) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) => {
        const next = nextStatus[job.status];
        return job.id === jobId && next ? { ...job, status: next } : job;
      }),
    );
  }, []);

  const getJobById = React.useCallback(
    (jobId: string) => jobs.find((job) => job.id === jobId),
    [jobs],
  );

  const getNextActionLabel = React.useCallback((job: DeliveryJob) => {
    if (job.status === 'available') {
      return 'Accept Job';
    }

    if (job.status === 'accepted') {
      return 'Confirm Pickup';
    }

    if (job.status === 'pickedUp') {
      return 'Confirm Delivery';
    }

    return undefined;
  }, []);

  const value = React.useMemo(
    () => ({
      availableJobs,
      myJobs,
      allJobs: jobs,
      acceptJob,
      advanceJobStatus,
      getJobById,
      getNextActionLabel,
    }),
    [
      acceptJob,
      advanceJobStatus,
      availableJobs,
      getJobById,
      getNextActionLabel,
      jobs,
      myJobs,
    ],
  );

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

export function useJobs() {
  const context = React.use(JobContext);

  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }

  return context;
}
