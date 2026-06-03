import { StatusBar } from 'expo-status-bar';

import { JobProvider } from './src/context/job-context';
import { RootNavigator } from './src/navigation/root-navigator';

export default function App() {
  return (
    <JobProvider>
      <RootNavigator />
      <StatusBar style="dark" />
    </JobProvider>
  );
}
