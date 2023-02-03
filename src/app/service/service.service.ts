import { baseUrl } from './../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyModelModule } from '../my-model/my-model.module';



@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  redirectUrl: any;
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  constructor(
    private HttpClient: HttpClient,
    // public jwtHelper: JwtHelperService
  ) {
    this.getProducts();
  }

  // CRUD
  // Users
  createUser(data: any): Observable<any> {
    return this.HttpClient.post(baseUrl + '/users', data);
  }
  getAllUsers() {
    return this.HttpClient.get(baseUrl + '/users');
  }
  getById(id: any) {
    return this.HttpClient.get(baseUrl + '/users' + '/' + id);
  }

  updateUser(id: any, data: any) {
    return this.HttpClient.put(baseUrl + '/users' + '/' + id, data);
  }

  deleteUser(id: any) {
    return this.HttpClient.delete(baseUrl + '/users' + '/' + id);
  }

  // Book
  createBook(data: any): Observable<any> {
    return this.HttpClient.post(baseUrl + '/books', data);
  }
  getAllBooks() {
    return this.HttpClient.get(baseUrl + '/getBooks');
  }
  getByIdBook(id: any) {
    return this.HttpClient.get(baseUrl + '/books' + '/' + id);
  }

  updateBook(id: any, data: any) {
    return this.HttpClient.put(baseUrl + '/books' + '/' + id, data);
  }

  deleteBook(id: any) {
    return this.HttpClient.delete(baseUrl + '/books' + '/' + id);
  }

  //login
  login(data: any): Observable<any> {
    return this.HttpClient.post<any>(baseUrl + '/login', data);
  }
  setToken(token: string) {
    localStorage.setItem('access_token', token);


  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true;
    }
    return false;
  }
  public isAuthenticated(): boolean {
    const token: string | null = this.getToken();
    // return !this.jwtHelper.isTokenExpired(token as string);
    return !!token;
  }
  // cart
  public cart(dataa: any) {
    this.cartItemList.push(dataa);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }
  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }
  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  getTotalPrice(): number {
    let grandTotal: number = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.selling;
    });
    return grandTotal;
  }
  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  //image
  image(data: any): Observable<any> {
    return this.HttpClient.post(baseUrl + '/image', data);
  }

  //save book to Mybooks
  createToMyBooks(data: any): Observable<any> {
    return this.HttpClient.post(baseUrl + '/saveMyBooks', data);
  }
  AllToMyBooks() {
    return this.HttpClient.get(baseUrl + '/books');
  }
  getAllToMyBooks() {
    return this.HttpClient.get(baseUrl + '/saveMyBooks');
  }
  getByIdToMyBooks(id: any) {
    return this.HttpClient.get(baseUrl + '/saveMyBooks' + '/' + id);
  }

  updateToMyBooksr(id: any, data: any) {
    return this.HttpClient.put(baseUrl + '/saveMyBooks' + '/' + id, data);
  }

  deleteToMyBooks(id: any) {
    return this.HttpClient.delete(baseUrl + '/saveMyBooks' + '/' + id);
  }

  //logout
  logout() {
    localStorage.removeItem('token');
  }
  //changePassword
  changepassword(id: any, data: any) {
    return this.HttpClient.put(baseUrl + '/changepassword' + '/' + id, data);
  }

  //manage customer orders by Admin
  // createToMyBooks(data: any): Observable<any> {
  //   return this.HttpClient.post(baseUrl + '/saveMyBooks', data);
  // }
  // getAllToMyBooks() {
  //   return this.HttpClient.get(baseUrl + '/saveMyBooks');
  // }
  // getByIdToMyBooks(id: any) {
  //   return this.HttpClient.get(baseUrl + '/saveMyBooks' + '/' + id);
  // }

  // updateToMyBooksr(id: any, data: any) {
  //   return this.HttpClient.put(baseUrl + '/saveMyBooks' + '/' + id, data);
  // }

  // deleteToMyBooks(id: any) {
  //   return this.HttpClient.delete(baseUrl + '/saveMyBooks' + '/' + id);
  // }

  unpaid(id: any, data: any) {
    return this.HttpClient.put(baseUrl + '/unpaid' + '/' + id, "unpaid");
  }
  paid(id: any, data: any) {
    return this.HttpClient.put(baseUrl + '/paid' + '/' + id, "paid");
  }

  getTotalPayment() {
    return this.HttpClient.get(baseUrl + '/payments');
  }

  getAllPayment() {
    return this.HttpClient.get(baseUrl + '/allpayments');
  }
  payments(data: any): Observable<any> {
    return this.HttpClient.post(baseUrl + '/payments', data);
  }
  //register Users Them self
  registerUsers(data: any): Observable<any> {
    return this.HttpClient.post(baseUrl + '/registerUsers', data);
  }

  getAuthUser(): Observable<any> {
    return this.HttpClient.get(baseUrl + '/me')
// 
  }

  getUser(): MyModelModule {
    const data = localStorage.getItem('auth_user') as string;
    const userStr = atob(data);
    return JSON.parse(userStr);
  }

}
