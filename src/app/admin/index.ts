import { AdminProductForm } from './admin-product-form/admin-product-form.component';
import { ChildCategory } from './admin-category-form/c-category/c-category.component';
import { ParentCategory } from './admin-category-form/p-category/p-category.component';
import { AdminHome } from './admin-home/admin-home.component';
import { AdminCategoryForm } from './admin-category-form/admin-category-form.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminComponent } from './admin.component';

export const adminComponents: any[] = [
  AdminComponent,
  AdminHome,
  AdminCategoryForm,
  ParentCategory,
  ChildCategory,
  AdminProductForm,
  AdminUsersComponent,
  AdminProductsComponent
];

export * from './admin.component';
export * from './admin-home/admin-home.component';
export * from './admin-product-form/admin-product-form.component';
export * from './admin-category-form/admin-category-form.component';
export * from './admin-products/admin-products.component';
export * from './admin-users/admin-users.component';
export * from './guards';
