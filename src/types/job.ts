export type Priority = 'Standard' | 'Express' | 'Same-day';

export type DeliveryStatus = 'available' | 'accepted' | 'pickedUp' | 'delivered';

export type StopLocation = {
  city: string;
  address: string;
  window: string;
  contact: string;
  phone: string;
};

export type DeliveryJob = {
  id: string;
  orderNumber: string;
  shipper: string;
  pickup: StopLocation;
  dropoff: StopLocation;
  priority: Priority;
  estimatedDistanceMiles: number;
  estimatedDurationMinutes: number;
  payoutUsd: number;
  cargo: string;
  weightLbs: number;
  notes: string;
  status: DeliveryStatus;
};
