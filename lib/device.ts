// Device capability layer for production-hardening.
// In a real build, wire these with:
// - expo-notifications for reminders
// - expo-local-authentication for biometric unlock
// - native modules for true app blocking (iOS FamilyControls/DeviceActivity, Android Accessibility/UsageStats)

export async function requestNotificationPermissions() {
  return { granted: false, note: 'Mocked in scaffold' };
}

export async function scheduleDailyReminder(_time: string, _title: string, _body: string) {
  return { success: true, id: `mock-${Date.now()}` };
}

export async function authenticateBiometric() {
  return { success: true, method: 'mock' };
}
