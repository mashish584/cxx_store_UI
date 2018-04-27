import {AdminGuard} from './admin-guard.service';
import {AdminChildGuard} from './admin-child-guard.service';

export const guards = [AdminGuard,AdminChildGuard];

export * from './admin-guard.service';
export * from './admin-child-guard.service';