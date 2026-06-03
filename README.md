# Driver Mobile App

Expo + React Native prototype for the driver-facing logistics workflow described in the assignment PDF.

## Features

- Available Orders feed with pickup and drop-off details, priority, estimated distance, duration, payout, cargo, and an Accept Job action.
- My Jobs screen for accepted deliveries.
- Status flow enforced in state: Accepted -> Picked Up -> Delivered.
- Job Detail screen reachable from both lists with all order fields, status step tracker, and static route preview.
- Bottom tab navigation plus stack-based detail navigation using React Navigation.
- Frontend-only mock data, as allowed by the assignment.

## Run Locally

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npm start
```

Then scan the QR code with Expo Go, or run:

```bash
npm run ios
npm run android
npm run web
```

## Working Demo

- Slower screen recording with visible tap indicators and Job Details scrolling: `demo/driver-app-demo.webm`
- Final-state screenshot: `demo/driver-app-demo-final-frame.png`

The recording shows the full flow: accepting an available order, opening My Jobs, viewing and scrolling the order details, confirming pickup, and confirming delivery.

## Architecture Notes

- `App.tsx` wraps the app in `JobProvider` and `RootNavigator`.
- `src/navigation/root-navigator.tsx` defines a native stack and bottom tabs.
- `src/context/job-context.tsx` owns job state with React Context API.
- `src/data/mock-jobs.ts` provides mock delivery orders.
- `src/screens` contains the feed, active jobs, and detail screens.
- `src/components` contains shared cards, badges, buttons, empty states, and progress UI.

The state model stores all jobs in one array. A job is in the feed only while its status is `available`; accepting it changes the status to `accepted`, which removes it from Available Orders and adds it to My Jobs. Status advancement is constrained to the required sequence.

## Tradeoffs

- The app uses hardcoded mock data instead of an Express backend because the assignment marks the backend as optional and the driver workflow is fully demonstrable in-app.
- The route preview is a static map-style placeholder, not a live map integration.
- Job state is in memory, so it resets when the app reloads.

## Improvements With More Time

- Persist accepted jobs with AsyncStorage or SQLite.
- Add a small Express or serverless API for jobs and status updates.
- Add authentication and driver identity.
- Integrate device location and a real map provider.
- Add unit tests for status transitions and component tests for the core flow.
