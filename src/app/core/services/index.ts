import { ProductService } from './products.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { CartService } from './cart.service';
import { OrderService } from './order.service';
import { UtilsService } from './utils.service';

export const services: any[] = [
  ProductService,
  AuthService,
  UserService,
  CartService,
  OrderService,
  UtilsService
];

export * from './products.service';
export * from './auth.service';
export * from './user.service';
export * from './cart.service';
export * from './order.service';
export * from './utils.service';
