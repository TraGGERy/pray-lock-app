import type { CustomerInfo } from 'react-native-purchases';
import { PRO_ENTITLEMENT } from './revenuecat';

/**
 * Optional hardened check: validate entitlement with your backend webhook mirror.
 * TODO: Implement POST /entitlements/validate on your server and verify signed user identity.
 */
export async function validateEntitlementServerSide(_userId: string): Promise<boolean> {
  // Placeholder for production server verification.
  return false;
}

export function hasLocalEntitlement(info: CustomerInfo): boolean {
  return typeof info.entitlements.active[PRO_ENTITLEMENT] !== 'undefined';
}
