// Production monitoring adapter.
// Replace console calls with Sentry/Datadog/Firebase Crashlytics in production.
export function trackEvent(event: string, payload?: Record<string, unknown>) {
  console.log('[event]', event, payload ?? {});
}

export function captureError(error: unknown, context?: Record<string, unknown>) {
  console.error('[error]', error, context ?? {});
}
