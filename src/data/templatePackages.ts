import type { PackageCode } from '@/types';

export type { PackageCode };

const PACKAGE_RANK: Record<PackageCode, number> = { FREE: 0, PLUS: 1, COUPLE: 2, PREMIUM: 3 };

export function canUsePackage(userPlan: string | undefined, requiredPackage: PackageCode): boolean {
  const plan = (userPlan && userPlan in PACKAGE_RANK ? userPlan : 'FREE') as PackageCode;
  return PACKAGE_RANK[plan] >= PACKAGE_RANK[requiredPackage];
}
