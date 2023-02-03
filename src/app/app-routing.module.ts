import { MyserviceComponent } from './blog/myservice/myservice.component';
import { ClassComponent } from './dialog/class/class.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ViewAllUsersComponent } from './pages/users/view-all-users/view-all-users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/shared/home/home.component';
import { LoginComponent } from './pages/shared/login/login.component';
import { UsersComponent } from './pages/users/users/users.component';
import { AddProductsComponent } from './pages/shared/products/add-products/add-products.component';
import { ViewProductsComponent } from './pages/shared/products/view-products/view-products.component';
import { ShoppingCartComponent } from './pages/shared/shopping-cart/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './pages/shared/check-out/check-out/check-out.component';
import { OrderSuccessfulComponent } from './pages/shared/order/order-successful/order-successful.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { ListOfBooksComponent } from './pages/shared/products/list-of-books/list-of-books.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { MyCustomerOrdersComponent } from './pages/shared/products/my-customer-orders/my-customer-orders.component';
import { BlogComponent } from './blog/blog/blog.component';
import { AboutComponent } from './blog/about/about.component';
import { ContactusComponent } from './blog/contactus/contactus.component';
import { RegisterCustomersComponent } from './pages/register-customers/register-customers.component';
import { UserRoleGuard } from './auth/user-role.guard';
import { UserHomeComponent } from './pages/users/user-home/user-home.component';

const routes: Routes = [
  {
    path: 'nyumbani',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: BlogComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterCustomersComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'services',
    component: MyserviceComponent,
  },
  {
    path: 'contactus',
    component: ContactusComponent,
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewusers',
        component: ViewAllUsersComponent,
        canActivate: [AuthGuard],
        data: {
          role_id: 1
        }
      },
      {
        path: 'changepassword',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'addproducts',
        component: AddProductsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        component: MyCustomerOrdersComponent,
      },
      {
        path: 'products',
        component: AddProductsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order-success',
        component: OrderSuccessfulComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'addbook',
        component: AddProductsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'managebooks',
        component: ViewProductsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'adminorders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'home',
        component: ListOfBooksComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'Uhome',
        component: UserHomeComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule],
})
export class AppRoutingModule { }
