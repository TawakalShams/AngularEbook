import { NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { LeftNavComponent } from './layout/left-nav/left-nav.component';
import { MaterialsModule } from './materials/materials.module';
import { UsersComponent } from './pages/users/users/users.component';
import { EditusersComponent } from './pages/users/editusers/editusers.component';
import { HomeComponent } from './pages/shared/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewAllUsersComponent } from './pages/users/view-all-users/view-all-users.component';
import { LoginComponent } from './pages/shared/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UpdateusersComponent } from './dialog/edit/updateusers/updateusers.component';
import { DeleteUserComponent } from './dialog/delete/delete-user/delete-user.component';
import { RightsettingsComponent } from './dialog/settings/rightsettings/rightsettings.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ClassComponent } from './dialog/class/class.component';
import { AssignTeacherToClassComponent } from './dialog/assign-teacher-to-class/assign-teacher-to-class.component';
import { AddProductsComponent } from './pages/shared/products/add-products/add-products.component';
import { ViewProductsComponent } from './pages/shared/products/view-products/view-products.component';
import { ShoppingCartComponent } from './pages/shared/shopping-cart/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './pages/shared/check-out/check-out/check-out.component';
import { OrderSuccessfulComponent } from './pages/shared/order/order-successful/order-successful.component';
import { MyOrderComponent } from './pages/shared/order/my-order/my-order.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
// import { JwtModule } from '@auth0/angular-jwt';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { UpdateBooksComponent } from './dialog/edit/update-books/update-books.component';
import { ListOfBooksComponent } from './pages/shared/products/list-of-books/list-of-books.component';
import { BookDescriptionComponent } from './dialog/book-description/book-description.component';
import { DeleteBookComponent } from './dialog/delete/delete-book/delete-book.component';
import { MyCustomerOrdersComponent } from './pages/shared/products/my-customer-orders/my-customer-orders.component';
import { MakePaymentComponent } from './dialog/make-payment/make-payment.component';
import { BodiyComponent } from './blog/bodiy/bodiy.component';
import { FooterComponent } from './blog/footer/footer.component';
import { BlogComponent } from './blog/blog/blog.component';
import { AboutComponent } from './blog/about/about.component';
import { ContactusComponent } from './blog/contactus/contactus.component';
import { RegisterCustomersComponent } from './pages/register-customers/register-customers.component';
import { MyserviceComponent } from './blog/myservice/myservice.component';
import { AppInterceptor } from './service/app.interceptor';
import { UserHomeComponent } from './pages/users/user-home/user-home.component';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
// export function tokenGetter() {
//   return localStorage.getItem("access_token");
// } useClass: Type<any>

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftNavComponent,
    UsersComponent,
    EditusersComponent,
    HomeComponent,
    ViewAllUsersComponent,
    LoginComponent,
    UpdateusersComponent,
    DeleteUserComponent,
    RightsettingsComponent,
    ChangePasswordComponent,
    ClassComponent,
    AssignTeacherToClassComponent,
    AddProductsComponent,
    ViewProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessfulComponent,
    MyOrderComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    UpdateBooksComponent,
    ListOfBooksComponent,
    BookDescriptionComponent,
    DeleteBookComponent,
    MyCustomerOrdersComponent,
    MakePaymentComponent,
    BodiyComponent,
    FooterComponent,
    BlogComponent,
    AboutComponent,
    ContactusComponent,
    RegisterCustomersComponent,
    MyserviceComponent,
    UserHomeComponent,
  ],
  imports: [
  AngularFileUploaderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
   FormsModule,
   ReactiveFormsModule,
   HttpClientModule,
   ToastrModule.forRoot({
    timeOut: 2000,
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
  }),
  // JwtModule.forRoot({
  //   config: {
  //     tokenGetter: tokenGetter,
  //     allowedDomains: ["example.com"],
  //     disallowedRoutes: ["http://example.com/examplebadroute/"],
  //   },
  // }),
  // HashLocationStrategy RouterModule.forRoot(appRoutes, { useHash: true }
  ],
  // providers: [{provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true}],
  // providers: [{provide: HTTP_INTERCEPTORS, useClass:HashLocationStrategy, multi: true}],
  providers: [ {provide: LocationStrategy, useClass:HashLocationStrategy},{provide: HTTP_INTERCEPTORS, useClass:AppInterceptor, multi: true}],
// 
  bootstrap: [AppComponent]
})
export class AppModule { }
