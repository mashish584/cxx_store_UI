
import { AuthGuard } from './auth-guard.service';
import { ChildAuthGuard } from './auth-child-guard.service';
import { UnAuthGuard } from './unauth-guard.service';

export const guards = [AuthGuard,ChildAuthGuard,UnAuthGuard];

export * from './auth-guard.service';
export * from './auth-child-guard.service';
export * from './unauth-guard.service';