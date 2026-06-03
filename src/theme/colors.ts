import { DeliveryStatus, Priority } from '../types/job';

export const colors = {
  background: '#F6F8FA',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF2F5',
  ink: '#172033',
  muted: '#667085',
  subtle: '#8A95A5',
  border: '#D8E0E8',
  teal: '#0F8B8D',
  tealDark: '#0A6769',
  green: '#067647',
  greenSoft: '#D1FADF',
  amber: '#B7791F',
  amberSoft: '#FEF0C7',
  red: '#B42318',
  redSoft: '#FEE4E2',
  blue: '#175CD3',
  blueSoft: '#D1E9FF',
  neutralSoft: '#E6EAF0',
};

export const priorityTone: Record<Priority, { background: string; text: string }> = {
  Standard: { background: colors.neutralSoft, text: colors.ink },
  Express: { background: colors.amberSoft, text: colors.amber },
  'Same-day': { background: colors.redSoft, text: colors.red },
};

export const statusTone: Record<DeliveryStatus, { background: string; text: string }> = {
  available: { background: colors.blueSoft, text: colors.blue },
  accepted: { background: colors.amberSoft, text: colors.amber },
  pickedUp: { background: colors.blueSoft, text: colors.blue },
  delivered: { background: colors.greenSoft, text: colors.green },
};
