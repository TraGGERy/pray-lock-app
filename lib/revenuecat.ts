// TODO: Replace with react-native-purchases setup and platform API keys.
// TODO: Map offerings to real RevenueCat product IDs.
export async function initializePurchases(){return true;}
export async function getOfferings(){return [{id:'yearly',price:'$29.99 / year'},{id:'monthly',price:'$5.99 / month'}];}
export async function purchasePackage(_pkg:string){return {success:true};}
export async function restorePurchases(){return {activeEntitlements:[]};}
