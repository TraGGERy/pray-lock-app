import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL, CustomerInfo, PurchasesOffering, PurchasesPackage } from 'react-native-purchases';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import { captureError, trackEvent } from './monitoring';

export const PRO_ENTITLEMENT = 'prayer lock: put God first Pro';

let initialized = false;

function getApiKey() {
  const key = process.env.EXPO_PUBLIC_RC_API_KEY;
  if (!key) throw new Error('Missing EXPO_PUBLIC_RC_API_KEY. Set it in .env for production builds.');
  return key;
}

export async function initializePurchases() {
  if (initialized) return;
  if (Platform.OS !== 'ios' && Platform.OS !== 'android') return;

  try {
    Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.VERBOSE : LOG_LEVEL.WARN);
    Purchases.configure({ apiKey: getApiKey() });
    initialized = true;
    trackEvent('rc_initialized');
  } catch (error) {
    captureError(error, { area: 'rc_init' });
    throw error;
  }
}

export async function getOfferings(): Promise<PurchasesOffering | null> {
  await initializePurchases();
  const offerings = await Purchases.getOfferings();
  trackEvent('rc_offerings_loaded', { hasCurrent: !!offerings.current });
  return offerings.current ?? null;
}

export async function purchasePackage(pkg: PurchasesPackage): Promise<CustomerInfo> {
  await initializePurchases();
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  trackEvent('rc_purchase_success', { packageId: pkg.identifier });
  return customerInfo;
}

export async function restorePurchases(): Promise<CustomerInfo> {
  await initializePurchases();
  const info = await Purchases.restorePurchases();
  trackEvent('rc_restore_success');
  return info;
}

export async function getCustomerInfo(): Promise<CustomerInfo> {
  await initializePurchases();
  return Purchases.getCustomerInfo();
}

export function hasProEntitlement(info: CustomerInfo): boolean {
  return typeof info.entitlements.active[PRO_ENTITLEMENT] !== 'undefined';
}

export async function presentPaywall(): Promise<boolean> {
  await initializePurchases();
  const result = await RevenueCatUI.presentPaywall();
  trackEvent('rc_paywall_result', { result });
  return result === PAYWALL_RESULT.PURCHASED || result === PAYWALL_RESULT.RESTORED;
}

export function findPackageById(
  offering: PurchasesOffering | null,
  id: 'lifetime' | 'yearly' | 'monthly',
): PurchasesPackage | null {
  if (!offering) return null;
  return offering.availablePackages.find((p) => p.identifier.toLowerCase().includes(id)) ?? null;
}
