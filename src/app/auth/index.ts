import { SignInComponent } from './signIn/signIn.component';
import { SignUpComponent } from './signUp/signUp.component';
import { ActivateComponent } from './activate/activate.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';

export const authComponents: any[] = [SignInComponent, SignUpComponent,ActivateComponent,ForgotComponent,ResetComponent];

export * from './signIn/signIn.component';
export * from './signUp/signUp.component';
export * from './forgot/forgot.component';
export * from './activate/activate.component';
export * from './reset/reset.component';
export * from './guards';
