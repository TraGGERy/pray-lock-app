import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL, CustomerInfo, PurchasesOffering, PurchasesPackage } from 'react-native-purchases';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';

const API_KEY = 'test_aiEESDXDTBNoqRQHhZdYESXnPLV';
export const PRO_ENTITLEMENT = 'prayer lock: put God first Pro';

let initialized = false;

export async function initializePurchases() {
  if (initialized) return;
  try {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Purchases.configure({ apiKey: API_KEY });
      initialized = true;
    }
  } catch (error) {
    console.error('RevenueCat init failed', error);
    throw error;
  }
}

export async function getOfferings() {
  await initializePurchases();
  const offerings = await Purchases.getOfferings();
  return offerings.current;
}

export async function purchasePackage(pkg: PurchasesPackage) {
  await initializePurchases();
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return customerInfo;
}

export async function restorePurchases() {
  await initializePurchases();
  return Purchases.restorePurchases();
}

export async function getCustomerInfo(): Promise<CustomerInfo> {
  await initializePurchases();
  return Purchases.getCustomerInfo();
}

export function hasProEntitlement(info: CustomerInfo) {
  return typeof info.entitlements.active[PRO_ENTITLEMENT] !== 'undefined';
}

export async function presentPaywall() {
  await initializePurchases();
  const result = await RevenueCatUI.presentPaywall();
  return result === PAYWALL_RESULT.PURCHASED || result === PAYWALL_RESULT.RESTORED;
}

export function findPackageById(offering: PurchasesOffering | null, id: 'lifetime'|'yearly'|'monthly') {
  if (!offering) return null;
  return offering.availablePackages.find((p) => p.identifier.toLowerCase().includes(id)) ?? null;
}
