
import {ProductService} from './products.service';
import {AuthService} from './auth.service';
import {UserService} from './user.service';
import {CartService} from './cart.service';

export const services:any[] = [
    ProductService,
    AuthService,
    UserService,
    CartService
];

export * from './products.service';
export * from './auth.service';
export * from './user.service';
export * from './cart.service';